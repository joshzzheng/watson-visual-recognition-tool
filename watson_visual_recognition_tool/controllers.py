import os
from tempfile import TemporaryFile

from flask import Flask, request, Response, g
from flask import render_template, url_for, send_from_directory
from flask import make_response, abort, jsonify

from watson_developer_cloud import VisualRecognitionV3
from watson_visual_recognition import WatsonVisualRecognition

from watson_visual_recognition_tool import app

api_key = app.config['API_KEY']
sdk_visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)
my_visual_recognition = WatsonVisualRecognition(api_key)

@app.route('/')
def index(**kwargs):
  return make_response(open('watson_visual_recognition_tool/templates/index.html').read())

@app.route('/api/classifiers', methods=['GET'])
def get_custom_classifiers():
  classifiers = sdk_visual_recognition.list_classifiers()['classifiers']
  response = jsonify(classifiers)
  return response, response.status_code

@app.route('/api/classifier/<id>', methods=['GET'])
def get_custom_classifier_detail(id):
  classifier = sdk_visual_recognition.get_classifier(id)
  response = jsonify(classifier)
  return response, response.status_code

@app.route('/api/classifiers', methods=['POST'])
def create_custom_classifier():
  classifier_name = request.form['classifier_name']
  files = {}

  for name, file in request.files.iteritems():
    tf = TemporaryFile()
    file.save(tf)
    tf.seek(0)

    if name == 'negative':
      files['negative_examples'] = tf
    else:
      files[name + '_positive_examples'] = tf

  new_classifier = my_visual_recognition.create_classifier(classifier_name, files)
  response = jsonify(new_classifier)
  
  return response, response.status_code

@app.route('/api/classifier/<id>', methods=['DELETE'])
def delete_custom_classifier(id):
  response = sdk_visual_recognition.delete_classifier(id)
  response = jsonify(response)
  return response, response.status_code

# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'),
         'img/favicon.ico')

@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404