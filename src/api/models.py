from flask_sqlalchemy import SQLAlchemy
import datetime
db = SQLAlchemy()

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    time_zone = db.Column(db.String(120), unique=False, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    side_bar = db.Column(db.Boolean(), unique=False, nullable=True)
    tasks = db.relationship('Task', backref='user', lazy=True)
    folders = db.relationship('Folder', backref='user', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "time_zone": self.time_zone,
            "email": self.email,
            "side_bar": self.side_bar,
            "folders": list(map(lambda x : x.serialize(), self.folders))

            # do not serialize the password, its a security breach
        }


class Task(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(1200000), unique=False, nullable=False)
    date = db.Column(db.DateTime(timezone=True), unique=False, nullable=True)
    dashboard = db.Column(db.Boolean(), unique=False, nullable=True)
    folder = db.Column(db.String(1000), unique=False, default=0, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)

    def __repr__(self):
        return f'<Task {self.label}>'

    def serialize(self):
        print("flag:",self.date)
        return {
            "id": self.id,
            "label": self.label,
            "date": self.date,
            "dashboard": self.dashboard,
            "folder": self.folder
            # do not serialize the password, its a security breach
        }

class Folder(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    folder = db.Column(db.String(1000), unique=False, nullable=True)
    collapse = db.Column(db.Boolean(), unique=False, nullable=True)
    main_view = db.Column(db.Boolean(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
    nullable=False)

    def __repr__(self):
        return f'<Folder {self.folder}>'

    def serialize(self):
        print("flag:",self.folder)
        return {
            "id": self.id,
            "folder": self.folder,
            "collapse": self.collapse,
            "main_view": self.main_view,
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