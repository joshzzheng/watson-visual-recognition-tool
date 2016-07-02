import os
import tempfile

from flask import Flask, request, Response, g
from flask import render_template, url_for, send_from_directory
from flask import make_response, abort, jsonify

from watson_developer_cloud import VisualRecognitionV3

from watson_visual_recognition_tool import app

api_key = app.config['API_KEY']
visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)

def create_classifier(self, classifier_name, class_names, pos_files, neg_file):
  end_point = "https://gateway-a.watsonplatform.net/visual-recognition/api"
  latest_version = '2016-05-20'
  url = '/v3/classifiers'

  params = {'api_key': api_key, 'version': latest_version}

  if isinstance(class_names, str) and isinstance(pos_files, str):
    class_names = [class_names]
    pos_files = [pos_files]
  else:
    if isinstance(class_names, list) and isinstance(pos_files, list):
      if len(class_names) != len(pos_files):
        raise ValueError("Number of tags and number of pos example files do not match.")
      if len(class_names) != len(set(class_names)): #allow duplicates in example files
        raise ValueError("Duplicates not allowed in tag names") 
    else:
      raise TypeError("Tags and pos example files need to be both strings or lists.")

  files = {
    'name': (None, classifier_name),
    'negative_examples': (neg_file,
                          open(neg_file, 'rb').read(),
                          'application/zip')
  }

  for i, tag in enumerate(class_names):
    files[tag + '_positive_examples'] = (pos_files[i],
                                      open(pos_files[i], 'rb').read(),
                                      'application/zip')

  return requests.post(end_point + url,
                       files=files,
                       params=params,
                      ).json()

@app.route('/')
def index(**kwargs):
  return make_response(open('watson_visual_recognition_tool/templates/index.html').read())

@app.route('/api/classifiers', methods=['GET'])
def get_custom_classifiers():
  classifiers = visual_recognition.list_classifiers()['classifiers']
  response = jsonify(classifiers)
  return response, response.status_code

@app.route('/api/classifier/<id>', methods=['GET'])
def get_custom_classifier_detail(id):
  classifier = visual_recognition.get_classifier(id)
  response = jsonify(classifier)
  return response, response.status_code

@app.route('/api/classifiers', methods=['POST'])
def create_custom_classifier():
  classifier_name = request.form['classifier_name']
  files = {}

  for name, file in request.files.iteritems():
    f = open(tempfile.TemporaryFile,'rb')
    file.save(f)
    f.seek(0)

    with open(f) as of:
      if name == 'negative':
        files['negative_examples'] = of
      else:
        files[name + '_positive_examples'] = of

  #import pdb;pdb.set_trace()
  new_classifier = visual_recognition.create_classifier(classifier_name, **files)
  response = jsonify(new_classifier)
  
  return response, response.status_code

@app.route('/api/classifier/<id>', methods=['DELETE'])
def delete_custom_classifier(id):
  response = visual_recognition.delete_classifier(id)
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