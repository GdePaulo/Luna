import pandas as pd

class Loader:
    def __init__(self):
        pass
   
    def loadWords(self, lan="PAP"):
        corpus = None
        print(lan)
        if lan=="PAP":
            corpus = self.loadPapAN()
        elif lan=="PAP(AW)":
            corpus = self.loadPapAW()

        return corpus.iloc[:, 0].values
    
    def loadDictionary(self, lan="PAP-NL"):
        corpus = None
        print(lan)
        
        if lan=="PAP-NL":
            dictionary, corpus = self.loadPapANToNL()

        return dictionary, corpus.iloc[:, 0].values

    def loadPapAN(self, freq_threshold=7):
        custom_pap = pd.read_csv("../data/custom/pap.csv", na_filter=False)[["pap-simple"]]
        
        # Contains many duplicates with different grammar types
        # add filter to deal with not available number values
        gold_pap = pd.read_csv("../data/gold/pap.csv", na_filter=False)[["pap-simple"]]
        
        nbo_pap = pd.read_csv("../data/nbo/pap(cap).csv", na_filter=False)
        nbo_pap = nbo_pap[nbo_pap["freq"] >= freq_threshold]
        nbo_pap = nbo_pap[["pap-simple"]]
        
        # Make sure golden goes first nbo will then come in order of frequency
        combined = pd.concat([custom_pap, gold_pap, nbo_pap])
        combined = combined.drop_duplicates(subset="pap-simple", ignore_index=True)
        return combined
    
    def loadPapAW(self, freq_threshold=7):        
        # Contains many duplicates with different grammar types
        # add filter to deal with not available number values
        gold_pap = pd.read_csv("../data/ffa/pap.csv", na_filter=False)[["pap-simple"]]
        
        nbo_pap = pd.read_csv("../data/mrng/pap(cap).csv", na_filter=False)
        nbo_pap = nbo_pap[nbo_pap["freq"] >= freq_threshold]
        nbo_pap = nbo_pap[["pap-simple"]]
        
        # Make sure golden goes first nbo will then come in order of frequency
        combined = pd.concat([gold_pap, nbo_pap])
        combined = combined.drop_duplicates(subset="pap-simple", ignore_index=True)
        return combined

    def loadPapANToNL(self):
        pap_nl_raw = pd.read_csv("../data/hny/pap-nl.csv", na_filter=False)
        pap_nl = pap_nl_raw[["pap-simple", "nl-simple"]]
        pap_nl_dictionary = dict(zip(pap_nl["pap-simple"], pap_nl["nl-simple"]))

        pap = pap_nl[["pap-simple"]]
        combined = pap.drop_duplicates(subset="pap-simple", ignore_index=True)
        return pap_nl_dictionary, combined

if __name__ == "__main__":
    load = Loader()
    d = load.loadWords()
    d.to_csv("../data/gold/test.csv", index=None)

    