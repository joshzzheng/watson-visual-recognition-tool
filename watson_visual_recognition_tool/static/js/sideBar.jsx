var React = require('react');

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

module.exports = SideBar