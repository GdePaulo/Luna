class Translate:
    def __init__(self, dictionary, word_corrector, lan="PAP-NL"):
        self.dictionary = dictionary
        self.word_corrector = word_corrector
        self.lan = lan
    
    def translateWord(self, word):
        translation = ""
        corrected_word = word
        if word in self.dictionary:
            translation = self.dictionary[word]
        else:
            closest_words = self.word_corrector.getPreSufCorrections(words=[word], penalize_mismatch=True)[word]

            if not closest_words:
                translation = "Word is not in dictionary"
            else:
                corrected_word = closest_words[0][0]
                translation = self.dictionary[corrected_word]
        return translation, corrected_word


if __name__ == "__main__":
    pass