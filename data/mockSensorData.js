export const sensors =[
    { 
        id:1, sensor_type:'humidity',mesure_unit: '%'
    },
    {
        id:2, sensor_type: 'light',mesure_unit: 'lux'
    },
    {
        id:3, sensor_type:'temperature',mesure_unit: '°C'
    }
];


export const sensorData =[
    {
        sensor_id : 1, sensor_value:72, mesure_date: new Date().toISOString(),
    },
    {
        sensor_id : 2, sensor_value:750, mesure_date: new Date().toISOString(),
    },
    {
        sensor_id : 3, sensor_value:22.5, mesure_date: new Date().toISOString(),
    }
]