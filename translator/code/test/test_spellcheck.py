import unittest
from spellcheck import Spellcheck
class TestSpellcheck(unittest.TestCase):

    def setUp(self):
        corpus = ["better", "butler", "dog", "bulldog", "cat", "rabbit", "beilerina", "rug", "bar"]
        self.spell = Spellcheck(spellchecker_corpus=corpus)

    def test_get_pre_suf_corrections(self):
        words = ["batter", "butter", "dog", "rabbi", "zulu"]

        matches = self.spell.getPreSufCorrections(words)

        correct = {
            "batter": [("better", 5), ("butler", 3), ("bar", 2)],
            "butter": [("better", 5), ("butler", 5), ("bar", 2)],
            # "dog": [("dog", 3)],
            "rabbi": [("rabbit", 5), ("rug", 1)],
            "zulu": [],
        }

        self.assertEqual(matches, correct)


if __name__ == '__main__':
    unittest.main()