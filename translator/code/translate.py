import imp
from os import stat
from deep_translator import GoogleTranslator
import unicodedata
import difflib
import re
class Translate:
    def __init__(self, spellchecker_corpus=[]):
        self.translator_nl_en = GoogleTranslator(source='nl', target='en')
        self.translator_en_nl = GoogleTranslator(source='en', target='nl')

        if len(spellchecker_corpus) > 0:
            self.trie = Trie()
            self.trie.populate(spellchecker_corpus)

    @staticmethod
    def distanceToWord(hide, seek, case=True):

        # Deal with nan string
        hide = str(hide)
        seek = str(seek)

        if not case:
            hide = hide.lower()
            seek = seek.lower()

        max_search = len(seek)
        distance = abs(len(hide)-len(seek))
        if len(seek) > len(hide):
            max_search = len(hide)
        
        for i in range(0, max_search):
            if hide[i] != seek[i]:
                distance += 1
        return distance

    @staticmethod
    def remove_accents(input_str):
        # Convert to string to deal with nan string
        nfkd_form = unicodedata.normalize('NFKD', str(input_str))
        return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])
    
    @staticmethod
    def remove_tags(input_str, tags=["[", "(", "{", "<"]):
        matcher = "].*?["
        if "[" in tags:
            matcher = "\[" + matcher + "\]"
        if "(" in tags:
            matcher = "\(" + matcher + "\)"
        if "{" in tags:
            matcher = "{" + matcher + "}"
        if "<" in tags:
            matcher = "<" + matcher + ">"
        matcher = "[" + matcher + "]"
        return re.sub(matcher, "", input_str)
    
    @staticmethod
    def find_between_tags(input_str, tags=["[", "(", "{", "<"]):
        
        tag_matchers = []
        if "[" in tags:
            tag_matchers.append(("\[","\]"))
        if "(" in tags:
            tag_matchers.append(("\(","\)"))
        if "{" in tags:
            tag_matchers.append(("{","}"))
        if "<" in tags:
            tag_matchers.append(("<",">"))

        matched = []
        
        for l, r in tag_matchers:
            matcher = l + "(.*?)" + r
            res = re.findall(matcher, input_str)
            matched += res

        return matched
    @staticmethod
    def findWords(input_str):
        # words = re.findall(r'\b(\w+\'*\w*)\b',input_str) 
        words = re.findall(r'\b([^\d\W]+[\'\’-]*[^\d\W\']*)',input_str) 
        return words

    # Attempt smarter matching which takes into account consecutive matches and whether it is beginning or ending
    @staticmethod
    def attachClosest(df, word, lan, case=True):
        d = df.copy()

        d["closest"] = d.apply(lambda row: min( 
            (Translate.distanceToWord(Translate.remove_accents(row[lan]), word, case) + 0.001),
            Translate.distanceToWord(row[lan], word, case)
        ), axis=1)
        d.sort_values(by="closest", inplace= True)
        return d

    @staticmethod
    def attachType(df, lan):
        d = df.copy()
        d["type"] = d.apply(lambda row: "sentence" if len(str(row[lan]).split()) > 1 else "word", axis=1)
        # with_type = df.assign(type=lambda row: "sentence" if len(row[lan].item().split()) > 1 else "word")
        return d

    @staticmethod
    def getClosestSentences(sentence, lookup_sentences, lan):
        all_sentences = lookup_sentences.copy()
        all_sentences["closest"] = lookup_sentences.apply(lambda row: min( 
            difflib.SequenceMatcher(None, Translate.remove_accents(row[lan]), sentence).ratio() + 0.001,
            difflib.SequenceMatcher(None, row[lan], sentence).ratio()
        ), axis=1)
        all_sentences.sort_values(by="closest", inplace= True, ascending=False)
        return all_sentences.head(3)

    # In future make smarter instead of greedy to match most words
    @staticmethod
    def getSubSentences(sentence):
        words = sentence.split(" ")
        subsentences = []
        for i in range(2, len(words) + 1):
            
            for j in range(0, len(words) - i + 1):
                cur_sentence = words[j:j+i]
                subsentences.append(cur_sentence)
        return subsentences 
    
    @staticmethod
    def translateSubSentences(sentence, sentences_corpus):
        # Get subsentences
        subsentences = Translate.getSubSentences(sentence)

        sentence_translations = {}
        for sub in subsentences:
            # Recreate sentence
            sentence = " ".join(sub)
            # Get the closest matching sentences
            closest = Translate.getClosestSentences(sentence, sentences_corpus, "pap-simple")
            # Pick the best match
            best_match = closest.iloc[0]
            # If the best match is exact, add the translation to the possible future sentence translations
            if best_match.closest == 1:
                sentence_translations[sentence] = {
                    "wordcount" : len(sub),
                    "translation" : best_match["nl-simple"] 
                }

        # Pay attention to ste mine
        # Pay attention if word overlap is between two sub sentences

        # Here we take a greedy approach and favour the matching of longer subsentences
        # We discard shorter subsentences which occur in the longer substences to avoid double translations
        # Could do a weighting by matching power combined with word count in the future

        sorted_translations = dict(sorted(sentence_translations.items(), key=lambda item: item[1]["wordcount"], reverse=True))

        final_translations = {}
        # Keep track of which sentences have occurred so far
        sentences_being_translated = ""
        for k, v in sorted_translations.items():
            if k not in sentences_being_translated:
                sentences_being_translated += " " + k
                final_translations[k] = v["translation"]
        
        # Replace subsentences in the sentence with their translation
        translation = sentence
        for k, v in final_translations.items():
            translation = translation.replace(k, v)
        return translation
  
    @staticmethod
    def translateWords(sentence, words_corpus):
        raw_translation = ""
        for word in sentence.split():
            word = word.lower()
            words_corpus = Translate.attachClosest(words_corpus, word, "pap-simple")
            closest_word = words_corpus.iloc[0]
            if closest_word["closest"] <= 1:
                raw_translation += closest_word["nl-simple"] + " "
            else:
                raw_translation += word + " "
        return raw_translation
    
    @staticmethod
    def getWordCorrections(sentence, words_corpus):
        translations = {}   

        for word in sentence.split():
            word = word.lower()
            words_corpus = Translate.attachClosest(words_corpus, word, "pap-simple")
            if words_corpus["closest"].iloc[0] > 0:
                translations[word] = words_corpus.head(3)["pap-simple"].to_list()
        return translations
    
    def getFastWordCorrections(self, sentence, check_alternatives=False):
        translations = {}   
        for word in sentence.split():
            word = word.lower()
            exists = self.trie.find(word)
            if not exists and check_alternatives:
                accented_match = self.trie.lenientFind(word)
                if accented_match:
                    translations[word] = [accented_match]
        return translations
        
    def getMixedWordCorrections(self, words, words_corpus):
        translations = {}   
        for word in words:
            # Make sure to ignore case if you're making word lowercase
            lowered_word = word.lower()
            exists = self.trie.find(word)
            if not exists:
                words_corpus = Translate.attachClosest(words_corpus, word, "pap-simple", case=False)
                if words_corpus["closest"].iloc[0] > 0:
                    print(word, words_corpus.head(3)["closest"].to_list())
                    translations[word] = words_corpus.head(3)["pap-simple"].to_list()
                
        return translations
    def correctSentence(self, sentence):
        nl_en = self.translator_nl_en.translate(sentence)
        en_nl = self.translator_en_nl.translate(nl_en)
        return en_nl
