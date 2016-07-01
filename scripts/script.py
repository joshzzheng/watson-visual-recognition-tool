import os
#from watson_visual_recognition_tool.watson_visual_recognition import VisualRecognition
from dotenv import load_dotenv, find_dotenv
from pprint import pprint
from watson_developer_cloud import VisualRecognitionV3

def main():
  #load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
  load_dotenv(find_dotenv())
  api_key=os.environ.get("API_KEY")

  #visual_recognition = VisualRecognition(api_key)

  visual_recognition = VisualRecognitionV3('2016-05-20', api_key=api_key)
  classes = visual_recognition.list_classifiers()
  pprint(classes)

  print
  for c in classes['classifiers']:
    info = visual_recognition.get_classifier(c['classifier_id'])
    pprint(info)
    print
    
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