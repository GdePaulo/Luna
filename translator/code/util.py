

import unicodedata
import nltk
import re
import difflib

class Util:

    @staticmethod
    def distanceToWord(hide, seek, case=True, apostrophe=False, metric="Levenstein"):

        # Deal with nan string
        hide = str(hide)
        seek = str(seek)

        if not case:
            hide = hide.lower()
            seek = seek.lower()
        
        if not apostrophe:
            hide = hide.replace("’", "'")
            seek = seek.replace("’", "'")
        
        if metric == "Levenstein":
            return nltk.edit_distance(hide, seek)
        else:
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
    def removeSentenceCapitalization(input_str):
        matcher = r'([\.\?!]\s*[\"]*\s*)([\w]+)(\s*)'
        words = re.sub(matcher, lambda m: m.group(1) + m.group(2).lower() + m.group(3), input_str) 
        return words

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
    
    @staticmethod
    def removeTrailingPunctuation(input_str, punctuation=",!?"):
        matcher = f"[{punctuation}]$"
        return re.sub(matcher, "", input_str)

    @staticmethod
    def removeDuplicates(input_str):
        input_str_unique = []
        input_str_unique_lower = []
        for word in input_str:
            word_lower = word.lower()
            if word_lower not in input_str_unique_lower:
                input_str_unique_lower.append(word_lower)
                input_str_unique.append(word)
        return input_str_unique

    @staticmethod
    def attachType(df, lan):
        d = df.copy()
        d["type"] = d.apply(lambda row: "sentence" if len(str(row[lan]).split()) > 1 else "word", axis=1)
        return d

    # Attempt smarter matching which takes into account consecutive matches and whether it is beginning or ending
    @staticmethod
    def attachClosest(df, word, lan, case=True, metric="Levenstein"):
        d = df.copy()

        d["closest"] = d.apply(lambda row: min( 
            (Util.distanceToWord(Util.remove_accents(row[lan]), word, case, metric=metric) + 0.001),
            Util.distanceToWord(row[lan], word, case, metric=metric)
        ), axis=1)
        d.sort_values(by="closest", inplace= True)
        return d

    @staticmethod
    def getClosest(corpus_words, word, case=False, metric="Levenstein"):
        matches = []

        if not case:
            case_insensitive_matches = []

        cut_off = len(word)-1
        close_matches = 0
        for check in corpus_words:
            with_accent = Util.distanceToWord(check, word, case, metric=metric)
            distance = with_accent
            # If case insensitive, prevent two versions of the same word appearing in results
            if distance < cut_off and (case or check.lower() not in case_insensitive_matches):
                matches.append([check, distance])

                if not case:
                    case_insensitive_matches.append(check.lower())

                if distance == 1:
                    close_matches += 1
                if close_matches > 3:
                    break
            

        matches.sort(key= lambda x: x[1])
        return matches

    @staticmethod
    def getClosestSentences(sentence, lookup_sentences, lan):
        all_sentences = lookup_sentences.copy()
        all_sentences["closest"] = lookup_sentences.apply(lambda row: min( 
            difflib.SequenceMatcher(None, Util.remove_accents(row[lan]), sentence).ratio() + 0.001,
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