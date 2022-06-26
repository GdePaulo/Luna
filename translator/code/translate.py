from os import stat
from deep_translator import GoogleTranslator
from util import Util
class Translate:
    def __init__(self):
        self.translator_nl_en = GoogleTranslator(source='nl', target='en')
        self.translator_en_nl = GoogleTranslator(source='en', target='nl')
    
    def translateSubSentences(self, sentence, sentences_corpus):
        # Get subsentences
        subsentences = Util.getSubSentences(sentence)

        sentence_translations = {}
        for sub in subsentences:
            # Recreate sentence
            sentence = " ".join(sub)
            # Get the closest matching sentences
            closest = Util.getClosestSentences(sentence, sentences_corpus, "pap-simple")
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
  
    # Maybe favour words for which full substrings match instead of only individual letters. Especially matching initial strings. Can still use individual letters as heuristic
    # Also favour words which are the same without capital and without accent
    def translateWords(self, sentence, words_corpus):
        raw_translation = ""
        for word in sentence.split():
            word = word.lower()
            words_corpus = Util.attachClosest(words_corpus, word, "pap-simple")
            closest_word = words_corpus.iloc[0]
            if closest_word["closest"] <= 1:
                raw_translation += closest_word["nl-simple"] + " "
            else:
                raw_translation += word + " "
        return raw_translation

    def correctSentence(self, sentence):
        nl_en = self.translator_nl_en.translate(sentence)
        en_nl = self.translator_en_nl.translate(nl_en)
        return en_nl


if __name__ == "__main__":
    # print(Translate.remove_tags("fef [fe] (ef)", ["[", "("]))
    print(Translate.find_between_tags("fef [ef) [fe) (ef[", ["[", "("]))