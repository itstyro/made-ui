// This is the main component that will load the appropriate child components according to the logged in user
// TODO: Polymer/Material UI integration
// TODO: Services integration
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

var disclaimerActions = require('./../actions/disclaimerActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var browserHistory  = require('react-router').browserHistory ;

var utils = require('./../../../common/utils/utils.js');
var AgentDisclaimer = require('./agentDisclaimer.js');


var Disclaimer = React.createClass ({
    componentDidMount : function(){
      if(this.props.profile == undefined){
        browserHistory.push('/');
      }else{
        var states,uniqueStates=[],userType;
        var requestData ;
        if(this.props.userType === "delegate"){
        //  states = [];
          var states = this.props.profile.payableBrokers.map(function(item){
                  return item.affliatedStates !== undefined ? item.affliatedStates : [];
          });

          var concatStates=[];
          for (var i = 0; i < states.length; i++) {
                for(var j=0 ; j< states[i].length ; j++){
                    concatStates.push(states[i][j]);
                }
          }

          concatStates.filter(function(item, index){
             if(uniqueStates == undefined)
             {
               uniqueStates.push(item);
             }
             else if(uniqueStates.indexOf(item) <= -1) { uniqueStates.push(item)}
         } , this);
         states = uniqueStates;
         userType = "assistant";
         requestData = {
           usertype : userType,
         }
      //   usertype='+userType+'&state='+states.toString()
       }else{
         states = this.props.profile.affliatedStates;
         userType = "agent"
         requestData = {
           usertype : userType,
           state : ""+states.toString()
         }
       }




        var _this = this;
        utils.ajaxGet('http://va10n40504.anthem.com:81/cs/ContentServer?c=Portal_C&cid=1439331255275&d=Universal&pagename=brkSecure%2FPortal_C%2FMADE%2FPortal%2FDynamicContent' , requestData)
        .then(function(cmsContent){
            _this.props.actions.initContentSuccess(cmsContent);
        });
      }
    },

    render: function() {
        debugger;
        if(this.props.widgetContent != undefined){
          if(this.props.profile != undefined)
              return(<AgentDisclaimer profile={this.props.profile}
                                      widgetContent={this.props.widgetContent}
                                      resetAppState={this.props.actions.resetAppState}
                                      updateState={this.props.actions.updateComponentState}
                                      isDisclaimerAgreed={this.props.isDisclaimerAgreed}
                                      userType={this.props.userType}
                                      />);

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
    widgetContent : state.disclaimerReducer.widgetContent,
    isDisclaimerAgreed: state.disclaimerReducer.isDisclaimerAgreed,
    userType : (state.loginReducer.broker == undefined ?
              (state.loginReducer.delegate == undefined ? undefined : "delegate")
             : "agent")
      }
}

function mapDispatchToProps(dispatch){
	return {
			actions : bindActionCreators(disclaimerActions , dispatch)
	}
}

module.exports = connect(mapStateToProps ,mapDispatchToProps)(Disclaimer);
