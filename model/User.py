from    extension_shared import database
import  enum

class   role_enum(enum.Enum):
    ADMIN   =   'admin'
    USER    =   'user'
    EDITOR  =   'editor'

class   User(database.Model):
    __tablename__ = 'user'
    id = database.Column(database.Integer, primary_key=True,autoincrement=True)  
    email = database.Column(database.String(100), nullable=False)
    password = database.Column(database.String(100), nullable=False)
    profile_picture = database.Column(database.String(1000),nullable=True)
    role = database.Column(database.Enum(role_enum),default=role_enum.ADMIN,nullable=False)
    username = database.Column(database.String(100), nullable=True, unique=True)
    created_at = database.Column(database.DateTime, server_default=database.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "profile_picture": self.profile_picture,
            "role": self.role.value
        }