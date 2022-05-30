import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == "__main__":
    print("yuo")

# Use python -m flask run to run