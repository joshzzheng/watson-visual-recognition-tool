var React = require('react');
var ReactDOM = require('react-dom');
var CustomClassifierList = require('./customClassifierList')

var Home = React.createClass({
  render: function() {
    console.log("RENDERING HOME")
    return (
      <div>
        <h2>Watson Visual Recognition Tool</h2>
        <div class="divider"></div>
        
        <h4>
          API Key: {this.props.apiKey || "Unknown"} &nbsp;&nbsp;
          <button className="btn btn-default"
                  onClick={this.props.handleShowModal}>
            Update Key
          </button>
        </h4>

        <div class="divider"></div>
        
        <CustomClassifierList 
          url="/api/classifiers" 
          apiKey={this.props.apiKey}
        />
        
      </div>
    );
  }
});

module.exports = Home