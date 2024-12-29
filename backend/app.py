from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from nlp_utils import is_valid_association, get_similarity
import os

app = Flask(__name__)
CORS(app)

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client.word_association

@app.route('/')
def home():
    return "Welcome to the Word Association Game API"

@app.route('/validate', methods=['POST'])
def validate():
    data = request.json
    word1 = data.get('word1')
    word2 = data.get('word2')
    threshold = data.get('threshold', 0.2)

    if not word1 or not word2:
        return jsonify({"error": "Missing words"}), 400
    try:
        similarity = float(get_similarity(word1, word2))  # Convert to Python float
        is_valid = is_valid_association(word1, word2, threshold)
        print(f"[DEBUG] Backend Response: valid={is_valid}, similarity={similarity}")
        return jsonify({"valid": is_valid, "similarity": similarity})
    except KeyError as e:
        print(f"[DEBUG] KeyError: {e}")
        return jsonify({"valid": False, "similarity": None})

@app.route('/save-chain', methods=['POST'])
def save_chain():
    data = request.json
    chain = data.get('chain', [])
    if not chain:
        return jsonify({"error": "No chain provided"}), 400

    db.chains.insert_one({"chain": chain})
    return jsonify({"message": "Chain saved successfully"})


if __name__ == '__main__':
    app.run(debug=True)