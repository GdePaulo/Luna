from gettext import translation
import time
from flask import Flask, request, jsonify

import sys, os
sys.path.append(os.path.abspath('../code'))

from translate import Translate
from spellcheck import Spellcheck
from loader import Loader
from util import Util
import pandas as pd

app = Flask(__name__)
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
    if(len(data) > 50000):
        print("String too long.")
        return jsonify({"error": ["String too long"]})
    data_words = Util.findWords(data)
    print(data_words)   

    data_words_unique = Util.removeDuplicates(data_words)

    lan = request.args.get('lan')
    initialize_spellchecker(lan=lan)
    
    corrections = spell.getPreSufCorrections(data_words_unique, words_only=True, penalize_mismatch=True)

    print(f"Correcting:{data}\nReturning:{corrections}")
    return jsonify(corrections)

@app.route('/api/spellcheck/accentcheck', methods=['POST'])
def parse_request_accent():
    data = request.data.decode("UTF-8")    
    data_words = Util.findWords(data)
    print(data_words)

    data_words_unique = Util.removeDuplicates(data_words)

    lan = request.args.get('lan')
    initialize_spellchecker(lan=lan)

    corrections = spell.getAccentCorrections(data_words_unique)
    
    print(f"Correcting:{data}\nReturning:{corrections}")
    return jsonify(corrections)

@app.route('/api/translate/word', methods=['POST'])
def parse_request_translate_word():
    data = request.data.decode("UTF-8")    
    if(len(data) > 5000):
        print("String too long.")
        return jsonify({"error": ["String too long"]})
    data_words = data
    print(data_words)   

    source_lan = request.args.get('srclan')
    target_lan = request.args.get('trgtlan')
    print(f"Translating for {source_lan} -> {target_lan}")
    # initialize_spellchecker(lan=lan)
    
    # corrections = spell.getPreSufCorrections(data_words_unique, words_only=True, penalize_mismatch=True)

    # print(f"Correcting:{data}\nReturning:{corrections}")
    result = {"corrected":"whatever", "translated":"what"}
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))

# Use to run
# cd translator/api
# conda activate luna-translate
# python -m flask run

###
# took a long time, but I had to select the link for seeing all the service accounts in the firebase console before it took me to
# the Google cloud platform from firebase and finally revealed luna within firebase. kept getting permission error when trying to 
# build to the cloud beforehand and couldn't find how to solve it. then there was still an error, but I had read somewhere before in my searches
# the billing needs to be enabled and saw that it wasn't for Luna after it appeared.
# https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run
# https://medium.com/firebase-developers/hosting-flask-servers-on-firebase-from-scratch-c97cfb204579
# https://www.infoworld.com/article/3585633/how-to-make-the-most-of-the-google-cloud-free-tier.html

# https://cloud.google.com/storage/pricing#storage-pricing18

# cd translator
# gcloud builds submit --tag gcr.io/luna-8a91a/flask-fire
# gcloud beta run deploy --image gcr.io/luna-8a91a/flask-fire

# gcloud beta run deploy luna-cloud-run --image gcr.io/luna-8a91a/flask-fire --region=europe-west4

# Check out cloud functions as well
# To test rewrite of firebase (possibly before running npm run build):
# firebase serve --only hosting 

###