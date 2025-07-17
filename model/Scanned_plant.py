from    extension_shared import database as db
import enum

class   Plant_scan_enum(enum.Enum):
    SAIN        = 'sain'
    MALADE      = 'malade'
    INFESTE     = 'infeste'

class   Scanned_plant(db.Model):
    __tablename__ = 'scanned_plant'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    #plant_state = db.Column(db.Enum(Plant_scan_enum),default=Plant_scan_enum.SAIN,nullable=True)
    #scanned_at = db.Column(db.DateTime,nullable=False)
    #image_scanned = db.Column(db.String(500),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    plant_id = db.Column(db.Integer,db.ForeignKey('plant.id'),nullable=False)

    def to_dict(self): 
        return {
            "id": self.id,
            #plant_state": self.plant_state.value,
            #"scanned_at": self.scanned_at.isoformat(),
            #"image_scanned": self.image_scanned,
            "user_id": self.user_id,
            "plant_id": self.plant_id
        }