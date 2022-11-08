import pandas as pd
import config
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
        elif lan=="PAP-EN":
            dictionary, corpus = self.loadPapANToEN()

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
        combined = pd.concat([custom_pap, gold_pap, nbo_pap], ignore_index=True)
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
        combined = pd.concat([gold_pap, nbo_pap], ignore_index=True)
        combined = combined.drop_duplicates(subset="pap-simple", ignore_index=True)
        return combined

    def loadPapANToNL(self):
        cols = ["pap-simple", "nl-simple"]
        hny_pap_nl_raw = pd.read_csv("../data/hny/pap-nl.csv", na_filter=False, usecols=cols)
        custom_pap_nl_raw = pd.read_csv("../data/custom/pap-nl.csv", na_filter=False, usecols=cols)
        stpark_pap_nl_raw = pd.read_csv("../data/stparkpap/pap-nl(extracted_words).csv", na_filter=False, usecols=cols)
        rblx_pap_nl_raw = pd.read_csv("../data/rblx/pap-nl.csv", na_filter=False, usecols=cols)
        
        pap_nl_dfs = pd.concat([custom_pap_nl_raw, hny_pap_nl_raw, stpark_pap_nl_raw, rblx_pap_nl_raw], ignore_index=True)        
        pap_nl_dictionary = dict(zip(pap_nl_dfs["pap-simple"], pap_nl_dfs["nl-simple"]))
        
        pap = pap_nl_dfs[["pap-simple"]]
        pap_nl_corpus = pap.drop_duplicates(subset="pap-simple", ignore_index=True)
        return pap_nl_dictionary, pap_nl_corpus
    
    def loadPapANToEN(self):
        cols = ["pap-simple", "en-simple"]
        vre_pap_en_raw = pd.read_csv(config.vre["topapname"], na_filter=False, usecols=cols)
        custom_pap_en_raw = pd.read_csv("../data/custom/pap-en.csv", na_filter=False, usecols=cols)
        stpark_pap_en_raw = pd.read_csv("../data/stparkpap/pap-en(extracted_words).csv", na_filter=False, usecols=cols)

        # Ignore index to avoid duplicates and speed up
        pap_en_dfs = pd.concat([custom_pap_en_raw, vre_pap_en_raw, stpark_pap_en_raw], ignore_index=True)
        pap_en_dictionary = dict(zip(pap_en_dfs["pap-simple"], pap_en_dfs["en-simple"]))

        pap = pap_en_dfs[["pap-simple"]]

        # ignore index to avoid lapses in counting
        pap_en_corpus = pap.drop_duplicates(subset="pap-simple", ignore_index=True)
        return pap_en_dictionary, pap_en_corpus

if __name__ == "__main__":
    load = Loader()
    d = load.loadWords()
    d.to_csv("../data/gold/test.csv", index=None)

    