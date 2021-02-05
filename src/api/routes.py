"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/task', methods=['GET', 'POST'])
def handle_hello():
    if request.method == 'GET':
        all_tasks = Task.query.all()
        all_tasks = list(map(lambda t: t.serialize(), all_tasks))
        return jsonify(all_tasks), 200
    if request.method == 'POST':
        body = request.get_json()
        new_task = Task(label= body['label'], date= body['date'], completed= body['completed'])
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.serialize()), 201
    return "invalid request method", 404
