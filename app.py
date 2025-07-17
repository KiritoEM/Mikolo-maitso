#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from extension_shared import database
import  psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token, get_jwt_identity, jwt_required
)



import os
from dragoneye import Dragoneye, Image
from dotenv import load_dotenv
from PIL import Image as PILImage
from io import BytesIO



#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
import jwt
import datetime
from functools import wraps
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


from model.User import User
from model.Plant import Plant 
from model.Scanned_plant import Scanned_plant
from model.Diagnostic import Diagnostic
from model.Microcontroller import Microcontroller
from model.Sensor import Sensor
from model.Sensor_data import Sensor_data
from model.Irrigation_system import Irrigation_system
from model.Irrigation_action import Irrigation_action



# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# -------------------------^^^^^^^^^^^^^^^^^^^^^^^^^^---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#---------------------------- importation utiles ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#----------------------------------------------------------------------------- VARIABLES UTILES ----------------------------------------------------------------------------------------

c = 'creation'
r = 'recuperation'
d = 'delete'
x = 'modification'
cl = ["Plant","Scanned_plant","Diagnostic","Irrigation_system","Irrigationaction","Microcontroller","Sensor","Sensor_data","User"]


# ----------------- Initialisation Flask et base de données ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app = Flask(__name__)

CORS(app)
app.config['JWT_SECRET_KEY'] = 'ta_clé_secrète'
jwt = JWTManager(app)


#---------------------------------------------------------------------------

sqlite_db = 'sqlite:///mikolo_maitso.db'

#app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{name}:{mdp}@localhost/{db_name}'
app.config['SQLALCHEMY_DATABASE_URI'] = sqlite_db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
database.init_app(app)
#-------------------- un pour db et un pour des requettes sql directes


load_dotenv()
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

# Initialiser le client Dragoneye
dragoneye_client = Dragoneye(api_key=AUTH_TOKEN)


# -------------------------------------------------------------------- Routes \\ Operation CRUD // --------------------------------------------------------------------
    # DEBUT ------------ toutes creations ici ------------------

@app.route(f'/api/creation/Plant/',methods=['POST'])
def ajout_plant():
    data = request.get_json()
    new_plant = Plant(**data)
    database.session.add(new_plant)
    database.session.commit()
    return jsonify({'message': 'Plante ajoutée avec succès'}), 201

@app.route(f'/api/creation/Scanned_plant/',methods=['POST'])
def ajout_scanned_plant():
    data = request.get_json()
    new_scanned_plant = Scanned_plant(**data)
    database.session.add(new_scanned_plant)
    database.session.commit()
    return jsonify({'message': 'Plante scannée ajoutée avec succès'}), 201

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




@app.route(f'/api/creation/Diagnostic/',methods=['POST'])
def ajout_diagnostic():
    data = request.get_json()
    new_diagnostic = Diagnostic(**data)
    database.session.add(new_diagnostic)
    database.session.commit()
    return jsonify({'message': 'Diagnostic ajouté avec succès'}), 201

@app.route(f'/api/creation/Irrigation_system/',methods=['POST'])
def ajout_irrigation_system():
    data = request.get_json()
    new_irrigation_system = Irrigation_system(**data)
    database.session.add(new_irrigation_system)
    database.session.commit()
    return jsonify({'message': 'Système d\'irrigation ajouté avec succès'}), 201

@app.route(f'/api/creation/Irrigation_action/',methods=['POST'])
def ajout_irrigation_action():
    data = request.get_json()
    new_irrigationaction = Irrigation_action(**data)
    database.session.add(new_irrigationaction)
    database.session.commit()
    return jsonify({'message': 'Action d\'irrigation ajoutée avec succès'}), 201

@app.route(f'/api/creation/Microcontroller/',methods=['POST'])
def ajout_microcontroller():
    data = request.get_json()
    new_microcontroller = Microcontroller(**data)
    database.session.add(new_microcontroller)
    database.session.commit()
    return jsonify({'message': 'Microcontrôleur ajouté avec succès'}), 201

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@app.route(f'/api/creation/Sensor/',methods=['POST'])
def ajout_sensor():
    data = request.get_json()
    new_sensor = Sensor(**data)
    database.session.add(new_sensor)
    database.session.commit()
    return jsonify({'message': 'Capteur ajouté avec succès'}), 201

@app.route(f'/api/creation/Sensor_data/',methods=['POST'])
def ajout_sensor_data():
    data = request.get_json()
    new_sensor_data = Sensor_data(**data)
    database.session.add(new_sensor_data)
    database.session.commit()
    return jsonify({'message': 'Données du capteur ajoutées avec succès'}), 201
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

