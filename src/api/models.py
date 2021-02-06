from flask_sqlalchemy import SQLAlchemy

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
    label = db.Column(db.String(120), unique=False, nullable=False)
    date = db.Column(db.Date(), unique=False, nullable=False)
    completed = db.Column(db.Boolean(), unique=False, nullable=False)
    priority = db.Column(db.Integer, unique=False, default=0, nullable=False)


    def __repr__(self):
        return f'<Task {self.label}>'

    def serialize(self):
        return {
            "label": self.label,
            "date": self.date,
            "completed": self.completed
            # do not serialize the password, its a security breach
        }