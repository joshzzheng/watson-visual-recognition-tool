var React = require('react');
var moment = require("moment");
var $ = require("jquery");
var request = require('superagent');
var ClassifyImage = require('./classifyImage')

var ClassList = React.createClass({
  render: function(){
    var classList = this.props.classes.map(function(name){
      return (
        <li className="list-group-item" key={name.class}>
          {name.class}
        </li>
      );
    })
    return (
      <ul className="list-group list-group-flush" style={{marginRight:'2em'}}> {classList} </ul>
    );
  }
});

var CustomClassifierDetails = React.createClass({
  loadClassifierFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      data: {apiKey: this.state.apiKey},

      success: function(data) {
        this.setState({classifier: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  getInitialState: function() {
    return {
      classifier: {
        classes: []
      },
      apiKey: this.props.apiKey,
      showClassifyImage: false,
      classifyButtonText: "Show Classify Image"
    };
  },

  componentDidMount: function() {
    this.loadClassifierFromServer();
    setInterval(this.loadClassifierFromServer, this.props.pollInterval);
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.apiKey !== null){
      this.setState({apiKey: nextProps.apiKey}, function(){
        this.loadClassifierFromServer();
        setInterval(this.loadClassifierFromServer, this.props.pollInterval);
      });
    }
  },

  toggleClassifyImage: function(){
    if (this.state.showClassifyImage == true) {
      this.setState({
        showClassifyImage: false, 
        classifyButtonText: "Show Classify Image"
      })
    } else {
      this.setState({
        showClassifyImage: true,
        classifyButtonText: "Hide Classify Image"
      });
    }
  },

  deleteClassifier: function(){
    var req = request.delete(this.props.url);
    var self = this;
    req.then(function(res, err){
      self.loadClassifierFromServer()
    });
  },

  render: function() {

    var date = moment(this.state.classifier.created)
                .format("MMMM Do YYYY, h:mm a")

    return(
      <div className="col-sm-2">
        <div className="card" style={{maxWidth:'20rem'}}>
          <div className="card-block">
            <h4 className="card-title">{this.props.name}</h4>
            <p className="card-text">
              <b>ID:</b> {this.props.classifierID} <br/>
              <b>Status:</b> {this.props.status} <br/>
              <b>Created:</b> {date} <br/>
              <b>Owner:</b> {this.state.classifier.owner}
            </p>          
          </div>
          
          <ClassList classes={this.state.classifier.classes} />
          <div className="card-block">          
            <button className="btn btn-sm btn-block"
              onClick={this.deleteClassifier}>
              Delete</button>
          </div>

          <div className="card-block">
            <button 
              className="btn btn-sm btn-block"
              onClick={this.toggleClassifyImage}>
                {this.state.classifyButtonText}</button>
                {this.state.showClassifyImage ? 
                    <ClassifyImage url={'/api/classify'} 
                                   classifierID={this.props.classifierID}
                                   apiKey={this.state.apiKey}/> 
                    : null}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CustomClassifierDetails;