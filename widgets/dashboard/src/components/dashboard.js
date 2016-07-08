// This is the main component that will load the appropriate child components according to the logged in user
// TODO: Polymer/Material UI integration
// TODO: Services integration
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

var dashboardActions = require('./../actions/dashboardActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var browserHistory  = require('react-router').browserHistory ;

var utils = require('./../../../common/utils/utils.js');
var DashboardContainer = require('./dashboardContainer.js');
var AssistantContainer = require('./assistantDashboard.js');

var Dashboard = React.createClass ({
    componentDidMount : function(){
      if(this.props.profile == undefined){
        browserHistory.push('/');
      }else{
        var states,uniqueStates=[],userType;
        var requestData ;
        if(this.props.userType === "delegate"){
         userType = "assistant";
         requestData = {
           usertype : userType
         }
      //   usertype='+userType+'&state='+states.toString()
       }else{
         userType = "agent"
         requestData = {
           usertype : userType
         }
       }

        var _this = this;
        utils.ajaxGet('http://va10n40504.anthem.com:81/cs/ContentServer?c=Portal_C&cid=1439331827805&d=Universal&pagename=brkSecure/Portal_C/MADE/Portal/DynamicContent' , requestData)
        .then(function(cmsContent){
            _this.props.actions.initContentSuccess(cmsContent);
            console.log('-->',requestData);
        });
        var reqparameter =
        {
          userId :'HMHQNLMRMZ' ,
          partnerId:'MADE',
          isdelegate:'Yes',
          isAgency:'Yes',
          brokerId: 'T551',
          agentId:'15808',
          agentTin: 'HMHQNLMRMZ'
        }

        var requestparameter =
        {
          agentTin :'HMHQNLMRMZ' ,
          userId:'GFT56',
          isdelegate:'NO',
          isAgency:'No',
          agentId: '15808',
          partnerId:'MADE',
        }

        if(this.props.profile.type == 'Agent'){
      this.props.actions.fetchDashboardSummaryContent(reqparameter);
    }
    else{
      this.props.actions.fetchAssistantSummaryContent(requestparameter);
    }
      }
    },

    render: function() {
        debugger;
        if(this.props.widgetContent != undefined){
          if((this.props.profile != undefined && this.props.profile.type === 'Agent') || this.props.userType === "agent")
            {
              return(<DashboardContainer profile={this.props.profile}
                                      widgetContent={this.props.widgetContent}
                                      resetAppState={this.props.actions.resetAppState}
                                      updateState={this.props.actions.updateComponentState}
                                      isDashBoardSaved={this.props.isDashBoardSaved}
                                      applicationContent={this.props.applicationContent}
                                      />);
            }
          else if((this.props.profile != undefined && this.props.profile.type === 'delegate') || this.props.userType === "delegate")
          {
            return(<AssistantContainer profile={this.props.profile}
                                    widgetContent={this.props.widgetContent}
                                    resetAppState={this.props.actions.resetAppState}
                                    updateState={this.props.actions.updateComponentState}
                                    isDashBoardSaved={this.props.isDashBoardSaved}
                                    assistantContent={this.props.assistantContent}/>);
          }

        else{
          return(<h1></h1>);
        }
    }
    else{
      return(<h1></h1>);
    }
}
});

function mapStateToProps(state,ownProps){
  debugger;
  return {
    profile : (state.loginReducer.broker == undefined ?
              (state.loginReducer.delegate == undefined ? undefined : state.loginReducer.delegate)
             : state.loginReducer.broker),
    widgetContent : state.dashboardReducer.widgetContent,
    isDashBoardSaved: state.dashboardReducer.isDashBoardSaved,
    userType : (state.loginReducer.broker == undefined ?
              (state.loginReducer.delegate == undefined ? undefined : "delegate")
             : "agent"),
    applicationContent : (state.dashboardReducer.applicationContent === undefined ? null : state.dashboardReducer.applicationContent ),
    assistantContent : (state.dashboardReducer.assistantContent === undefined ? null : state.dashboardReducer.assistantContent )
      }
}

function mapDispatchToProps(dispatch){
	return {
			actions : bindActionCreators(dashboardActions , dispatch)
	}
}

module.exports = connect(mapStateToProps ,mapDispatchToProps)(Dashboard);
