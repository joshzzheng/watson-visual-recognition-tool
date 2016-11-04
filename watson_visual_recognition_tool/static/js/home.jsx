import React from 'react'
import ReactDOM from 'react-dom'
import CustomClassifierList from './customClassifierList'

var Home = React.createClass({
  render: function() {
    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="container">
                <h2>Watson Visual Recognition Tool</h2>
                <div class="divider"></div>
                
                <h4>
                  API Key: {this.props.route.apiKey || "Unknown"} &nbsp;&nbsp;
                  <button className="btn btn-default"
                          onClick={this.props.route.handleShowModal}>
                    Update Key
                  </button>
                </h4>

                <div class="divider"></div>
                
                <CustomClassifierList 
                  url="/api/classifiers" 
                  apiKey={this.props.route.apiKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home