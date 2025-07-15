from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from extension_shared import database
import  psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
# -------------------- ^^^^^^^^^^^^^^^^^^^^^^^^^^---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

name = "postgres" 
mdp = "thia"            #changes le par ton mdp postgreSQL
db_name = "mikolomaitso"    #changes le par le nom de ta DB

#---------------------------------------------------------------------------

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{name}:{mdp}@localhost/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
database.init_app(app)
#-------------------- un pour db et un pour des requettes sql directes

#---------------------
"""conn = psycopg2.connect(
    dbname=db_name,
    user=name,
    password=mdp,
    host="localhost"
)
cur = conn.cursor()

"""

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
@app.route(f'/api/creation/User/',methods=['POST'])
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


liste = ["Plant","Scanned_plant","Diagnostic","Irrigation_system","Irrigationaction","Microcontroller","Sensor","Sensor_data","User"]
c = 'creation'
r = 'recuperation'
d = 'delete'
x = 'modification'
cl = ["Plant","Scanned_plant","Diagnostic","Irrigation_system","Irrigationaction","Microcontroller","Sensor","Sensor_data","User"]

"""
def transformation(str,choix):
    return f" '/api/{choix}/{str}' "

listes = [transformation(li,d) for li in cl]

supr = "supprimée avec succès"
find = "non trouvée"

@app.route(listes[5],methods=['DELETE'])
def delete_microcontroller():
    data = request.get_json()
    micro_id = data.get('id')
    micro = Microcontroller.query.get(micro_id)
    if not micro :
        return jsonify({'message' : f'microcontroller {find}'}), 404
    database.session.delete(micro)
    database.session.commit()
    return jsonify({'message' : f'microcontroller {supr}'})
"""
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
    

# ----------------- Lancement de l'application -----------------
if __name__ == '__main__':
    app.debug = True
    app.run()

    























































































































































































































































































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