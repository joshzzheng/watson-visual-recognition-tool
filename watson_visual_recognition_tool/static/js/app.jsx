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
      apiKey: null
    }
  },

  setApiKey: function(key) {
    this.setState({
      apiKey: key
    })
  },

  getApiKey: function() {
    return this.state.apiKey;
  }, 

  render: function(){
    const routes = (
      <Route path="/" 
             component={Content}>
        <IndexRoute component={Home} 
                    getApiKey={this.getApiKey}
                    setApiKey={this.setApiKey}
                    apiKey={this.state.apiKey}/>
        <Route path="/create" 
               component={CreateClassifier}
               url="/api/classifiers" 
               apiKey={this.state.apiKey}/>
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
