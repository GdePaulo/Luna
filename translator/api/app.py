from flask import Flask, request, jsonify
import os
import time
from translate import Translate
import pandas as pd

app = Flask(__name__)

def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/translation', methods=['POST'])
def parse_request():
    data = request.data.decode("UTF-8")

    ffa = pd.read_csv(f"data/ffa/pap.csv")
    translations = Translate.getWordCorrections(data, ffa)
    print(f"Correcting:{data}\nReturning:{translations}")
    return jsonify(translations)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
