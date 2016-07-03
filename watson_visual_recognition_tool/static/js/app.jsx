var React = require('react');
var ReactDOM = require('react-dom');
var CreateClassifier = require('./createClassifier');
var CustomClassifierList = require('./customClassifierList')

var CustomClassifierTools = React.createClass({
  render: function() {
    return (
      <div>
        <CreateClassifier url="/api/classifiers" />
        <hr />
        <h4>Your Classifiers</h4>
        <hr />
        <CustomClassifierList url="/api/classifiers" />
      </div>
    );
  }
});

var VisualClassifierBox = React.createClass({
  render: function() {
    return (
      <div><h1>Watson Custom Visual Recognition</h1>
      <hr />
        <CustomClassifierTools />
      </div>
    );
  }
});

ReactDOM.render(
  <VisualClassifierBox />, 
  document.getElementById("custom-classifiers")
);


/*
var MyReactBootstrapButton = React.createClass({
render: function() {

  var ButtonGroup = ReactBootstrap.ButtonGroup,
    Button  = ReactBootstrap.Button;

  return (<div>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>);
}});
ReactDOM.render(<MyReactBootstrapButton />, 
  document.getElementById("custom-classes"));
*/

/*
var CLASSIFIERS = {
  classifiers: [
    { classifier_id: 'beagle_874258552', 
      name: 'beagle', status: 'ready' },
    { classifier_id: 'dogs_2117373684', 
      name: 'dogs', status: 'ready' },
    { classifier_id: 'goldenretriever_81816899', 
      name: 'golden retriver', status: 'ready' },
    { classifier_id: 'pug_81816899', 
      name: 'pug', status: 'ready' },
    { classifier_id: 'great_dane_816899', 
      name: 'great dane', status: 'ready' },
    { classifier_id: 'german_shepard_16899', 
      name: 'german shephard', status: 'ready' }
  ]
}

var DOG_CLASSISIFER = {
  classes: 
    [
      { class: 'husky' }, 
      { class: 'golden_retriever' },
      { class: 'dalmation' },
      { class: 'beagle' }
    ],
  classifier_id: 'dogs_2117373684',
  created: '2016-06-04T01:21:54.494Z',
  name: 'dogs',
  owner: '6a3b01d0-899c-4e66-982e-ddeb1e93dad3',
  status: 'ready'
}*/