from flask import Flask, request, jsonify, render_template
import serial
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/arroser", methods=["POST"])
def arroser():
    data = request.get_json()
    quantite = data.get("quantite")

    try:
        quantite = int(quantite)
        with serial.Serial('COM5', 9600, timeout=1) as arduino:
            time.sleep(2)  # Temps pour que l'Arduino reset la liaison série
            arduino.write(f"{quantite}\n".encode())
        return jsonify({"message": f"{quantite} ml envoyés à l'Arduino."})
    except Exception as e:
        return jsonify({"message": f"Erreur : {e}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
