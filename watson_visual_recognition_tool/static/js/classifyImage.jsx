var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent');
var $ = require("jquery");

var ResultList = React.createClass({
  render: function(){
    var resultList = this.props.results.map(function(result){
      return (
        <li className="list-group-item" key={result.class}>
          <b>{result.class} : {result.score} </b>
        </li>
      );
    })
    return (
      <div>
        <h5>Result:</h5>
        <ul className="list-group list-group-flush"> {resultList} </ul>
      </div>
    );
  }
});

var ImageDropzoneButton = React.createClass({
  getInitialState: function () {
    return {
      files: [],
      text: "Select Image"
    };
  },

  onDrop: function (files) {
    this.setState({
      files: files,
      text: files[files.length-1].name
    });
    var mostRecentFile = files[files.length-1];
    this.props.addImageFile(mostRecentFile.name, mostRecentFile)
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  render: function () {
    var dropzoneStyle = {
      border: "dotted",
      width: "100%",
      marginBottom: "10px"
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

var ClassifyImage = React.createClass({
  getInitialState: function () {
    return {
      imageURL: "",
      imageFileName: "",
      imageFile: null,
      results: []
    };
  },

  resetState: function(){
    this.setState({
      imageURL: "",
      imageFileName: "",
      imageFile: null      
    });
  },

  handleImageURLChange: function(e) {
    this.setState({ imageURL: e.target.value });
  },

  addImageFile: function(imageFileName, imageFile) {
    this.setState({ 
      imageFileName: imageFileName,
      imageFile: imageFile
    });
  },

  classifyImage: function(e) {
    e.preventDefault();
    var self = this;

    var req = request.post(this.props.url);

    if (this.state.imageFile){
      req.attach('file', this.state.imageFile);
    }

    req.field('classifier_id', this.props.classifierID);
    
    if (this.state.imageURL) {
      req.field('image_url', this.state.imageURL);
    }

    req.then(function(res, err){
      var newResults = $.extend([], self.state.classes);
      res.body.images[0].classifiers[0].classes.map(function(c){
        newResults.push(c);
      });
      newResults.sort(function(a, b) {
          return b.score - a.score;
      });
      self.setState({results: newResults});
      self.resetState();  
    });
    
  },

  render: function () {
    var buttonStyle = {
      marginRight: '2%',
      marginBottom: '5%'
    }

    return (
      <div className="card-block">
        <button className="btn btn-primary btn-sm" 
                style={buttonStyle}
                onClick={this.classifyImage}>
          Classify Image</button>
        <ImageDropzoneButton addImageFile={this.addImageFile} />
        <input type="text" 
               className="form-control"
               placeholder="Image URL"
               value={this.state.imageURL}
               onChange={this.handleImageURLChange} />
        <hr />
        <ResultList results={this.state.results} />
      </div>
    );
  }
});

module.exports = ClassifyImage