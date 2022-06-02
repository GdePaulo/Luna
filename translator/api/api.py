import time
from flask import Flask, request, jsonify

import sys, os
sys.path.append(r"C:\Users\Ameno\Desktop\luna\translator")

from translate import Translate
import pandas as pd

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/translation', methods=['POST'])
def parse_request():
    
    data = request.data.decode("UTF-8")  # data is empty
    print(data)
    # print("form:", request.form)
    # need posted data here

    ffa = pd.read_csv(f"../data/ffa/pap.csv")
    # spell_check = "mi baria ta hasi dolo hesus"
    # spell_check = "claridat"
    spell_check = data
    translations = {}

    for word in spell_check.split():
        word = word.lower()
        words_corpus = Translate.attachClosest(ffa, word, "pap-simple")
        closest_word = words_corpus.iloc[0].values
        # print(words_corpus.head(3))
        print(f"word:{word} closest:{closest_word}")
        translations[word] = words_corpus.head(3)["pap-simple"].to_list()
    test = {"te,st":["okay", "more"]}
    print(translations, test)
    print("Returning", test)
    return jsonify(translations)

if __name__ == "__main__":
    print("yuo")

# Use python -m flask run to run