import pandas as pd

class Loader:
    def __init__(self):
        pass
   
    def loadWords(self):
        # Contains many duplicates with different grammar types
        gold_pap = pd.read_csv("../data/gold/pap.csv", na_filter=False)[["pap-simple"]]
        
        nbo_pap = pd.read_csv("../data/nbo/pap(cap).csv", na_filter=False)
        nbo_pap = nbo_pap[nbo_pap["freq"] >= 7]
        nbo_pap = nbo_pap[["pap-simple"]]
        
        # Make sure golden goes first nbo will then come in order of frequency
        combined = pd.concat([gold_pap, nbo_pap])
        combined = combined.drop_duplicates(subset="pap-simple", ignore_index=True)

        return combined

if __name__ == "__main__":
    load = Loader()
    d = load.loadWords()
    d.to_csv("../data/gold/test.csv", index=None)

    