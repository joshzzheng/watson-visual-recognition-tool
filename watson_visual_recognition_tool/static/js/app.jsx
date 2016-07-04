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