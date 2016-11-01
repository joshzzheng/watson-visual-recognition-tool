var React = require('react');

var SideBar = React.createClass({
  getInitialState: function() {
    return {
      tabs: [
        {id: 0, text: 'Home', link: "#home", isActive: true},
        {id: 1, text: 'Create Classifier', link: "#create", isActive: false},
        {id: 2, text: 'Collections', link: "#collections", isActive: false},
        {id: 3, text: 'Similarity Search', link: "#Similarity", isActive: false},
        {id: 4, text: 'Cloudant', link: "#cloudant", isActive: false}
      ]
    };
  },

  handleTabClick: function(tabId) {
    var tempTabs = this.state.tabs.slice();
    tempTabs.map(function(tab){
      if (tab.id == tabId) {
        tab.isActive = true;        
      } else {
        tab.isActive = false; 
      }
      return tab;
    });
    this.setState({tabs: tempTabs});
  },
  
  render: function() {
    var that = this;
    var tabList = this.state.tabs.map(function(tab) {
      var tabClassName = tab.isActive ? "nav-link active" : "nav-link";
      return (
        <li className="nav-item">
            <a className={tabClassName}
               key={tab.id}
               id={tab.id}
               data-toggle="tab" 
               role="tab"
               href={tab.link}
               onClick={() => that.handleTabClick(tab.id)}>
              {tab.text}
            </a>
        </li>);
    });

    return (
      <div id="sidebar-wrapper">
        <ul className="nav nav-pills nav-stacked sidebar-nav" 
            role="tablist">
          <li className="nav-item sidebar-brand">
                Watson VR Tool
          </li>

          {tabList}

        </ul>
      </div>
    );
  }
});

module.exports = SideBar