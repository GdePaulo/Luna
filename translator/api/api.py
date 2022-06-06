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
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))

# Use to run
# python -m flask run

###
# took a long time, but I had to select the link for seeing all the service accounts in the firebase console before it took me to
# the Google cloud platform from firebase and finally revealed luna within firebase. kept getting permission error when trying to 
# build to the cloud beforehand and couldn't find how to solve it. then there was still an error, but I had read somewhere before in my searches
# the billing needs to be enabled and saw that it wasn't for Luna after it appeared.
# https://medium.com/firebase-developers/hosting-flask-servers-on-firebase-from-scratch-c97cfb204579
# https://www.infoworld.com/article/3585633/how-to-make-the-most-of-the-google-cloud-free-tier.html

# https://cloud.google.com/storage/pricing#storage-pricing18
# gcloud builds submit --tag gcr.io/luna-8a91a/flask-fire
# gcloud beta run deploy --image gcr.io/luna-8a91a/flask-fire
# Check out cloud functions as well
# To test rewrite of firebase (possibly before running npm run build):
# firebase serve --only hosting 

###