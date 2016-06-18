var ClassList = React.createClass({
  render: function(){
    var classList = this.props.classes.map(function(name){
      return <li className="list-group-item" key={name.class}>{name.class}</li>;
    })
    return <ul className="list-group list-group-flush"> {classList} </ul>
  }
});

var CustomClassifier = React.createClass({
  render: function() {
    var classDetail = DOG_CLASSISIFER;
    var cardStyle = {
      maxWidth: '20rem',
    };

    return(
      <div className="card" style={cardStyle}>
        <img className="card-img-top" data-src={"holder.js/348x180"} alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{this.props.name}</h4>
          <p className="card-text">
            <b>ID:</b> {this.props.classifierID} <br/>
            <b>Status:</b> {this.props.status} <br/>
            <b>Created:</b> {classDetail.created} <br/>
            <b>Owner:</b> {classDetail.owner}
          </p>          
        </div>
        <ClassList classes={classDetail.classes} />
        <div className="card-block">
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>

    );
  }
});

var CustomClassifiersList = React.createClass({
  render: function() {
    var classifiers = [];
    var divStyle = {
      maxWidth: '30%',
    };

    this.props.classifiers.classifiers.forEach(function(classifier){
      classifiers.push(<CustomClassifier 
         classifierID={classifier.classifier_id}
         name={classifier.name}
         status={classifier.status}
         key={classifier.classifier_id} />);
    });
    return (
      <div>
        <div className='card-deck'>{classifiers}</div>
      </div>
    );
  }
});

var CLASSIFIERS = {
  classifiers: [
      { classifier_id: 'beagle_874258552', name: 'beagle', status: 'ready' },
      { classifier_id: 'dogs_2117373684', name: 'dogs', status: 'ready' },
      { classifier_id: 'goldenretriever_81816899', name: 'golden retriver', status: 'ready' }
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
}

ReactDOM.render(
  <CustomClassifiersList classifiers={CLASSIFIERS} />, 
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
ReactDOM.render(<MyReactBootstrapButton />, document.getElementById("custom-classes"));
*/