from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=True)
    last_name = db.Column(db.String(120), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    # tasks = db.relationship('Task', backref='user', lazy=True)
    # notes = db.relationship('Notes', backref='user', lazy=True, uselist=False)

    def __repr__(self):
        return '<User %r>' % self.user

    def serialize(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            # "tasks": list(map(lambda x : x.serialize(), self.tasks)),
            # "notes": self.notes
            # do not serialize the password, its a security breach
        }

# class Person(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     addresses = db.relationship('Address', backref='person', lazy=True)

# class Address(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(120), nullable=False)
#     person_id = db.Column(db.Integer, db.ForeignKey('person.id'),
#         nullable=False)

class Task(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(1200000), unique=False, nullable=False)
    date = db.Column(db.Date(), unique=False, nullable=True)
    completed = db.Column(db.Boolean(), unique=False, nullable=True)
    priority = db.Column(db.Integer, unique=False, default=0, nullable=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
    #     nullable=False)
    # dueDate = db.Column(db.Date(), unique=False, nullable=True)
    # created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    # date = db.Column(db.Date(), unique=False, nullable=True)
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
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
    #     nullable=False)

    def __repr__(self):
        return f'<Notes {self.notes}>'

    def serialize(self):
        return {
            "id": self.id,
            "notes": self.notes
            # do not serialize the password, its a security breach
        }