from    extension_shared import database

class   Plant(database.Model):
    __tablename__ = 'plant'
    id              = database.Column(database.Integer, primary_key=True,autoincrement=True)
    image           = database.Column(database.String(1000),nullable=False)
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
            "image": self.image,
            "scientific_name": self.scientific_name,
            "current_name": self.current_name,
            "characteristic": self.characteristic,
            "water_need": self.water_need,
            "nourishment_need": self.nourishment_need,
            "light_need": self.light_need
        }