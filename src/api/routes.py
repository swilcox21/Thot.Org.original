"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task, Notes
from api.utils import generate_sitemap, APIException
from datetime import datetime, timedelta
from sqlalchemy import or_
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/user', methods=['GET'])
# @jwt_required()
def handle_user():
    if request.method == 'GET':
        all_users = User.query.all()
        all_users = list(map(lambda t: t.serialize(), all_users))
        return jsonify(all_users), 200
    return "invalid request method", 404

@api.route('/user', methods=['POST'])
def post_user():
    body = request.get_json()
    new_user = User.query.filter_by(email=body['email']).first()
    if new_user is not None:
        raise APIException('this user is already registered', status_code = 404)
    new_user = User(first_name = body['firstName'],
                    last_name = body['lastName'],
                    email = body['email'],
                    password = body['password'])
    db.session.add(new_user)
    db.session.commit()
    user = User.query.filter_by(email=body['email']).first()
    print('UNSERIALIZED', user)
    # user = list(map(lambda x: x.serialize(), user))
    print('SERIALIZED', user)
    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    usercheck = User.query.filter_by(email=email).first()
    if usercheck == None:
        return jsonify({"msg": "Bad Email"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=usercheck.id, expires_delta=False)
    return jsonify(access_token=access_token), 200

def get_all_tasks(_from, _until): 
    all_tasks = Task.query
    if _from is not None : 
        all_tasks = all_tasks.filter(or_(Task.date >= _from, Task.date == None))
    if _until is not None : 
        all_tasks = all_tasks.filter(or_(Task.date <= _until, Task.date == None))
    all_tasks = all_tasks.all()
    return all_tasks

@api.route('/task', methods=['GET', 'POST'])
@jwt_required()
def handle_hello():
    user_id = get_jwt_identity()
    print(user_id)
    if request.method == 'GET':
        _from = request.args.get('from', None)
        _from = datetime.strptime(_from, '%Y/%m/%d')
        _until = request.args.get('until', None)
        _until = datetime.strptime(_until, '%Y/%m/%d')
        all_tasks = get_all_tasks(_from, _until)
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 200
    if request.method == 'POST':
        body = request.get_json()
        print("BODDYYY***", body)
        new_task = Task(label= body['label'], date= body['date'], dashboard= body['dashboard'], priority= body['priority'], user_id= user_id)
        db.session.add(new_task)
        db.session.commit()
        _from = new_task.date
        _until = new_task.date + timedelta(days=1)
        all_tasks = get_all_tasks(_from, _until)
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 201
    return "invalid request method", 404

@api.route('/task/<int:task_id>', methods=['PUT', 'GET', 'DELETE'])
def get_single_task(task_id):
    body = request.get_json() 
    current_task = Task.query.get(task_id)
    if request.method == 'PUT':
        current_task.label = body['label']
        current_task.dashboard = body['dashboard']
        current_task.date = body['date']
        current_task.priority = body['priority']
        db.session.commit()
        return jsonify(current_task.serialize()), 200
    if request.method == 'GET':
        return jsonify(current_task.serialize()), 200
    if request.method == 'DELETE':
        db.session.delete(current_task)
        db.session.commit()
        return "task removed", 201

    return "Invalid Method", 404

@api.route('/notes', methods=['GET'])
def handle_notes():
    if request.method == 'GET':
        all_notes = Notes.query.all()
        all_notes = list(map(lambda t: t.serialize(), all_notes))
        return jsonify(all_notes), 200
    return "invalid request method", 404

@api.route('/notes/<int:notes_id>', methods=['PUT', 'GET'])
def get_notes(notes_id):
    try:
        body = request.get_json() 
        current_notes = Notes.query.get(notes_id)
        print("$@#$currentnotes:", current_notes)
        if current_notes is None:
            current_notes = Notes()
            print("creating new notes")
            db.session.add(current_notes)
            db.session.commit()
        if request.method == 'PUT':
            current_notes.notes = body['notes']
        db.session.commit()
            # below creates a pretty error
        return jsonify(current_notes.serialize()), 200
    except Exception as error:
        return jsonify({"message" : str(error) })