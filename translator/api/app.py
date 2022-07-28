from flask import Flask, request, jsonify
import os, sys

# sys.path.append(os.path.abspath('../code'))
import time
from spellcheck import Spellcheck
from loader import Loader
from util import Util
import pandas as pd

app = Flask(__name__)

# Preserve order of words 
app.config['JSON_SORT_KEYS'] = False

spell = None

def initialize_spellchecker(lan="PAP"):
    global spell
    if spell is not None and spell.lan == lan:
        print("Spell already initialized.")
        return

    load = Loader()
    corpus = load.loadWords(lan=lan)
    spell = Spellcheck(spellchecker_corpus=corpus, lan=lan, load=True)

@app.route('/api/spellcheck/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/spellcheck/spellcheck', methods=['POST'])
def parse_request():
    data = request.data.decode("UTF-8")    
    if(len(data) > 10000):
        print("String too long.")
        return jsonify({"error": ["String too long"]})
    data_words = Util.findWords(data)
    # print(data_words)
    data_words_unique = Util.removeDuplicates(data_words)

    lan = request.args.get('lan')
    initialize_spellchecker(lan=lan)

    corrections = spell.getPreSufCorrections(data_words_unique, words_only=True, penalize_mismatch=True)
    # print(f"Correcting:{data}\nReturning:{corrections}")
    return jsonify(corrections)

@app.route('/api/spellcheck/accentcheck', methods=['POST'])
def parse_request_accent():
    data = request.data.decode("UTF-8")    
    data_words = Util.findWords(data)
    # print(data_words)
    data_words_unique = Util.removeDuplicates(data_words)

    lan = request.args.get('lan')
    initialize_spellchecker(lan=lan)

    corrections = spell.getAccentCorrections(data_words_unique)
    # print(f"Correcting:{data}\nReturning:{corrections}")
    return jsonify(corrections)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
