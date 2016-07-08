//var jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
//var axios = require('axios');
//var Router = require('react-router');
//var DefaultRoute = Router.DefaultRoute;
//var Link = Router.Link;
//var Route = Router.Route;
//var RouteHandler = Router.RouteHandler;
//var Dispatcher = require('../../../common/dispatcher/MedicareDispatcher.js');
//var AgentDisclaimer = require('../../../DisclaimerWidget/src/components/agentDisclaimer');
//var AssistantDisclaimer = require('../../../DisclaimerWidget/src/components/assistantDisclaimer');

//redux imports
var loginActions = require('./../actions/loginActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;

var utils = require('./../../../common/utils/utils.js');
var constant = require('./../constants/loginConstants.js');
var appConfig = require('./../../../common/config.js');
var browserHistory = require('react-router').browserHistory;



var PageLogin = React.createClass ({


    componentDidMount:function()  {
        var _this = this;
            utils.ajaxGetNoJsonp(appConfig.config.LOGIN_CONTENT_URL).then(function(cmsContent){
                _this.props.actions.initContentSuccess(cmsContent);
            });
		},

    onLoginClickRequest : function(){
        var _this = this;
        var strUserName = _this.refs.userName.value.trim();
        if((strUserName=="")||(_this.refs.password.value==""))
        {
          alert('Username or Password cannot be empty.');
        }
        else {
          if(strUserName != undefined && strUserName != undefined &&  strUserName.length !=0
              && _this.refs.password != undefined && _this.refs.password.value != undefined &&  _this.refs.password.value.length !=0){
                _this.props.actions.updateComponentState({user : { userName : strUserName , password :"******"}});
                _this.props.actions.fetchUserSummary(strUserName);
              }
        }

        // utils.ajaxGetNoJsonp(appConfig.config.LOGIN_STUB_URL).then(function(response){
        //         var userDetails = response.logindata;
        //           var user = userDetails.filter(function(item){
        //             return  (item.username == _this.refs.userName.value && item.password == _this.refs.password.value);
        //           });
        //
        //           if(user != undefined && user.length >0){
        //             user[0].password = "*********";
        //             _this.props.actions.updateComponentState(user[0]);
        //             _this.props.actions.fetchUserSummary(user[0].username);
        //           }
        //         });
    },
		render: function() {
		    debugger;
      if(this.props.widgetContent == undefined){
          return (	<h1></h1>	);
      }else{
          return (


                  <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo ">
                  <div className="xSmall-12 large-12 columns">
                  <center><div className="clrPad rowInfo titleLogin"><img src="/images/login/src/images/VD-Logo.jpg" /></div></center>

                  <div  className="clrPad rowInfo subtitle">{this.props.widgetContent.txt_MADE_full_txt}</div>
                  <div className="row large-12">
                  <form role="form" className=" form-style callout large-4 medium-6 small-12 loginForm">

                  <input type="text" id="user" placeholder={this.props.widgetContent.txt_username} ref="userName"  className="loginTxtBox loginMargin" />

                  <input type="password" id="pwd" placeholder={this.props.widgetContent.txt_password} ref="password" className="loginTxtBox passwordBottom"/>
                  <button type="button" className="btn btn-default loginBtn" onClick={this.onLoginClickRequest}>{this.props.widgetContent.txt_login}</button>
                  <div className="footer large-12"><span className="loginContactUS">For Login issues please contact <a className="loginContactUSlink" href="#">Lorem@ipsum.anthem.com</a> </span></div>

                  </form>
                  </div>
                  </div>

                </div>

					);
      }
			}
});

function mapStateToProps(state, ownProps){
    return {
        widgetContent : state.loginReducer.widgetContent==undefined ? undefined :
                        (state.loginReducer.widgetContent.data == undefined ?
                            state.loginReducer.widgetContent.APP[0].pageContent :
                              state.loginReducer.widgetContent.data.APP[0].pageContent)
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions : bindActionCreators(loginActions , dispatch)
    }
}
module.exports = connect(mapStateToProps , mapDispatchToProps)(PageLogin);
