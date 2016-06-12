var CustomClassifier = React.createClass({
  render: function() {


    return(
      <div>
        <h3>Name: {this.props.name}</h3>
        <h4>Classifier ID: {this.props.classifierID}</h4>
        <h4>Status: {this.props.status}</h4>
      </div>
    );
  }
})

var CustomClassifiersList = React.createClass({
  render: function() {
    var classifiers = [];
    this.props.classifiers.classifiers.forEach(function(classifier){
      classifiers.push(<CustomClassifier 
         classifierID={classifier.classifier_id}
         name={classifier.name}
         status={classifier.status}
         key={classifier.classifier_id} />);
    });
    return (
      <div>
        <h2>Custom Classifiers</h2>
        <div>{classifiers}</div>
      </div>
    );
  }
});

var CLASSIFIERS = {
  classifiers: [
      { classifier_id: 'beagle_874258552', name: 'beagle', status: 'ready' },
      { classifier_id: 'dogs_2117373684', name: 'dogs', status: 'ready' },
      { classifier_id: 'beagle_81816899', name: 'beagle', status: 'ready' }
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