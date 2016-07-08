var React = require('react');
var axios = require('axios');
var connect = require('react-redux').connect;
var Logger = require('./../../../common/components/Logger.js');
var updateComponentState = require('./../actions/changeTinReduxActions.js').updateComponentState;
var BrokerDetails = require('./brokerDetail.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var browserHistory =require('react-router').browserHistory;

var ChangeTINTitle = React.createClass({

  htmlDecode:function(input)
	{
		var e = document.createElement('textarea');
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;

	},

  render : function(){
    return(
      <div className="columns large-12">
      <div className="selectAffiliationTop">{this.props.widgetContent.selectwritingagent[0].pageContent.lblSelectAffiliation}</div>
      <br/>
      <div className="selectdropdowntxt" id={this.props.widgetContent.selectwritingagent[0].pageContent.content[0].name}
            dangerouslySetInnerHTML={{__html: this.htmlDecode(this.props.widgetContent.selectwritingagent[0].pageContent.content[0].content)}}>
            </div>
      <br/>
      </div>

    )
  }

});

module.exports = ChangeTINTitle;
