import unittest
from gst import GST
class TestGST(unittest.TestCase):


    def setUp(self):
        self.gst = GST()

    def test_insert_single(self):
        self.gst.insert("aa", 0)
        self.assertEqual(f"(1 aa:[0])", str(self.gst))

    def test_insert_multiple_common_initial(self):
        self.gst.insert("aaab", 0)
        self.gst.insert("aaaa", 1)
        self.assertEqual(f"(1 aaa:[] (2 a:[1] b:[0]))", str(self.gst))

    def test_insert_multiple_common_initial_imbalanced_length(self):
        self.gst.insert("aaab", 0)
        self.gst.insert("aa", 1)
        self.assertEqual(f"(1 aa:[1] (1 ab:[0]))", str(self.gst))
    
    def test_insert_two_splits(self):
        self.gst.insert("aab", 0)
        self.gst.insert("aaaa", 1) 
        self.gst.insert("aaac", 2) 
        self.assertEqual(f"(1 aa:[] (2 b:[0] a:[] (2 c:[2] a:[1])))", str(self.gst))

if __name__ == '__main__':
    unittest.main()