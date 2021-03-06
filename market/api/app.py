# app.py

# Required imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask app
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('../secret/key.json')
default_app = initialize_app(cred)
db = firestore.client()
planet_ref = db.collection('planets')

@app.route('/api/market/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        planet_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/api/market/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON.
        planet : Return document that matches query ID.
        all_planets : Return all documents.
    """
    try:
        # Check if ID was passed to URL query
        planet_id = request.args.get('id')
        if planet_id:
            planet = planet_ref.document(planet_id).get()
            return jsonify(planet.to_dict()), 200
        else:
            all_planets = [doc.to_dict() for doc in planet_ref.stream()]
            return jsonify(all_planets), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/api/market/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        planet_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

@app.route('/api/market/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        planet_id = request.args.get('id')
        planet_ref.document(planet_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"

# Remove debugging in production
port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    # app.run(threaded=True, host='0.0.0.0', port=port)
    app.run(debug=True, host='0.0.0.0', port=port)