from    extension_shared import database as d 

class   Sensor_data(d.Model):
    __tablename__ = 'sensor_data'
    id = d.Column(d.Integer, primary_key=True,nullable=False,autoincrement=True)
    sensor_Value = d.Column(d.Float, nullable=False)
    mesure_date = d.Column(d.DateTime, nullable=False)
    sensor_id = d.Column(d.Integer,d.ForeignKey('sensor.id'),nullable=True)

    def to_dict(self):  
        return {
            "id": self.id,
            "sensor_Value": self.sensor_Value,
            "mesure_date": self.mesure_date.isoformat(),
            "sensor_id": self.sensor_id
        }