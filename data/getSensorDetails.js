import { sensorData, sensors } from "./mockSensorData";

// fonction qui prend le type de capteur

export const GetSensorDetails =(type) =>{
    // on cherche le capteur dans la liste

    const sensor = sensors.find(s => s.sensor_type == type)

    // on le cherche avec l'id
    const data = sensorData.find( d => d.sensor_id == sensor?.id)

    return {
        value : data?.sensor_value,
        unit: sensor?.mesure_unit,
        date : data?.mesure_date
    }
}