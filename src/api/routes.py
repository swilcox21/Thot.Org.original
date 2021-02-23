"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task, Notes
from api.utils import generate_sitemap, APIException
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/task', methods=['GET', 'POST'])
def handle_hello():
    if request.method == 'GET':
        all_tasks = Task.query
        _from = request.args.get('from', None)
        _until = request.args.get('until', None)
        if _from is not None : 
            date_time_obj = datetime.strptime(_from, '%Y/%m/%d')
            all_tasks = all_tasks.filter(Task.date >= _from)
        if _until is not None : 
            date_time_obj = datetime.strptime(_until, '%Y/%m/%d')
            all_tasks = all_tasks.filter(Task.date <= _until)
        all_tasks = all_tasks.all()
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 200
    if request.method == 'POST':
        body = request.get_json()
        print("BODDYYY***", body)
        new_task = Task(label= body['label'], date= body['date'], completed= body['completed'], priority= body['priority'])
        db.session.add(new_task)
        db.session.commit()
        all_tasks = Task.query.all()
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 201
    return "invalid request method", 404

@api.route('/task/<int:task_id>', methods=['PUT', 'GET', 'DELETE'])
def get_single_task(task_id):
    body = request.get_json() 
    current_task = Task.query.get(task_id)
    if request.method == 'PUT':
        current_task.label = body['label']
        current_task.completed = body['completed']
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
        if request.method == 'PUT':
            current_notes.notes = body['notes']
            db.session.commit()
            # below creates a pretty error
            return jsonify(current_notes.serialize()), 200
        if request.method == 'GET':
            return jsonify(current_notes.serialize()), 200
        return "Invalid Method", 404
    except Exception as error:
        return jsonify({"message" : str(error) })