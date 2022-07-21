import unittest
from spellcheck import Spellcheck
class TestSpellcheck(unittest.TestCase):        

    def test_get_pre_suf_mismatching_apostrophe_types(self):
        corpus = ["fo’i", "akus'e", "mesko's"]
        self.spell = Spellcheck(spellchecker_corpus=corpus)
        words = ["fo'i", "akus’e", "mesko's", "fo’ie"]

        matches = self.spell.getPreSufCorrections(words)

        correct = {
            "fo'ie": [("fo’i", 4), ("akus'e", 1)],
        }

        self.assertEqual(matches, correct)

    def test_get_pre_suf_corrections(self):
        corpus = ["better", "butler", "dog", "bulldog", "cat", "rabbit", "beilerina", "rug", "bar"]
        self.spell = Spellcheck(spellchecker_corpus=corpus)
        words = ["batter", "butter", "dog", "rabbi", "zulu", "ordr"]

        matches = self.spell.getPreSufCorrections(words)

        correct = {
            "batter": [("better", 5), ("butler", 3), ("bar", 3)],
            "butter": [("better", 5), ("butler", 5), ("bar", 2)],
            # "dog": [("dog", 3)],
            "rabbi": [("rabbit", 5), ("rug", 1)],
            "zulu": [],
            "ordr": [("better", 1), ("butler", 1), ("bar", 1)],
        }

        self.assertEqual(matches, correct)

    def test_get_pre_suf_corrections_cases(self):
        corpus = ["better", "Better", "BETTER", "bowl", "Cat", "cat", "rabbit", "bar"]
        self.spell = Spellcheck(spellchecker_corpus=corpus)
        words = ["Batter", "cot"]

        matches = self.spell.getPreSufCorrections(words, case=False)

        correct = {
            "Batter": [("better", 5), ("bar", 3), ("bowl", 1)],
            "cot": [("Cat", 2), ("rabbit", 1)],
        }

        self.assertEqual(matches, correct)


if __name__ == '__main__':
    unittest.main()