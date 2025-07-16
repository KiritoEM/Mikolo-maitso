from flask import jsonify, request, Flask

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
