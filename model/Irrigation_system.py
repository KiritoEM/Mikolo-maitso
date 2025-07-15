from extension_shared import database as d
import  enum

class   Irrigation_enum(enum.Enum):
    ACTIVE  = 'active'
    DOWN    = 'down'   

class   Irrigation_system(d.Model):
    __tablename__ = 'irrigation_system'
    id = d.Column(d.Integer,primary_key=True,nullable=False,autoincrement=True)
    last_action = d.Column(d.DateTime,nullable=False)
    mode = d.Column(d.Enum(Irrigation_enum),default=Irrigation_enum.DOWN,nullable=True)
    microcontroller_id = d.Column(d.Integer, d.ForeignKey('microcontroller.id'),nullable=False)
    plant_id = d.Column(d.Integer,d.ForeignKey('plant.id'),nullable=False)
    date = d.Column(d.DateTime,nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "last_action": self.last_action.isoformat(),
            "mode": self.mode.value,
            "microcontroller_id": self.microcontroller_id,
            "plant_id": self.plant_id,
            "date": self.date.isoformat()
        }