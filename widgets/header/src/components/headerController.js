'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var utils = require('./../../../common/utils/utils.js');
var connect = require('react-redux').connect;
var headerReducer = require('./../reducers/headerReducers.js');
var headerActions = require('./../actions/headerActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var browserHistory = require('react-router').browserHistory;
var Header = React.createClass ({

	componentWillMount : function(){
		//Logger.debug('ChangeTIN.componentWillMount()');
		this.props.actions.initHeaderContent();
		},

	componentWillUnmount : function(){
		//Logger.debug('ChangeTIN.componentWillUnmount()');
	},

	componentDidMount : function(){
	//		Logger.debug('ChangeTIN.componentDidMount()');

		},
	logOut : function(){
		console.log("user logged out");
		this.props.actions.resetAppState();
		browserHistory.push('/');
	},

	render: function() {
		

		if(this.props.widgetContent == undefined ){
					return (<h1></h1>);
		}else{

			if( this.props.userName != undefined && this.props.userName.length != 0 ){
				return(
	        <div className="fixed large-12">
	          <nav className="top-bar" data-topbar role="navigation" style={this.props.widgetContent.pageStyles}>

						<img src={this.props.widgetContent.application[0].pageContent.content[0].url}/>
								{(this.props.userName == "" || this.props.userName == undefined) ? "" :
									(		<div className="float-right">
												<button onClick={this.logOut} className="float-right logout" >{this.props.widgetContent.application[0].pageContent.lblHeaderLogout}</button>
													<a className="float-right">|</a><a className="float-right">{this.props.userName}</a>
												<a href="#!" className="float-right">{this.props.widgetContent.application[0].pageContent.lblHeaderWelcome}</a>
											</div>
									)
								}

	          </nav>
	       </div>

	      )
			}else{
				return null;
			}
}
  }
});
function mapStateToProps(state, ownProps){
  	return {
  		widgetContent : state.headerReducer.widgetContent != undefined ? (state.headerReducer.widgetContent.data != undefined ? state.headerReducer.widgetContent.data : state.headerReducer.widgetContent) : state.headerReducer.widgetContent,
			userName : (state.loginReducer.broker!= undefined
												? state.loginReducer.broker.firstName
								: (state.loginReducer.delegate != undefined ?
									state.loginReducer.delegate.firstName : ""))
  	}
}
function mapDispatchToProps(dispatch){
	return{
		actions : bindActionCreators(headerActions , dispatch)
	}
}
module.exports = connect(mapStateToProps , mapDispatchToProps)(Header);
