from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Task(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(1200000), unique=False, nullable=False)
    # dueDate = db.Column(db.Date(), unique=False, nullable=True)
    # created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    date = db.Column(db.Date(), unique=False, nullable=True)
    # date = db.Column(db.Date(), unique=False, nullable=True)
    completed = db.Column(db.Boolean(), unique=False, nullable=True)
    priority = db.Column(db.Integer, unique=False, default=0, nullable=True)
    # thotType = db.Column(db.String(10), unique=False, default=0, nullable=True)

    def __repr__(self):
        return f'<Task {self.label}>'

    def serialize(self):
        return {
            "id": self.id,
            "label": self.label,
            "date": self.date,
            "completed": self.completed,
            # "type": self.thotType,
            "priority": self.priority
            # do not serialize the password, its a security breach
        }

class Notes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String(100000), unique=False, nullable=True)
    
    def __repr__(self):
        return f'<Notes {self.notes}>'

    def serialize(self):
        return {
            "id": self.id,
            "notes": self.notes
            # do not serialize the password, its a security breach
        }