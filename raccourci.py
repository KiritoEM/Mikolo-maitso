#__________________________________________________________________________________________________________________________________________
# Ce fichier contient les routes de l'API pour la creation, la recuperation, la suppression et la modification des entites de l'application.
# Il est divise en plusieurs sections : creation, recuperation, suppression et modification.
#__________________________________________________________________________________________________________________________________________

#toutes les routes seront ici

## creation
# /api/creation/Plant/
# /api/creation/Scanned_plant/        
# /api/creation/Diagnostic/
# /api/creation/Irrigation_system/    
# /api/creation/Irrigation_action/     
# /api/creation/Microcontroller/      
# /api/creation/Sensor/
# /api/creation/Sensor_data/
# /api/creation/User/

##recuperation
# /api/recuperation/Plant/
# /api/recuperation/Scanned_plant/    
# /api/recuperation/Diagnostic/       
# /api/recuperation/Irrigation_system/
# /api/recuperation/Irrigation_action/ 
# /api/recuperation/Microcontroller/  
# /api/recuperation/Sensor/
# /api/recuperation/Sensor_data/
# /api/recuperation/User/

## suprression
# /api/delete/Plant/
# /api/delete/Scanned_plant/
# /api/delete/Diagnostic/
# /api/delete/Irrigation_system/
# /api/delete/Irrigation_action/
# /api/delete/Microcontroller/
# /api/delete/Sensor/
# /api/delete/Sensor_data/
# /api/delete/User/

## modification
# /api/modification/Plant/
# /api/modification/Scanned_plant/
# /api/modification/Diagnostic/
# /api/modification/Irrigation_system/
# /api/modification/Irrigation_action/
# /api/modification/Microcontroller/
# /api/modification/Sensor/
# /api/modification/Sensor_data/
# /api/modification/User/

    #__________________________________________________________________________________________________________________________________________

















liste = ["Plant","Scanned_plant","Diagnostic","Irrigation_system","Irrigationaction","Microcontroller","Sensor","Sensor_data","User"]
#for li in liste:
 #   print(f"from model.{li} import {li} \n")
c = 'creation'
r = 'recuperation'
d = 'delete'
x = 'modification'
cl = ["Plant","Scanned_plant","Diagnostic","Irrigation_system","Irrigationaction","Microcontroller","Sensor","Sensor_data","User"]

def transformation(str,choix):
    return f" '/api/{choix}/{str}' "

listes = [transformation(li,c) for li in cl]
print(listes)