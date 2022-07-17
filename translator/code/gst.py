from mailcap import findmatch
from re import sub

class GST:
    def __init__(self, tag=None, tree_type="suffix"):

        if tree_type not in ["prefix", "suffix"]:
            raise ValueError("Unsupported tree_type " + str(tree_type))        

        self.children = {}
        self.tag = []
        self.corpus = []
        self.tree_type = tree_type

        # Careful with value of zero being interpreted as false
        if tag is not None:
            # print(f"Initializing new node with tag {tag}")
            self.tag.append(tag)
        # else:
            # print(f"Initializing new node without tag {tag}")
        
    def __str__(self):
        if self.children:
            ret = f"({len(self.children)}"
            for k, v in self.children.items():
                ret += f" {k}:{v.tag}"
                if str(v):
                    ret += f" {v}"
            return ret + ")"
        else:
            return ""

    def insert(self, word, tag):
        current = self
        word_length = len(word)
        letters_found = 0

        # contiue until the whole word was matched
        while letters_found < word_length:
            found = False
            # check for unmatched part of word of decreasing size until something is found
            for j in range(word_length - letters_found):
                k = word_length - j
                sub_word = word[letters_found: k]

                if sub_word in current.children:
                    # print(f"{sub_word} in {str(current)}")
                    current = current.children[sub_word]
                    letters_found = k
                    found = True
                    # if this is the whole word, add a tag to the current node
                    if tag not in current.tag and letters_found == word_length:
                        current.tag.append(tag)

                if not found:
                    # print(f"{sub_word} not in {str(current)}")
                    sub_word_length = len(sub_word)
                    found_key = ""
                    rest_part = ""
                    for key, node in current.children.items():
                        key_length = len(key)
                        if sub_word_length < key_length and sub_word == key[:sub_word_length]:
                            rest_part = key[sub_word_length:]
                            found_key = key
                            found = True
                            break
                    # if the word was a subpart of a child node
                    if found:
                        # split the node into two and append the tag if the final letters are less than the found node
                        # in which case you are done
                        if word_length - letters_found < len(found_key) and k == word_length:
                            new_node = GST(tag)
                        else:
                            new_node = GST()
                            rest_of_word = word[letters_found + sub_word_length:]
                            new_node.children[rest_of_word] = GST(tag=tag)
                        new_node.children[rest_part] = current.children[found_key]
                        del current.children[found_key]
                        current.children[sub_word] = new_node
                        return
            # insert a new node if nothing was found
            if not found:
                rest_word = word[letters_found:]
                current.children[rest_word] = GST(tag=tag)
                # print(f"setting child {rest_word}:{tag} when letters found is: {word[:letters_found]}")
                # print("s", current.children[rest_word].tag, self )
                break


    def findLongestSubstring(self, index1, index2):
        current = self
        longest = ""
        found_in_child = False
        for k, child in current.children.items():
            found, child_longest = child.findLongestSubstring(index1, index2)
            full_substring = k + child_longest
            if len(full_substring) > len(longest):
                if found or (index1 in child.tag and index2 in child.tag):
                    found_in_child = True
                    longest = full_substring

        if not current.children:
            if index1 in current.tag and index2 in current.tag:
                return True, ""
            else:
                return False, ""
        return found_in_child, longest
        
    def findMatch(self, word):            
        word_length = len(word)
        # print(f"Finding matches for {word}")
        
        current = self
        letters_found = 0

        # contiue until the whole word was matched
        while letters_found < word_length:
            found = False
            # check for unmatched part of word of decreasing size until something is found
            for m in range(word_length - letters_found):
                k = word_length - m
                sub_word = word[letters_found: k]

                if sub_word in current.children:
                    # print(f"{sub_word} in {str(current)}")
                    current = current.children[sub_word]
                    letters_found = k
                    found = True

                    if letters_found == word_length:
                        return list(map(lambda x: self.corpus[x], current.tag))
                        # print(f"Found all letters: {found_match_indices}")
            
            if not found:
                return []
        return []

    def findMatches(self, words, amount_threshold=3):
        all_matches = {}
        for word in words:

            if word in all_matches:
                continue

            current_word_matches = {}
            for i in range(0, len(word)):
                if self.tree_type == "suffix":
                    sub = word[i:]
                else:
                    sub = word[:len(word) - i]

                matching_words = self.findMatch(sub)
                
                for match in matching_words:
                    if match not in current_word_matches:
                        current_word_matches[match] = len(sub)

                if len(current_word_matches) >= amount_threshold:
                    break
            
            all_matches[word] = list(current_word_matches.items())[:amount_threshold]
        return all_matches

    def populate(self, words, case=False):

        self.corpus = words
        for i, word in enumerate(words):
            if not case:
                word = word.lower()

            word_length = len(word)
            for j in range(word_length):

                if self.tree_type == "suffix":
                    k = word_length - j - 1
                    sub_to_insert = word[k:]
                else:
                    sub_to_insert = word[:j+1]

                self.insert(sub_to_insert, i)
                # print(f"inserting {word[k:]}")
                # print(f"new tree {self}")