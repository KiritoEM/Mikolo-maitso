from    extension_shared import database as d

class Microcontroller(d.Model):
    __tablename__ = 'microcontroller'
    id = d.Column(d.Integer, primary_key=True,nullable=False,autoincrement=True)
    name = d.Column(d.String(50),nullable=False)
    ip = d.Column(d.String(20),nullable=False)
    las_action  = d.Column(d.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ip": self.ip,
            "las_action": self.las_action.isoformat()
        }  