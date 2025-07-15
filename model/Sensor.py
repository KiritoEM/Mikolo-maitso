from    extension_shared import database as d
import enum

class   Sensor_enum(enum.Enum):
    ACTIVE  = 'active'
    DOWN    = 'down'  

class   Sensor(d.Model):
    __tablename__ = 'sensor'
    id = d.Column(d.Integer,primary_key=True,nullable=False,autoincrement=True)
    sensor_type = d.Column(d.Enum(Sensor_enum),nullable=False)
    mesure_unit = d.Column(d.String(50),nullable=False)
    microcontroller_id = d.Column(d.Integer,d.ForeignKey('microcontroller.id'))
    date = d.Column(d.DateTime,nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "sensor_type": self.sensor_type.value,
            "mesure_unit": self.mesure_unit,
            "microcontroller_id": self.microcontroller_id,
            "date": self.date.isoformat()
        }