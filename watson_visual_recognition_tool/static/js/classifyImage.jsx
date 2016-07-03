var React = require('react');
var Dropzone = require('react-dropzone');
var request = require('superagent')

var DropzoneButton = React.createClass({
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
    this.props.addFile(this.props.classes, 
                       this.props.rowId, 
                       files[files.length-1])
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
  render: function () {
    var buttonStyle = {
      marginRight: '2%'
    }

    return (
	  <div className="card-block">
	  	<DropzoneButton />
	    <a className="btn btn-primary btn-sm" 
	       style={buttonStyle}>
	      Classify Image</a>
	  </div>
    );
  }
});

module.exports = ClassifyImage