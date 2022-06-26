class Trie:
    def __init__(self, lastNode=False):
        self.children = {}
        self.lastNode = lastNode
        self.accented = {
            "a" : ["à","á"], 
            "e" : ["è","é"], 
            "i" : ["ì","í"], 
            "o" : ["ò","ó"], 
            "u" : ["ù","ú"], 
            "n" : ["ñ"], 
        }
    def __str__(self):
        if self.children:
            ret = f"{len(self.children)}"
            for k, v in self.children.items():
                ret += f" {k}: {v.lastNode} {v}"
            return ret
        else:
            return ""

    def insert(self, word):
        current = self
        for i, l in enumerate(word):
            if l in current.children:
                # print(f"from {current} -> ")
                current = current.children[l]
                # print(f"to {current}")
            else:
                newNode = Trie()
                # print(f"inserting {l} into {current}")
                current.children[l] = newNode
                # print(f"new {len(current.children)} children {current}")
                current = newNode
            if i == len(word)-1:
                current.lastNode = True

    def find(self, word, case=False):

        current = self
        for i, l in enumerate(word):
            children = current.children
            if not case:
                l = l.lower()
            if l in children:
                current = children[l]
                if i == len(word)-1:
                    return current.lastNode
            else:
                return False

    def lenientFind(self, word):
        found_word = "" 
        current = self
        for i, l in enumerate(word):
            found_key = False
            # print(f"checking if {l} has accented")
            if l in self.accented:
                for accented_l in self.accented[l]:
                    # print(f"checking {accented_l}")
                    if accented_l in current.children:
                        # print(f"found {accented_l}")
                        accented_search = accented_l + word[i+1:]
                        found_accented_word = current.lenientFind(accented_search)
                        if found_accented_word:
                            return found_word + found_accented_word
                
            if l in current.children:
                current = current.children[l]
                found_word += l
                found_key = True

            if not found_key:
                return ""
            
            if i == len(word)-1:
                if current.lastNode:
                    return found_word
                else:
                    return ""
            
    
    def populate(self, words, case=False):
        for word in words:
            if case:
                self.insert(word)
            else:
                self.insert(word.lower())