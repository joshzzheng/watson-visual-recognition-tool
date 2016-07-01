var React = require('react');
var ReactDOM = require('react-dom');
var $ = require("jquery");
var moment = require("moment");
var Dropzone = require('react-dropzone');
var request = require('superagent')

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
    return {classifier: {
      classes: []
    }};
  },

  componentDidMount: function() {
    this.loadClassifierFromServer();
    setInterval(this.loadClassifierFromServer, this.props.pollInterval);
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
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="card" style={cardStyle}>
          <img className="card-img-top" 
               src='static/img/watson.jpg' 
               alt="Card image cap" 
               style={imageStyle} />
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
            <a href="#" className="btn btn-primary btn-sm" style={buttonStyle}>
              Classify Image</a>
            <a href="#" className="btn btn-danger btn-sm">Delete</a>
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
    return {
    };
  },

  handleRowClassNameChange: function(e) {
    this.props.handleClassNameChange(e, this.props.classes, this.props.rowId)
  },
  
  render: function() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 form-control-label">
          {this.props.classes[this.props.rowId].label}
        </label>
        <div className="col-sm-4">
          <input type="text" 
                 className="form-control"
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

  handleClassifierNameChange: function(e){
    this.setState({ classifierName: e.target.value })
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
    console.log(this.state);
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
    

    var req = request.post(this.props.url);
    req.send({classifier_name: this.state.classifierName})
    this.state.classes.map(function(c){
      req.attach(c.name, c.file);
    });
    console.log(req);
    req.end(function(err, res){
      console.log(res);
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
      <form onSubmit={this.submitClassifier}>
        <div className="form-group row">
          <label className="col-sm-2 form-control-label">
            Classifer Name
          </label>
          <div className="col-sm-5">
            <input type="text" 
                   className="form-control" 
                   value={this.state.classifierName || ""}
                   onChange={this.handleClassifierNameChange} />
          </div>
        </div>
        
        {classRowList}
        <button className="btn btn-primary"
                onClick={this.addNewClass}>
          Add Class
        </button>
        
        <div className="form-group row">
          <div className="col-sm-offset-2 col-sm-5">
            <input className="btn btn-success" 
                   type="submit" 
                   value="Create Classifer" />
          </div>
        </div>
      </form>

    );
  }
})

var ClassifierTools = React.createClass({
  render: function() {
    return (
      <div>
        <CreateClassifier url="api/classifiers" />
        <hr />
        <h4>Your Classifiers</h4>
        <hr />
        <CustomClassifiersList url="/api/classifiers" />
      </div>
    );
  }
});

var ClassifierBox = React.createClass({
  render: function() {
    return (
      <div><h1>Watson Custom Visual Recognition</h1>
      <hr />
        <ClassifierTools />
      </div>
    );
  }
});

ReactDOM.render(
  <ClassifierBox />, 
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