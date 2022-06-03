from gettext import translation
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
    data = request.data.decode("UTF-8")

    ffa = pd.read_csv(f"../data/ffa/pap.csv")
    translations = Translate.getWordCorrections(data, ffa)
    print(f"Correcting:{data}\nReturning:{translations}")
    return jsonify(translations)

if __name__ == "__main__":
    print("yuo")

# Use to run
# python -m flask run