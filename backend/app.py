from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")  # Allow Vite frontend access

# MongoDB Connection URI
MONGO_URI = "mongodb+srv://riachaudhari:centralorchid17@blinkit.b8zrx.mongodb.net/?retryWrites=true&w=majority&appName=blinkit"
client = MongoClient(MONGO_URI)
db = client["blinkit"]  # Your DB name
collection = db["category"]  # Your collection with categories

# Get all categories with product info
@app.route("/get-categories", methods=["GET"])
def get_categories():
    categories = list(collection.find({}, {"_id": 0}))
    return jsonify(categories)

# Get products of a specific category by name (e.g., Bakery & Biscuit)
@app.route("/categories/<category_name>", methods=["GET"])
def get_category_by_name(category_name):
    category = collection.find_one({"name": category_name}, {"_id": 0})
    if category:
        return jsonify(category)
    else:
        return jsonify({"error": "Category not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
