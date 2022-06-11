from flask import Flask, request, jsonify
import os
import time
from translate import Translate
import pandas as pd

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# add filter to deal with not available number values
hny_pap_nl = pd.read_csv("data/hny/pap-nl.csv", na_filter=False)
d = hny_pap_nl
d_words =  d[d["type"]=="word"]
trans = Translate(spellchecker_corpus=d_words["pap-simple"].values)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/spellcheck', methods=['POST'])
def parse_request():
    data = request.data.decode("UTF-8")
    data_words = Translate.findWords(data)
    print(data_words)
    corrections = trans.getMixedWordCorrections(data_words, d_words)

    print(f"Correcting:{data}\nReturning:{corrections}")
    return jsonify(corrections)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
