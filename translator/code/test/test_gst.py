import unittest
from gst import GST
class TestGST(unittest.TestCase):

    def setUp(self):
        self.gst = GST()

    def test_insert_single(self):
        self.gst.insert("aa", 0)
        self.assertEqual(str(self.gst), f"(1 aa:[0])")

    def test_insert_multiple_common_initial(self):
        self.gst.insert("aaab", 0)
        self.gst.insert("aaaa", 1)
        self.assertEqual(str(self.gst), f"(1 aaa:[] (2 a:[1] b:[0]))")

    def test_insert_multiple_common_initial_imbalanced_length(self):
        self.gst.insert("aaab", 0)
        self.gst.insert("aa", 1)
        self.assertEqual(str(self.gst), f"(1 aa:[1] (1 ab:[0]))")
    
    def test_insert_two_splits(self):
        self.gst.insert("aab", 0)
        self.gst.insert("aaaa", 1) 
        self.gst.insert("aaac", 2) 
        self.assertEqual(str(self.gst), f"(1 aa:[] (2 b:[0] a:[] (2 c:[2] a:[1])))")
    
    def test_populate_one_word(self):
        self.gst.populate(["banana"])
        self.assertEqual(str(self.gst), f"(3 a:[0] (1 na:[0] (1 na:[0])) na:[0] (1 na:[0]) banana:[0])")
    
    def test_populate_two_words(self):
        self.gst.populate(["anaad", "manad"])
        self.assertEqual(str(self.gst), f"(4 d:[0, 1] a:[] (3 ad:[0] d:[0, 1] na:[] (2 d:[1] ad:[0])) na:[] (2 d:[1] ad:[0]) manad:[1])")
    
    def test_find_matches_suffix(self):
        self.gst.populate(["better", "butler", "dog", "cat", "rabbit", "bailerina", "mug", "bar"])
        words = ["botter", "bonler", "dog", "ottar"]
        
        matches = self.gst.findMatches(words)

        correct = {
            "botter": [("better", 4), ("butler", 2), ("bar", 1)],
            "bonler": [("butler", 3), ("better", 2), ("bar", 1)],
            "dog": [("dog", 3), ("mug", 1)],
            "ottar": [("bar", 2), ("better", 1), ("butler", 1)],
        }

        self.assertEqual(matches, correct)
    
    def test_find_matches_prefix(self):
        self.gst = GST(tree_type="prefix")
        self.gst.populate(["better", "butler", "dog", "bulldog", "cat", "rabbit", "beilerina", "rug", "bar"])
        words = ["bettor", "butter", "dog", "rabbi"]
        
        matches = self.gst.findMatches(words)

        correct = {
            "bettor": [("better", 4), ("beilerina", 2), ("butler", 1)],
            "butter": [("butler", 3), ("bulldog", 2), ("better", 1)],
            "dog": [("dog", 3)],
            "rabbi": [("rabbit", 5), ("rug", 1)],
        }

        self.assertEqual(matches, correct)

if __name__ == '__main__':
    unittest.main()