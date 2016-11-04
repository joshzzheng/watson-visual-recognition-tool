import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import ApiKeyModal from './apiKeyModal'
import Content from './content'
import Home from './home'
import CreateClassifier from './createClassifier'

var App = React.createClass({
  getInitialState: function(){
    return {
      apiKey: "2d7f02e6708f3562a043ebf31159ff849d94d123",
      showModal: true
    }
  },

  handleHideModal: function(){
    this.setState({
      showModal: false
    });
    console.log("HIDE MODAL: " + this.state.showModal);
  },

  handleShowModal: function(){
    console.log("SHOW MODAL: " + this.state.showModal);
    this.setState({
      showModal: true
    });
  },

  setApiKey: function(key) {
    this.setState({
      apiKey: key
    })
  },

  render: function(){
    const routes = (
      <Route path="/" 
             component={Content}
             setApiKey={this.setApiKey}
             apiKey={this.state.apiKey}
             showModal={this.state.showModal}
             handleHideModal={this.handleHideModal}>
        <IndexRoute component={Home} 
                    apiKey={this.state.apiKey}
                    handleShowModal={this.handleShowModal}/>
        <Route path="/create" 
               component={CreateClassifier} 
               apiKey={this.state.apiKey} />
        {/*<Route path="/collections" component={Collections}/>*/} 
        {/*<Route path="/similarity" component={Repos}/>*/} 
        {/*<Route path="/cloudant" component={About}/>*/}      
      </Route>
    );

    return (
      <Router history={browserHistory} routes={routes}/>
    );
  }
});

ReactDOM.render(
  <App />, 
  document.getElementById("wrapper")
);