@app.route(f'/api/users/signin/',methods=['POST'])
def ajout_user():
    data = request.get_json()
    if 'password' in data:
        data['password'] = generate_password_hash(data['password'])
    new_user = User(**data)
    database.session.add(new_user)
    database.session.commit()
    return jsonify({'message': 'Utilisateur ajouté avec succès'}), 201

# FIN ------------ toutes creations ici ------------------








# Debut ------------- toutes recuperations ici ------------------

@app.route(f'/api/recuperation/Plant/<int:plant_id>', methods=['GET'])
def recuperation_plant_by_id(plant_id):
    plant = Plant.query.get(plant_id)
    if not plant:
        return jsonify({'message': 'Plante non trouvée'}), 404
    return jsonify(plant.to_dict()), 200

@app.route(f'/api/recuperation/Plant/<string:plant_name>', methods=['GET'])
def recuperation_plant_by_name(plant_name):
    plant = Plant.query.filter_by(current_name=plant_name).first()
    if not plant:
        return jsonify({'message': 'Plante non trouvée'}), 404
    return jsonify(plant.to_dict()), 200



#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


@app.route(f'/api/recuperation/Scanned_plant/<int:scanned_plant_id>', methods=['GET'])
def recuperation_scanned_plant_by_id(scanned_plant_id):
    scanned_plant = Scanned_plant.query.get(scanned_plant_id)
    if not scanned_plant:
        return jsonify({'message': 'Plante scannée non trouvée'}), 404
    return jsonify(scanned_plant.to_dict()), 200

@app.route(f'/api/recuperation/Diagnostic/<int:diagnostic_id>', methods=['GET'])
def recuperation_diagnostic_by_id(diagnostic_id):
    diagnostic = Diagnostic.query.get(diagnostic_id)
    if not diagnostic:
        return jsonify({'message': 'Diagnostic non trouvé'}), 404
    return jsonify(diagnostic.to_dict()), 200

@app.route(f'/api/recuperation/Irrigation_system/<int:irrigation_system_id>', methods=['GET'])
def recuperation_irrigation_system_by_id(irrigation_system_id):
    irrigation_system = Irrigation_system.query.get(irrigation_system_id)
    if not irrigation_system:
        return jsonify({'message': 'Système d\'irrigation non trouvé'}), 404
    return jsonify(irrigation_system.to_dict()), 200



@app.route(f'/api/recuperation/Irrigation_action/<int:irrigation_action_id>', methods=['GET'])
def recuperation_irrigation_action_by_id(irrigation_action_id):
    irrigation_action = Irrigation_action.query.get(irrigation_action_id)
    if not irrigation_action:
        return jsonify({'message': 'Action d\'irrigation non trouvée'}), 404
    return jsonify(irrigation_action.to_dict()), 200



@app.route(f'/api/recuperation/Microcontroller/<int:microcontroller_id>', methods=['GET'])
def recuperation_microcontroller_by_id(microcontroller_id):
    microcontroller = Microcontroller.query.get(microcontroller_id)
    if not microcontroller:
        return jsonify({'message': 'Microcontrôleur non trouvé'}), 404
    return jsonify(microcontroller.to_dict()), 200



@app.route(f'/api/recuperation/Sensor/<int:sensor_id>', methods=['GET'])
def recuperation_sensor_by_id(sensor_id):
    sensor = Sensor.query.get(sensor_id)
    if not sensor:
        return jsonify({'message': 'Capteur non trouvé'}), 404
    return jsonify(sensor.to_dict()), 200


@app.route(f'/api/recuperation/Sensor_data/<int:sensor_data_id>', methods=['GET'])
def recuperation_sensor_data_by_id(sensor_data_id):
    sensor_data = Sensor_data.query.get(sensor_data_id)
    if not sensor_data:
        return jsonify({'message': 'Données du capteur non trouvées'}), 404
    return jsonify(sensor_data.to_dict()), 200




def recuperation_all(obj_recup):
    objs = obj_recup.query.all()
    if not objs:
        return jsonify({'message': f'Aucun {obj_recup.__tablename__} trouvé'}), 404
    return jsonify([obj.to_dict() for obj in objs]), 200

