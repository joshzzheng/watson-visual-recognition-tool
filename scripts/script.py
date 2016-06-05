import os
from app.visual_recognition import VisualRecognition
from dotenv import load_dotenv
from pprint import pprint

def main():
  load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
  api_key=os.environ.get("API_KEY")

  vr = VisualRecognition(api_key)
  
  #Single Classifier
  pos_file = 'data/bundles/dogs/beagle.zip'
  neg_file = 'data/bundles/dogs/negatives.zip'
  #response = vr.create_classifier('beagle','beagle', pos_file, neg_file)

  #Multi Classifier
  tag_names = ['beagle', 'dalmation', 'golden_retriever','husky']
  pos_files = ['data/bundles/dogs/beagle.zip', 'data/bundles/dogs/dalmation.zip', 
               'data/bundles/dogs/goldenretriever.zip', 'data/bundles/dogs/husky.zip']
  #response = vr.create_classifier('dogs',tag_names, pos_files, neg_file)
  #print response

  pprint(vr.list_classifiers())
  print('')
  pprint(vr.classify_image(['dogs_2117373684','beagle_81816899'], 'data/bundles/dogs/test/5.jpg'))
  #pprint(vr.classify_image('default', 'bundles/dogs/test/0.jpg'))

  #response = vr.delete_classifier('beagle_classifier_1962805094')
if __name__ == "__main__":
    main()