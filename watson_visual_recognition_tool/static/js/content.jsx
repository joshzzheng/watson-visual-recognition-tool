import React from 'react'
import ReactDOM from 'react-dom';
import ApiKeyModal from './apiKeyModal'
import Home from './home'
import CreateClassifier from './createClassifier'
import NavLink from './navLink'

var Content = React.createClass({
  getInitialState: function() {
    return {
      showModal: true
    };
  },

  handleHideModal: function(){
    this.setState({
      showModal: false
    });
    console.log("HIDE MODAL: " + this.state.showModal);
  },

  handleShowModal: function(){
    this.setState({
      showModal: true
    });
    console.log("SHOW MODAL: " + this.state.showModal);
  },

  componentWillReceiveProps: function(nextProps) {
    {/*console.log(nextProps);
    this.setState({showModal: nextProps.showModal});*/}
    console.log("UPDATED: " + this.state.showModal);
  },

  render: function() {
    console.log("RENDERING CONTENT: " + this.state.showModal);
    return(
      <div>
        <div id="sidebar-wrapper">
          <ul className="nav nav-pills nav-stacked sidebar-nav">
            <li className="nav-item sidebar-brand">
              <span style={{color:'white'}}>Watson VR Tool</span>
            </li>
            <li>
              <NavLink 
                  className="nav-link" 
                  to="/" 
                  onlyActiveOnIndex={true}>Home
              </NavLink>
            </li>
            <li><NavLink className="nav-link" to="/create">Create Classifier</NavLink></li>
            <li><NavLink className="nav-link" to="/collection">Collections</NavLink></li>
            <li><NavLink className="nav-link" to="/similarity">Similarity Search</NavLink></li>
            <li><NavLink className="nav-link" to="/cloudant">Cloudant</NavLink></li>
          </ul>
        </div>
        {this.props.children}
        {
          this.state.showModal ? 
            <ApiKeyModal
              showModal={this.state.showModal}
              handleHideModal={this.handleHideModal}
              setApiKey={this.props.route.setApiKey}
            /> 
            : null
        }
      </div>
    );
  }
});

module.exports = Content