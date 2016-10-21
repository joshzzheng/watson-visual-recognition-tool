var React = require('react');
var ReactDOM = require('react-dom');
var CreateClassifier = require('./createClassifier');
var Home = require('./home');

var SideBar = React.createClass({
  render: function() {
    return (
      <div id="sidebar-wrapper">
        <ul className="nav nav-pills nav-stacked sidebar-nav" 
            role="tablist">
          <li className="nav-item sidebar-brand">
            <a href="#">
                Watson VR Tool
            </a>
          </li>
          <li className="nav-item">
              <a className="nav-link active" 
                 data-toggle="tab" 
                 role="tab" 
                 href="#home">
                Home
              </a>
          </li>
          <li className="nav-item">
              <a className="nav-link" 
                 data-toggle="tab" 
                 role="tab" 
                 href="#create">
                Create Classifier
              </a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#classify">Classify Image</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#similarity">Similarity Search</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#">Collections</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="#">Cloudant</a>
          </li>
        </ul>
      </div>
    );
  }
});

var PageContent = React.createClass({
  render: function() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="container" 
                   style={{marginTop: '3%'}}>
                <div className="tab-content">
                  <div className="tab-pane active" id="home" role="tabpanel">
                    <Home apiKey={this.props.apiKey} handleShowModal={this.props.handleShowModal} />
                  </div>
                  <div className="tab-pane" id="create" role="tabpanel">
                    <CreateClassifier url="/api/classifiers" />
                  </div>
                  <div className="tab-pane" id="classify" role="tabpanel">3</div>
                  <div className="tab-pane" id="similarity" role="tabpanel">4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ApiKeyModal = React.createClass({
  componentDidMount: function(){
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },

  saveApiKey: function(){
    var key = ReactDOM.findDOMNode(this.refs.apiKey).value
    this.props.setApiKey(key);
  },

  render: function(){
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" 
                      className="close" 
                      data-dismiss="modal" 
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Please Enter Your Watson VR API Key:</h4>
            </div>
            <div className="modal-body">
              <p>This app will not function without an Watson VR API key.</p>
              <form id="api-key-form" role="form" action="#">
                <div className="form-group">
                  <input 
                    ref="apiKey"
                    className="form-control" 
                    type="text"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" 
                      className="btn btn-default" 
                      data-dismiss="modal">
                Close
              </button>
              <button type="button" 
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.saveApiKey}>
                Save key
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  propTypes:{
    handleHideModal: React.PropTypes.func.isRequired
  }
});

var App = React.createClass({
  getInitialState: function(){
    return {
      modalView: { showModal: true },
      apiKey: null
    }
  },
  handleHideModal: function(){
    this.setState({
      modalView: { showModal: false }
    })
  },
  handleShowModal: function(){
    this.setState({
      modalView: { showModal: true }
    })
  },
  setApiKey: function(key) {
    this.setState({
      apiKey: key
    })
  },
  render: function(){
    return(
      <div>
        {
          this.state.modalView.showModal ? 
            <ApiKeyModal 
              handleHideModal={this.handleHideModal}
              setApiKey={this.setApiKey}
            /> 
            : null
        }
        <SideBar />
        <PageContent 
          apiKey={this.state.apiKey}
          handleShowModal={this.handleShowModal}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <App />, 
  document.getElementById("wrapper")
);
