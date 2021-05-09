"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task, Notes, Folder
from api.utils import generate_sitemap, APIException, get_all_tasks
from datetime import datetime, timedelta
from sqlalchemy import or_
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os

api = Blueprint('api', __name__)

@api.route('/user', methods=['GET'])
# @jwt_required()
def handle_user():
    if request.method == 'GET':
        all_users = User.query.all()
        all_users = list(map(lambda t: t.serialize(), all_users))
        return jsonify(all_users), 200
    return "invalid request method", 404

@api.route('/time_zones', methods=['GET'])
# @jwt_required()
def handle_timezones():
    json_path = os.path.dirname(__file__) + "/time_zones.json"
    with open(json_path) as f:
        s = f.read()
        return s, 200


@api.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity() 
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200


@api.route('/user', methods=['POST'])
def post_user():
    body = request.get_json()
    new_user = User.query.filter_by(email=body['email']).first()
    if new_user is not None:
        raise APIException('this user is already registered', status_code = 404)
    new_user = User(first_name = body['firstName'],
                    last_name = body['lastName'],
                    time_zone = body['time_zone'],
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

    usercheck = User.query.filter_by(email=email, password=password).first()
    if usercheck == None:
        return jsonify({"msg": "Invalid Email or Password"}), 401

    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=usercheck.id, expires_delta=False)
    return jsonify(access_token=access_token), 200



@api.route('/task', methods=['GET', 'POST'])
@jwt_required()
def handle_hello():
    user_id = get_jwt_identity()
    print(user_id)
    if request.method == 'GET':
        # if _from = todays_date get all matching dates and all None dates else just get all matching dates
        _from = request.args.get('from', None)
        _null = request.args.get('_null', None)
        print("_nullywully", _null)
        _from = datetime.strptime(_from, '%Y/%m/%d')
        _until = request.args.get('until', None)
        _until = datetime.strptime(_until, '%Y/%m/%d')
        all_tasks = get_all_tasks(user_id, _from, _until, _null == "true")
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 200
    if request.method == 'POST':
        body = request.get_json()
        print("BODDYYY***", body)
        new_task = Task(label= body['label'], date= body['date'], dashboard= body['dashboard'], folder= body['folder'], user_id= user_id)
        db.session.add(new_task)
        db.session.commit()
        _from = request.args.get('from', None)
        _null = request.args.get('_null', None)
        _from = datetime.strptime(_from, '%Y/%m/%d')
        _until = request.args.get('until', None)
        _until = datetime.strptime(_until, '%Y/%m/%d')
        if _until is not None:
            _until += timedelta(days=1)
        all_tasks = get_all_tasks(user_id, _from, _until, _null == "true")
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 201
    return "invalid request4r  method", 404

@api.route('/folder', methods=['POST'])
@jwt_required()
def post_folder():
    user_id = get_jwt_identity()
    body = request.get_json()
    print("MY BODY FLAG: ",body['folder'])
    new_folder = Folder(folder= body['folder'], collapse= body['collapse'], main_view= body['main_view'], user_id= user_id)
    db.session.add(new_folder)
    db.session.commit()
    all_folders = Folder.query.filter_by(user_id= user_id)
    all_folders = list(map(lambda t: t.serialize(), all_folders))
    return jsonify(all_folders), 201
    return "invalid request method", 404

@api.route('/folder/<int:folder_id>', methods=['DELETE'])
def delete_folder(folder_id):
    body = request.get_json() 
    current_folder = Folder.query.get(folder_id)
    db.session.delete(current_folder)
    db.session.commit()
    return "folder removed", 201

@api.route('/folder/<int:folder_id>', methods=['PUT'])
def change_folder(folder_id):
    body = request.get_json()
    current_folder = Folder.query.get(folder_id)
    current_folder.folder = body['folder']
    current_folder.collapse = body['collapse']
    current_folder.main_view = body['main_view']
    current_folder.id = body['id']
    db.session.commit()
    return jsonify(current_folder.serialize()), 200

@api.route('/task/<int:task_id>', methods=['PUT', 'GET', 'DELETE'])
def get_single_task(task_id):
    body = request.get_json() 
    current_task = Task.query.get(task_id)
    if request.method == 'PUT':
        current_task.label = body['label']
        current_task.dashboard = body['dashboard']
        current_task.date = body['date']
        current_task.folder = body['folder']
        current_task.id = body['id']
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