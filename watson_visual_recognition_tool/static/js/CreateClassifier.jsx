import React from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import $ from "jquery"

var DropzoneButton = React.createClass({
  getInitialState: function () {
    return {
      files: [],
      text: "Drag File Here or Click To Select"
    };
  },

  onDrop: function (files) {
    this.setState({
      files: files,
      text: files[files.length-1].name
    });
    this.props.addFile(this.props.classes, 
                       this.props.rowId, 
                       files[files.length-1])
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  render: function () {
    var dropzoneStyle = {
      border: "dotted"
    };

    return (
      <Dropzone ref="dropzone" 
                onDrop={this.onDrop} 
                multiple={false}
                className="btn btn-secondary"
                style={dropzoneStyle}> 
        {this.state.text}
      </Dropzone>
    );
  }
});

var ClassRow = React.createClass({
  getInitialState: function() {
    return {};
  },

  handleRowClassNameChange: function(e) {
    this.props.handleClassNameChange(e, this.props.classes, this.props.rowId)
  },
  
  render: function() {
    return (
      <div className="form-group">
        <label className="col-sm-2 form-label">
          {this.props.classes[this.props.rowId].label}
        </label>
        <div className="col-sm-4">
          <input type="text" 
                 className="form-input"
                 value={this.props.classes[this.props.rowId].name}
                 onChange={this.handleRowClassNameChange}
                 disabled={this.props.classes[this.props.rowId].disabled} />
        </div>
        <DropzoneButton rowId={this.props.rowId}
                        classes={this.props.classes}
                        addFile={this.props.addFile} />
      </div>
    )
  }
})

var CreateClassifier = React.createClass({
  getInitialState: function() {
    return {
      classifierName: "",
      classes: [
        {label: "Negatives", name: "negative", file: null, disabled: true},
        {label: "Class 1", name: "", file: null, disabled: false}
      ]
    };
  },

  resetState: function() {
    this.setState({
      classifierName: "",
      classes: [
        {label: "Negatives", name: "negative", file: null, disabled: true},
        {label: "Class 1", name: "", file: null, disabled: false}
      ]
    });
  },

  handleClassifierNameChange: function(e){
    this.setState({ classifierName: e.target.value });
  },

  handleClassNameChange: function(e, classes, rowId) {
    var newClasses = $.extend([], classes);
    newClasses[rowId].name = e.target.value;
    this.setState({ classes: newClasses });
  },

  addFile: function(classes, rowId, file) {
    var newClasses = $.extend([], classes);
    newClasses[rowId].file = file;
    this.setState({ classes: newClasses });
  },

  addNewClass: function(e) {
    e.preventDefault();
    var newClasses = $.extend([], this.state.classes);
    newClasses.push({
      label: "Class " + this.state.classes.length.toString(),
      name: "",
      file: null,
      disabled: false
    });
    this.setState({classes: newClasses});
  },

  submitClassifier: function(e) {
    e.preventDefault();
    var self = this;
    var req = request.post(this.props.route.url);
    console.log("URL: " + this.props.route.url)
    this.state.classes.map(function(c){
      req.attach(c.name, c.file);
    });

    req.field('classifier_name', this.state.classifierName);
    req.then(function(res, err){
      self.resetState();
    });
  },

  render() {
    var fileUploadStyle = {
      display: 'none'
    }

    var self = this;
    var classRowList = this.state.classes.map(function(r, i){
      return (
        <ClassRow classes={self.state.classes} 
                  addFile={self.addFile}
                  handleClassNameChange={self.handleClassNameChange}
                  rowId={i}
                  key={i} />
      )
    });

    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                <h2>Create New Classifer</h2>
                <hr />
                <form className="form-horizontal" onSubmit={this.submitClassifier}>
                  <div className="form-group">
                    <label className="col-sm-2 form-label">
                      Classifer Name
                    </label>
                    <div className="col-sm-5">
                      <input type="text" 
                             className="form-input" 
                             value={this.state.classifierName || ""}
                             onChange={this.handleClassifierNameChange} />
                    </div>
                  </div>
                  
                  {classRowList}
                  
                  <div className="row" style={{marginBottom: '2%'}}>
                    <button className="btn"
                            onClick={this.addNewClass}>
                      Add Class
                    </button>
                  </div>

                  <div className="row">
                    <input className="btn btn-primary" 
                           type="submit" 
                           value="Create Classifer" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CreateClassifier;
