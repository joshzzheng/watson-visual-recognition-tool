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
      <div><h2>Watson Vision Tool</h2>
      <hr />
        <CustomClassifierTools />
      </div>
    );
  }
});

var SideBarWrapper = React.createClass({
  render: function() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <a href="#">
                Watson VR Tool
            </a>
          </li>
          <li>
              <a href="#">Create Classifier</a>
          </li>
          <li>
              <a href="#">Classify Image</a>
          </li>
          <li>
              <a href="#">Similarity Search</a>
          </li>
          <li>
              <a href="#">Collections</a>
          </li>
          <li>
              <a href="#">Cloudant</a>
          </li>
        </ul>
      </div>
    );
  }
});

var PageContentWrapper = React.createClass({
  render: function() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div id="main" className="container" style={{marginTop: '3%'}}>
                <div id="custom-classifiers">
                  <VisualClassifierBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  render: function(){
    return(
      <div>
        <SideBarWrapper />
        <PageContentWrapper />
      </div>
    );
  }
});

ReactDOM.render(
  <App />, 
  document.getElementById("wrapper")
);
