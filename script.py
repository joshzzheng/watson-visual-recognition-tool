import os
import requests
import zipfile
import json
from pprint import pprint
from dotenv import load_dotenv


class VisualRecognition:

  end_point = "https://gateway-a.watsonplatform.net/visual-recognition/api"
  latest_version = '2016-05-20'
  
  def __init__(self, api_key, end_point=end_point, version=latest_version):
    self.api_key = api_key
    self.end_point = end_point
    self.version = version

  def list_classifiers(self):
    url = '/v3/classifiers'
    params = {'api_key': self.api_key, 'version':self.version}

    return requests.get(self.end_point + url, 
                        params=params).json()['classifiers']

  def create_classifier(self, classifier_name, tag_name, pos_file, neg_file):
    url = '/v3/classifiers'
    params = {'api_key': self.api_key, 'version': self.version}

    files = {
      'name': (None, classifier_name),
      tag_name + '_positive_examples': (pos_file,
                                          open(pos_file, 'rb').read(),
                                          'application/zip'),
      'negative_examples': (neg_file,
                            open(neg_file, 'rb').read(),
                            'application/zip')
    }

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

  def classify_image(self, classifier_id, image_file):
    url = '/v3/classify'
    params = {'api_key': self.api_key, 'version': self.version}

    parameters = {
      'classifier_ids':[classifier_id]
    }

    files = {
      'parameters': json.dumps(parameters),
      'images_file': (image_file,
                      open(image_file, 'rb').read(),
                      'image/jpg')
    }

    return requests.post(self.end_point + url,
                         files=files,
                         params=params).json()


def main():
  load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
  api_key=os.environ.get("API_KEY")

  vr = VisualRecognition(api_key)
  
  pos_file = 'bundles/dogs/beagle.zip'
  neg_file = 'bundles/dogs/negatives.zip'
  #response = vr.create_classifier('beagle','beagle', pos_file, neg_file)
  #response = vr.delete_classifier('beagle_classifier_1962805094')
  #print response

  print vr.list_classifiers()
  
  vr = VisualRecognition(api_key)
  pprint(vr.classify_image('default', 'bundles/dogs/test/0.jpg'))
  #pprint(vr.classify_image('default', 'bundles/dogs/test/0.jpg'))
if __name__ == "__main__":
    main()


