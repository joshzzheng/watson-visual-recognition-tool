import os

from flask import Flask, request, Response, g
from flask import render_template, url_for, send_from_directory
from flask import make_response, abort, jsonify

from watson_developer_cloud import VisualRecognitionV3

from watson_visual_recognition_tool import app

api_key = app.config['API_KEY']
visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)

@app.route('/')
def index(**kwargs):
  return make_response(open('watson_visual_recognition_tool/templates/index.html').read())

@app.route('/api/classifiers', methods=['GET'])
def get_custom_classifiers():
  classifiers = visual_recognition.list_classifiers()['classifiers']
  return jsonify(classifiers), 200

@app.route('/api/classifier/<id>', methods=['GET'])
def get_custom_classifier_detail(id):
  classifier = visual_recognition.get_classifier(id)
  return jsonify(classifier), 200

@app.route('/api/classifiers', methods=['POST'])
def create_custom_classifier():
  
  for name, file in request.files.iteritems():
  	print name, file
  
  return jsonify(request.json), 200

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'),
         'img/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404