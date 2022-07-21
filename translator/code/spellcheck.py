from tkinter import W
from trie import Trie
from util import Util
from gst import GST
import pickle

class Spellcheck:
    def __init__(self, spellchecker_corpus, load=False):
        self.spellchecker_corpus = spellchecker_corpus
        if len(spellchecker_corpus) == 0:
            raise Exception("Empty corpus")

        if load:
            self.loadTrees()    
        else:
            self.createTrees()
   
    def createTrees(self):
        self.trie = Trie()
        self.trie.populate(self.spellchecker_corpus)

        self.gst = GST(tree_type="suffix")
        self.gst.populate(self.spellchecker_corpus)

        self.gpt = GST(tree_type="prefix")
        self.gpt.populate(self.spellchecker_corpus)

    def saveTrees(self):
        with open('../data/pickles/pap-trie', 'wb') as f:
            pickle.dump(self.trie, f)
        with open('../data/pickles/pap-gst', 'wb') as f:
            pickle.dump(self.gst, f)
        with open('../data/pickles/pap-gpt', 'wb') as f:
            pickle.dump(self.gpt, f)

    def loadTrees(self):
        with open('../data/pickles/pap-trie', 'rb') as f:
            self.trie = pickle.load(f)
        with open('../data/pickles/pap-gst', 'rb') as f:
            self.gst = pickle.load(f)
        with open('../data/pickles/pap-gpt', 'rb') as f:
            self.gpt = pickle.load(f)

    def getSlowWordCorrections(self, sentence, words_corpus):
        translations = {}   

        for word in sentence.split():
            word = word.lower()
            words_corpus = Util.attachClosest(words_corpus, word, "pap-simple")
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
        
    def getMixedWordCorrections(self, words, words_corpus, metric="Levenstein"):
        translations = {}   
        for word in words:
            # Make sure to ignore case if you're making word lowercase
            # lowered_word = word.lower()
            exists = self.trie.find(word)
            if not exists:
                words_corpus = Util.attachClosest(words_corpus, word, "pap-simple", case=False, metric=metric)
                # Deal with found word being identical with different case
                # print(word, words_corpus.head(3)["pap-simple"].to_list())
                if words_corpus["closest"].iloc[0] > 0:
                    # print(word, words_corpus.head(3)["closest"].to_list())
                    translations[word] = words_corpus.head(3)["pap-simple"].to_list()
                
        return translations

    def getWordCorrections(self, words, metric="Levenstein"):
        translations = {}   
        for word in words:
            # Make sure to ignore case if you're making word lowercase
            exists = self.trie.find(word)
            if not exists:
                all_matches = Util.getClosest(self.spellchecker_corpus, word, case=False, metric=metric)
                matches = all_matches[:3]
                # print(word, matches)
                if matches and matches[0][1] > 0:
                    # print(word, words_corpus.head(3)["closest"].to_list())
                    translations[word] = list(map(lambda x: x[0], matches))
                elif not matches:
                    translations[word] = []
                
        return translations
    
    def getAccentCorrections(self, words):
        translations = {}   
        for word in words:
            exists = self.trie.find(word.lower())
            if not exists:
                # Make sure to ignore case if you're making word lowercase
                variants = self.trie.accentFind(word.lower())
            
                if len(variants) > 0:
                    translations[word] = variants
                else:
                    translations[word] = []
        
        return translations
    
    # Avoid searching for too big substrings
    # Favor words with matching sizes
    # Todo: bake in adjusted score into gst search algorithm to reduce threshold
    def getPreSufCorrections(self, words, amount_thresholds=3, case=False, words_only=False, penalize_mismatch=False):
        words = [x.replace("’", "'") for x in words]        
        words = [x for x in words if not self.trie.find(x.lower())]        
        translations = {x:{} for x in words}

        # Make sure the threshold is big enough to allow desired words appear and be filtered with adjusted_score
        # e.g. to get reks -> rèks over konvikshon
        suffix_matches = self.gst.findMatches(words, amount_threshold=35)
        prefix_matches = self.gpt.findMatches(words, amount_threshold=35)

        for i, matches in enumerate([suffix_matches, prefix_matches]):        
            for original_word in matches:
                word = original_word
                if not case:
                    word = word.lower()

                # Depending on if this is a suffix or prefix match, increment the matching size
                # with the maximum amount of possible matching letters if you start at the opposite of the string
                # print(f"word:{word}")
                for original_matching_word, matching_size in matches[original_word]:
                    matching_word = original_matching_word
                    if not case:
                        matching_word = matching_word.lower()

                    max_oppositefix_search = len(word) - matching_size
                    # print(f"matching_word:{matching_word}|matching_size:{matching_size}|max_search:{max_oppositefix_search}")

                    matching_oppositefix_size = 0
                    for k in reversed(range(1, max_oppositefix_search + 1)):
                        
                        sub_word = word[:k] if i == 0 else word[-(k):]
                        sub_matching_word = matching_word[:k] if i == 0 else matching_word[-(k):]
                        # print(f"k:{k} checking {sub_word}")
                        if sub_word == sub_matching_word:
                            matching_oppositefix_size = k
                            break
                    # print(f"Matching prefix size {matching_oppositefix_size}")
                    total_matching_size = matching_size + matching_oppositefix_size

                    mismatch_penalty = 0
                    if penalize_mismatch:
                        mismatch_penalty = abs(len(original_matching_word) - len(original_word))
                    adjusted_score = total_matching_size - mismatch_penalty

                    current_matches = translations[original_word]
                    if current_matches.get(original_matching_word, 0) < adjusted_score:
                        current_matches[original_matching_word] = adjusted_score
                # if word == "reks":
                #     print(f"New translations {translations[original_word]}")
                
        translations = {word:dict(sorted(matches.items(), key=lambda item: item[1], reverse=True)) for word, matches in translations.items()}

        final_translations = {x:[] for x in words}
        
        # Filter duplicate matches and truncate to maximum match amount threshold
        for word, matches in translations.items():
            current_final_matches = final_translations[word]
            for matching_word, matching_size in matches.items():
                matching_keys = [x[0] for x in current_final_matches if x[0].lower() == matching_word.lower()]
                
                # print(f"Matching keys {matching_keys}, matching word {matching_word}, final matches {current_final_matches}")
                if len(matching_keys) == 0:
                    current_final_matches.append((matching_word, matching_size))
                    if len(current_final_matches) >= amount_thresholds:
                        break

        if words_only:
            final_translations = {k: list(map(lambda x: x[0], matches)) for k,matches in final_translations.items()}

        return final_translations