class Trie:
    def __init__(self, lastNode=False):
        self.children = {}
        self.lastNode = lastNode
        self.accented = {
            "a" : ["à","á"], 
            "e" : ["è","é"], 
            "i" : ["ì","í"], 
            "o" : ["ò","ó"], 
            "u" : ["ù","ú"], 
            "n" : ["ñ"], 
        }
    def __str__(self):
        if self.children:
            ret = f"{len(self.children)}"
            for k, v in self.children.items():
                ret += f" {k}: {v.lastNode} {v}"
            return ret
        else:
            return ""

    def insert(self, word):
        current = self
        for i, l in enumerate(word):
            if l in current.children:
                # print(f"from {current} -> ")
                current = current.children[l]
                # print(f"to {current}")
            else:
                newNode = Trie()
                # print(f"inserting {l} into {current}")
                current.children[l] = newNode
                # print(f"new {len(current.children)} children {current}")
                current = newNode
            if i == len(word)-1:
                current.lastNode = True

    def find(self, word):
        current = self
        for i, l in enumerate(word):
            if l in current.children:
                current = current.children[l]
                if i == len(word)-1:
                    return current.lastNode
            else:
                return False

    def lenientFind(self, word):
        found_word = "" 
        current = self
        for i, l in enumerate(word):
            found_key = False
            # print(f"checking if {l} has accented")
            if l in self.accented:
                for accented_l in self.accented[l]:
                    # print(f"checking {accented_l}")
                    if accented_l in current.children:
                        # print(f"found {accented_l}")
                        accented_search = accented_l + word[i+1:]
                        found_accented_word = current.lenientFind(accented_search)
                        if found_accented_word:
                            return found_word + found_accented_word
                
            if l in current.children:
                current = current.children[l]
                found_word += l
                found_key = True

            if not found_key:
                return ""
            
            if i == len(word)-1:
                if current.lastNode:
                    return found_word
                else:
                    return ""
            
    
    def populate(self, words):
        for word in words:
            self.insert(word)

if __name__ == "__main__":
    # print(Translate.remove_tags("fef [fe] (ef)", ["[", "("]))
    print(Translate.find_between_tags("fef [ef) [fe) (ef[", ["[", "("]))