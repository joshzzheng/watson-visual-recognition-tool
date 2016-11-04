import React from 'react';
import ReactDOM from 'react-dom';

var ApiKeyModal = React.createClass({
  componentDidMount: function(){
    console.log("MODAL MOUNTED: " + this.props.showModal)
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },

  saveApiKey: function(){
    var key = ReactDOM.findDOMNode(this.refs.apiKey).value
    this.props.setApiKey(key);
    this.props.handleHideModal();
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
              <p>WARNING: This app will not function without an Watson VR API key.</p>
              <form id="api-key-form" role="form" action="#">
                <div className="form-group">
                  <input 
                    ref="apiKey"
                    className="form-control" 
                    type="text"
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                    value="2d7f02e6708f3562a043ebf31159ff849d94d123" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" 
                      className="btn btn-default" 
                      data-dismiss="modal"
                      onClick={this.props.handleHideModal}>
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
  }
});

module.exports = ApiKeyModal