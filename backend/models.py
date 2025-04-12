from pymongo import MongoClient

# MongoDB Connection
MONGO_URI = "mongodb+srv://riachaudhari:centralorchid17@blinkit.b8zrx.mongodb.net/?retryWrites=true&w=majority&appName=blinkit"
client = MongoClient(MONGO_URI)
db = client["blinkit"]  # Database name

# Categories Collection
categories = db["category"]

# Sample Data Structure
sample_category = {
    "name": "Fruits & Vegetables",
    "image": "fruits.jpg",
    "products": [
        {"name": "Apple", "image": "apple.jpg", "price": 50},
        {"name": "Banana", "image": "banana.jpg", "price": 30}
    ]
}

# Insert Sample Category (Only Run Once)
if categories.count_documents({}) == 0:
    categories.insert_one(sample_category)
    print("Sample category inserted!")
