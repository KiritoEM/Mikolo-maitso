from    extension_shared import database
from    sqlalchemy import LargeBinary
import  base64

class   Plant(database.Model):
    __tablename__ = 'plant'
    id              = database.Column(database.Integer, primary_key=True,autoincrement=True)
    #image           = database.Column(database.String(1000),nullable=False)
    image           = database.Column(database.LargeBinary, nullable=True)  # Use largeBinary for image data
    scientific_name = database.Column(database.String(100),nullable=False)
    current_name    = database.Column(database.String(100),nullable=False)
    characteristic  = database.Column(database.String(500),nullable=False)
    water_need      = database.Column(database.Float,nullable=False)
    nourishment_need = database.Column(database.Float,nullable=True)
    light_need      = database.Column(database.Float,nullable=True)

    #float au lieu d'int
    def to_dict(self):
        return {
            "id": self.id,
            "image":  base64.b64encode(self.image).decode('utf-8') if self.image else None,
            "scientific_name": self.scientific_name,
            "current_name": self.current_name,
            "characteristic": self.characteristic,
            "water_need": self.water_need,
            "nourishment_need": self.nourishment_need,
            "light_need": self.light_need
        }