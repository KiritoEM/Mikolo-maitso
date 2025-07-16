import os
from flask import Flask, request, jsonify
from dragoneye import Dragoneye, Image
from dotenv import load_dotenv
from PIL import Image as PILImage
from io import BytesIO

# Charger les variables d’environnement
load_dotenv()
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

# Initialiser le client Dragoneye
dragoneye_client = Dragoneye(api_key=AUTH_TOKEN)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "Aucun fichier image trouvé"}), 400

    image_file = request.files['image']

    # Valider le fichier image
    try:
        test_img = PILImage.open(BytesIO(image_file.read()))
        image_file.seek(0)  # Revenir au début du fichier après lecture
    except Exception:
        return jsonify({"error": "Fichier image invalide"}), 400

    try:
        # Construire l’objet image
        image = Image(file_or_bytes=image_file.read())

        # Effectuer la prédiction
        prediction_result = dragoneye_client.classification.predict(
            image=image,
            model_name="dragoneye/plants"
        )

        results = []

        for obj in prediction_result.predictions:
            category = obj.category
            results.append({
                "id": category.id,
                "type": category.type.name,
                "name": category.name,
                "displayName": category.displayName,
                "score": category.score,
                "bbox": obj.normalizedBbox
            })

        return jsonify({"predictions": results})

    except Exception as e:
        return jsonify({
            "error": "Erreur serveur",
            "details": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)
