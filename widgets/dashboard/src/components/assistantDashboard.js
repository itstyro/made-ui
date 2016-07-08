var jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var ReactSimpleAlert = require('react-simple-alert');
var utils = require('./../../../common/utils/utils.js');
var connect = require('react-redux').connect;
var browserHistory = require('react-router').browserHistory;
var dashboardActions = require('./../actions/dashboardActions.js');
var bindActionCreators = require('redux').bindActionCreators;
//var DashboardRowData = require('./dashboardRowComponent.js');

var AssistantDashboardContent = React.createClass({
    componentDidMount:function() {

    },

    htmlDecode:function(input)
    {
        var e = document.createElement('textarea');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;

    },
    componentDidUpdate : function(){
      if(this.props.profile == undefined){
        browserHistory.push('/');
      }
    },
		newAppClick : function(){
			  browserHistory.push('changeTin');
		},
    render: function() {
        debugger;
        var _this = this;
        var msg = "";
        if(typeof this.props.widgetContent === "undefined"){
            return null;
        }
        else
        {
          var welcomeContent =this.props.widgetContent.AgentDashboard[0].pageContent.content.map(function (field, i) {
              if(field.name=="WelComeText")
              {
                  return(
                        <div id="welcomeContent" dangerouslySetInnerHTML={{__html: _this.htmlDecode(field.content)}} />
                    );
              }
          });

          if(this.props.assistantContent!== null){
            console.log('***',this.props.assistantContent);
            debugger;
          var rowContent = this.props.assistantContent.assistantInfo.applicationListing.map(function (field,index){
            return  (

              <div className="row padding-adjust" key={index}>
                <div className="small-2 medium-2 large-2 columns "><span className="paddingAlert">{field.firstName},{field.lastName}</span></div>
                <div className="small-2 medium-2 large-2 columns">{field.state}</div>
                <div className="small-2 medium-2 large-2 columns">''</div>
                <div className="small-2 medium-2 large-2 columns">{field.productType}</div>
                <div className="small-2 medium-2 large-2 columns">''</div>
                <div className="small-2 medium-2 large-2 columns"><a>''</a>
                  <span className="deleteIconStyle"><img src="/images/dashboard/src/images/trash.png" alt="trash" className="deleteIconSize"></img></span>
                </div>
              </div>
              )
             })
        }


				return(
				<div className="main">
				    <div className="row upperContainer">
					    <div className="small-6 medium-6 large-6 columns userContainer">
								<div className="userName">Welcome {this.props.profile.firstName}</div>
								<div className="userContent">{welcomeContent}</div>
								<div className="buttonContainer">
								   <button type="button" onClick={_this.newAppClick} className="buttonClassDashboard">{this.props.widgetContent.AgentDashboard[0].pageContent.lblNewApplication}</button>
								</div>
						</div>
						<div className="small-6 medium-6 large-6 columns">
								/* Code for Weekly snapshot div goes here */
						</div>
					 </div>

					  <div className="SavedApplication row">{this.props.widgetContent.AgentDashboard[0].pageContent.lblSavedApplications}</div>
					  <div className="row"><a className="small-10 medium-10 large-10 columns appLink">{this.props.widgetContent.AgentDashboard[0].pageContent.lblViewSubmittedApp}</a>
					                       <input type="search" className="small-2 medium-2 large-2 columns searchDashboard" placeholder="search"></input>  </div>

					<div className="row backgroundAdjust">
						<div className="small-2 medium-2 large-2 columns">{this.props.widgetContent.AgentDashboard[0].pageContent.lblCustomerName}</div>
						<div className="small-2 medium-2 large-2 columns">State</div>
						<div className="small-2 medium-2 large-2 columns">Writing Agent</div>
						<div className="small-2 medium-2 large-2 columns">{this.props.widgetContent.AgentDashboard[0].pageContent.lblPlanName}</div>
						<div className="small-2 medium-2 large-2 columns">{this.props.widgetContent.AgentDashboard[0].pageContent.lblDue}</div>
						<div className="small-2 medium-2 large-2 columns">{this.props.widgetContent.AgentDashboard[0].pageContent.lblActions}</div>
					</div>

            <div>{rowContent}</div>


					<div className="row border-before-table small-12 medium-12 large-12 columns"></div>


				</div>
		    );



  }
}
});



module.exports = AssistantDashboardContent;
