var React = require('react');
var moment = require("moment");
var $ = require("jquery");
var ClassifyImage = require("./classifyImage")

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
      <ul className="list-group list-group-flush"> {classList} </ul>
    );
  }
});

var CustomClassifier = React.createClass({
  loadClassifierFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,

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
    }};
  },

  componentDidMount: function() {
    this.loadClassifierFromServer();
    setInterval(this.loadClassifierFromServer, this.props.pollInterval);
  },

  deleteClassifier: function(){
    var req = request.delete(this.props.url);
    var self = this;
    req.then(function(res, err){
      self.loadClassifierFromServer()
    });
  },

  render: function() {
    var cardStyle = {
      maxWidth: '20rem',
    };
    var buttonStyle = {
      marginRight: '2%'
    }
    var imageStyle = {
      width: '100%',
      height: 'auto'
    }

    var date = moment(this.state.classifier.created)
                .format("MMMM Do YYYY, h:mm a")

    return(
      <div className="col-sm-6">
        <div className="card" style={cardStyle}>
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
          <ClassifyImage url={'/api/classify'} 
                         classifierID={this.props.classifierID}/>
          <div className="card-block">
            <a href="#" 
               className="btn btn-danger btn-sm"
               onClick={this.deleteClassifier}>
              Delete</a>
          </div>
        </div>
      </div>
    );
  }
});

var CustomClassifiersList = React.createClass({
  loadClassifiersFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({classifiers: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  getInitialState: function() {
    return {classifiers: []};
  },

  componentDidMount: function() {
    this.loadClassifiersFromServer();
  },

  render: function() {
    var classifiers = [];
    var divStyle = {
      maxWidth: '30%',
    };
    this.state.classifiers.forEach(function(classifier){
      classifiers.push(<CustomClassifier
         url = {'/api/classifier/' + classifier.classifier_id}
         pollInterval={200000}
         classifierID={classifier.classifier_id}
         name={classifier.name}
         status={classifier.status}
         key={classifier.classifier_id} />);
    });
    return (
      <div>
        <div className='row'>{classifiers}</div>
      </div>
    );
  }
});

module.exports = CustomClassifiersList;