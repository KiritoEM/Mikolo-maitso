from    extension_shared import database as d

class   Irrigation_action(d.Model):
    __tablename__ = 'irrigation_action'
    id  = d.Column(d.Integer,primary_key=True,autoincrement=True)
    quantity = d.Column(d.Float)
    date_action = d.Column(d.DateTime,nullable=False)
    irrigation_system_id= d.Column(d.Integer,d.ForeignKey('irrigation_system.id'),nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "date_action": self.date_action.isoformat(),
            "irrigation_system_id": self.irrigation_system_id
        }