@app.route(f'/api/all/recuperation/<string:to_get>',methods=['GET'])
def recuperation_all_objects(to_get):
    if to_get == 'Plant':
        return recuperation_all(Plant)
    elif to_get == 'Scanned_plant':
        return recuperation_all(Scanned_plant)
    elif to_get == 'Diagnostic':
        return recuperation_all(Diagnostic)
    elif to_get == 'Irrigation_system':
        return recuperation_all(Irrigation_system)
    elif to_get == 'Irrigation_action':
        return recuperation_all(Irrigation_action)
    elif to_get == 'Microcontroller':
        return recuperation_all(Microcontroller)
    elif to_get == 'Sensor':
        return recuperation_all(Sensor)
    elif to_get == 'Sensor_data':
        return recuperation_all(Sensor_data)
    elif to_get == 'User':
        return recuperation_all(User)
    else:
        return jsonify({'message': 'Type de récupération non reconnu'}), 400











def get(o):
    Obj = o.query.all()
    return jsonify([objet.to_dict() for objet in Obj ]), 200


@app.route('/new-api/recuperation/<string:types>/',methods=['GET'])
def recuperation(types):
    if types == 'Plant':
        return get(Plant)
    elif types == 'Scanned_plant':
        return get(Scanned_plant)
    elif types == 'Diagnostic':
        return get(Diagnostic)
    elif types == 'Irrigation_system':
        return get(Irrigation_system)
    elif types == 'Irrigation_action':
        return get(Irrigation_action)
    elif types == 'Microcontroller':
        return get(Microcontroller)
    elif types == 'User':
        return get(User)
    return {'message' : 'verifier votre routes'}



#---------------------------------------------------------------------------





        #################       #####################
        #                       3                  3
        #                       3               3
        #                       3           3
        #                       33333333333
        #                       3       3
        #                       3        333   
        #################       3          333     



#fin creation ----- specifique de toutes elements de la table -----------------




# Clé secrète pour signer le JWT



@app.route('/api/users/login/', methods=['POST'])
def authentification():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email et mot de passe requis'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404

    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Mot de passe incorrect'}), 401

    # Génération du JWT
    token = create_access_token(identity=user.id)

    return jsonify({
        'message': 'Authentification réussie',
        'token': token,
        'user': user.to_dict()  # Assure-toi que cette méthode existe dans ton modèle
    }), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        'message': f'Bienvenue {user.nom} ! Ceci est une ressource protégée.'
    }), 200



@app.route('/recup/',methods=['GET'])
def recup():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200










#fin recuperation ----- specifique de toutes elements de la table -----------------
# Fin ------------- toutes recuperations ici ------------------

# ------------------------------------------ debut suppression -----------------------------------------------
@app.route('/api/delete/Plant/', methods=['DELETE'])
def delete_plant():
    data = request.get_json()
    plant_id = data.get('id')
    plant = Plant.query.get(plant_id)
    if not plant:
        return jsonify({'message': 'Plante non trouvée'}), 404
    database.session.delete(plant)
    database.session.commit()
    return jsonify({'message': 'Plante supprimée avec succès'}), 200

# ------------------------------------------ fin suppression -------------------------------------------------
 


#-------------------------------------------------------------------- fin routes -----------------------------------------------------------------



@app.route('/href/librairie/creationall/things/',methods=['GET'])
def lancer():
    with app.app_context():
        Plant.__table__.create(database.engine)
        User.__table__.create(database.engine)
        Scanned_plant.__table__.create(database.engine)
        Diagnostic.__table__.create(database.engine)
        Microcontroller.__table__.create(database.engine)
        Sensor.__table__.create(database.engine)
        Sensor_data.__table__.create(database.engine)
        Irrigation_system.__table__.create(database.engine)
        Irrigation_action.__table__.create(database.engine)
        return f"Creation reussi"
    






#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



#------------------------------------Amboara ---------------------------------------


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










# ----------------- Lancement de l'application -----------------
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0',port=5000)

    



























































































































































































































































































#---------------------------------- Creation des tables ------------------------------


@app.route('/href/librairie/creationall/things/',methods=['GET'])
def lancer():
    with app.app_context():
        Plant.__table__.create(database.engine)
        User.__table__.create(database.engine)
        Scanned_plant.__table__.create(database.engine)
        Diagnostic.__table__.create(database.engine)
        Microcontroller.__table__.create(database.engine)
        Sensor.__table__.create(database.engine)
        Sensor_data.__table__.create(database.engine)
        Irrigation_system.__table__.create(database.engine)
        Irrigation_action.__table__.create(database.engine)
        return f"Creation reussi"
    

#--------------------------------  Creation des tablse --------------------------------