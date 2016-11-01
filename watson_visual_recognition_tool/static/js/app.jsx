var React = require('react');
var ReactDOM = require('react-dom');
var CreateClassifier = require('./createClassifier');
var Home = require('./home');
var SideBar = require('./sideBar');
var ApiKeyModal = require('./apiKeyModal')

var PageContent = React.createClass({
  render: function() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="container" style={{marginTop: '3%'}}>
                <div className="tab-content">
                  <div className="tab-pane active" id="home" role="tabpanel">
                    <Home apiKey={this.props.apiKey} 
                          handleShowModal={this.props.handleShowModal} />
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

var App = React.createClass({
  getInitialState: function(){
    return {
      modalView: { showModal: true },
      apiKey: "2d7f02e6708f3562a043ebf31159ff849d94d123"
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
