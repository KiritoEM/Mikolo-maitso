from    extension_shared import database as d

class Diagnostic(d.Model):
    __tablename__ = 'diagnostic'
    id = d.Column(d.Integer, primary_key=True,autoincrement=True)
    detected_state = d.Column(d.String(500))
    diagnostic_date = d.Column(d.DateTime,nullable=False)
    scanned_plant_id = d.Column(d.Integer, d.ForeignKey('scanned_plant.id'),nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "detected_state": self.detected_state,
            "diagnostic_date": self.diagnostic_date.isoformat(),
            "scanned_plant_id": self.scanned_plant_id
        }