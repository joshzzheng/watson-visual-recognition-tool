import os
from dotenv import load_dotenv, find_dotenv
from pprint import pprint
from watson_developer_cloud import VisualRecognitionV3
import json
import requests
import tempfile

class WatsonVisualRecognition:

  end_point = "https://gateway-a.watsonplatform.net/visual-recognition/api"
  latest_version = '2016-05-20'
  
  def __init__(self, api_key, end_point=end_point, version=latest_version):
    self.api_key = api_key
    self.end_point = end_point
    self.version = version

  def list_classifiers(self):
    url = '/v3/classifiers'
    params = {'api_key': self.api_key, 'version': self.version}

    return requests.get(self.end_point + url, 
                        params=params).json()['classifiers']

  def get_classifier(self, classifier_id):
    url = '/v3/classifers'
    params = {'api_key': self.api_key, 'version': self.version}


  def create_classifier_from_file(self, classifier_name, class_names, pos_files, neg_file=None):
    url = '/v3/classifiers'
    params = {'api_key': self.api_key, 'version': self.version}

    files = {
      'name': (None, classifier_name),

    }

    if neg_file:
      files['negative_examples'] = (neg_file,
                            open(neg_file, 'rb').read(),
                            'application/zip')

    for i, tag in enumerate(class_names):
      files[tag + '_positive_examples'] = (tag+".zip",
                                        pos_files[i],
                                        'application/zip')

    return requests.post(self.end_point + url,
                         files=files,
                         params=params,
                        ).json()

  def create_classifier(self, classifier_name, pos_files, neg_file=None):
    url = '/v3/classifiers'
    params = {'api_key': self.api_key, 'version': self.version}

    files = {
      'name': (None, classifier_name)
    }

    for name, file in pos_files.iteritems():
      files[name + '_positive_examples'] = (name + ".zip",
                                        file,
                                        'application/zip')

    return requests.post(self.end_point + url,
                         files=files,
                         params=params,
                        ).json()

  def delete_classifier(self, classifier_id):
    url = '/v3/classifiers/' + classifier_id
    params = {'api_key': self.api_key, 'version': self.version}
    response = requests.delete(self.end_point + url,
                           params=params).json()
    return requests.delete(self.end_point + url,
                           params=params).json()

  def delete_all_classifiers(self):
    responses = []
    for classifier in self.list_classifiers():
      r = self.delete_classifier(classifier['classifier_id'])
      responses.append(r)

    return responses

  def classify_image(self, classifier_ids, image_file):
    url = '/v3/classify'
    params = {'api_key': self.api_key, 'version': self.version}

    if isinstance(classifier_ids, str):
      classifier_ids = [classifier_ids]
    else:
      if not isinstance(classifier_ids, list):
        raise TypeError("classifier_ids needs to be either string or list.")

    parameters = {
      'classifier_ids': classifier_ids,
      'threshold': 0
    }

    files = {
      'parameters': (None, json.dumps(parameters)),
      'images_file': (image_file,
                      open(image_file, 'rb').read(),
                      'image/jpg')
    }

    return requests.post(self.end_point + url,
                         files=files,
                         params=params).json()

def main():
  #load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
  load_dotenv(find_dotenv())
  api_key=os.environ.get("API_KEY")

  #visual_recognition = VisualRecognition(api_key)

  sdk_visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)
  my_vr = WatsonVisualRecognition(api_key)
  

  journal = open('bundles/moleskine/journaling.zip').read()
  land = open('bundles/moleskine/journaling.zip').read()
  neg = open('bundles/moleskine/negative.zip').read()

  pos_file_paths = ['bundles/moleskine/journaling.zip', 'bundles/moleskine/journaling.zip']
  neg_file_path = 'bundles/moleskine/negative.zip'
  pos_file_list = [journal, land]
  pos_files = {'journ': journal, 'land': land}
  pos_names = ['journal', 'land']

  files = {
    'negative_examples': neg,
    'journal_positive_examples': journal,
    'landscape_positive_examples': land
  }

  response = my_vr.create_classifier("mol_script_zipnew", files)
  #response = my_vr.create_classifier_from_file("mol_script_file1", pos_names, pos_file_list, neg_file_path)
  #import pdb; pdb.set_trace()


  '''  
  classes = sdk_visual_recognition.list_classifiers()
  pprint(classes)

  print
  for c in classes['classifiers']:
    info = sdk_visual_recognition.get_classifier(c['classifier_id'])
    pprint(info)
    print
  '''

  '''
  #Single Classifier
  pos_file = 'data/bundles/dogs/beagle.zip'
  neg_file = 'data/bundles/dogs/negatives.zip'
  #response = my_vr.create_classifier('beagle','beagle', pos_file, neg_file)

  #Multi Classifier
  tag_names = ['beagle', 'dalmation', 'golden_retriever','husky']
  pos_files = ['data/bundles/dogs/beagle.zip', 'data/bundles/dogs/dalmation.zip', 
               'data/bundles/dogs/goldenretriever.zip', 'data/bundles/dogs/husky.zip']
  #response = my_vr.create_classifier('dogs',tag_names, pos_files, neg_file)
  #print response

  pprint(my_vr.list_classifiers())
  print('')
  pprint(my_vr.classify_image(['dogs_2117373684','beagle_81816899'], 'data/bundles/dogs/test/5.jpg'))
  #pprint(my_vr.classify_image('default', 'bundles/dogs/test/0.jpg'))

  #response = my_vr.delete_classifier('beagle_classifier_1962805094')
  '''

if __name__ == "__main__":
    main()