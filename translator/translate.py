from os import stat
from deep_translator import GoogleTranslator
import unicodedata

class Translate:
    def __init__(self):
        self.translator_nl_en = GoogleTranslator(source='nl', target='en')
        self.translator_en_nl = GoogleTranslator(source='en', target='nl') 

    @staticmethod
    def distanceToWord(hide, seek):

        # Deal with nan string
        hide = str(hide)
        seek = str(seek)
        max_search = len(seek)
        distance = abs(len(hide)-len(seek))
        if len(seek) > len(hide):
            max_search = len(hide)
        
        for i in range(0, max_search):
            if hide[i] != seek[i]:
                distance += 1
        return distance

    @staticmethod
    def remove_accents(input_str):
        # Convert to string to deal with nan string
        nfkd_form = unicodedata.normalize('NFKD', str(input_str))
        return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

    @staticmethod
    def attachClosest(df, word):
        df["closest"] = df.apply(lambda row: min( 
            (Translate.distanceToWord(Translate.remove_accents(row.name), word) + 0.001),
            Translate.distanceToWord(row.name, word)
        ), axis=1)
        df.sort_values(by="closest", inplace= True)


    def correctSentence(self, sentence):
        nl_en = self.translator_nl_en.translate(sentence)
        en_nl = self.translator_en_nl.translate(nl_en)
        return en_nl