"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/task', methods=['GET'])
def handle_hello():
    all_tasks = Task.query.all()
    all_tasks = list(map(lambda t: t.serialize(), all_tasks))
    return jsonify(all_tasks), 200