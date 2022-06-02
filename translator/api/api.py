import time
from flask import Flask, request


app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/translation', methods=['POST'])
def parse_request():
    data = request.data  # data is empty
    print(data)
    # print("form:", request.form)
    # need posted data here
    return "OKAY"

if __name__ == "__main__":
    print("yuo")

# Use python -m flask run to run