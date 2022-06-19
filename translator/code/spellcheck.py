from trie import Trie
from util import Util

class Spellcheck:
    def __init__(self, spellchecker_corpus=[]):
        self.spellchecker_corpus = spellchecker_corpus
        if len(spellchecker_corpus) > 0:
            self.trie = Trie()
            self.trie.populate(spellchecker_corpus)
    
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
                print(word, words_corpus.head(3)["pap-simple"].to_list())
                if words_corpus["closest"].iloc[0] > 0:
                    print(word, words_corpus.head(3)["closest"].to_list())
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
                print(word, matches)
                if matches and matches[0][1] > 0:
                    # print(word, words_corpus.head(3)["closest"].to_list())
                    translations[word] = list(map(lambda x: x[0], matches))
                elif not matches:
                    translations[word] = ["This word is incorrect"]
                
        return translations