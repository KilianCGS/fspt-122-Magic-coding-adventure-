from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "supersecretkey"

jwt = JWTManager(app)

users = {}

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    if username in users:
        return jsonify({"msg": "Usuario ya existe"}), 400

    users[username] = {
        "password": generate_password_hash(password),
        "email": email
    }

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users.get(username)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(msg="Acceso permitido al usuario autenticado")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
