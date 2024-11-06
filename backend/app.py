from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
collection = db["users"]


@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        # Récupère tous les documents de la collection 'users'
        users = list(
            collection.find({}, {"_id": 0})
        )  # Exclut le champ '_id' de la réponse
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Missing name or email"}), 400

    # Insertion dans MongoDB
    user = {"name": name, "email": email}
    collection.insert_one(user)
    return jsonify({"message": "User registered successfully"}), 201


print(app.url_map)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
