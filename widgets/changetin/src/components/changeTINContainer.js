'use strict'
//react imports
var React = require('react');
var ReactDOM = require('react-dom');

//redux imports
var changeTinReduxActions = require('./../actions/changeTinReduxActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;

//component imports
var SelectAffiliationFromRadio = require('./selectAffiliationFromRadio.js');
var BrokerTable = require('./brokerTable.js');
//other imports
//var GlobalErrHandler = require('./../../../common/components/GlobalErrorHandler.js');
var Logger = require('./../../../common/components/Logger.js');
var utils = require('./../../../common/utils/utils.js');
var constant = require('./../constants/changeTinConstants.js');
var appConfig = require('./../../../common/config.js');
var browserHistory = require('react-router').browserHistory;
var DelegateGA = require('./delegateGA.js')
var ChangeTIN = React.createClass ({

	componentDidMount : function(){
		Logger.debug('ChangeTIN.componentDidMount()');
		if(this.props.profile == undefined){
			browserHistory.push('/');
		}else{
			this.init();
		}
		},

	onSearchEnter : function(data, array){
			this.props.actions.filterOnSearchCriteria(data,array);
	},

	init :function(){
				var _this = this;
				var userType = "";
							if(_this.props.userType != undefined){
								if(_this.props.userType == "delegate"){
												if(_this.props.profile.payableBrokers[0].type == "agent" && _this.props.profile.payableBrokers[0].type.toLowerCase() == "general agency"){
															userType = "delegate2";
													 }else{
														 userType = "delegate1";
													 }
								}else{
									userType = "agent";
								}
							}
						this.props.actions.fetchCmsContent(userType);
	},

	render: function() {
			if(this.props.widgetContent == undefined || !this.props.isUserDataReady){
				return (	<h1></h1>	);
			}else{
				if(this.props.profile != undefined){
					if(this.props.userType == "delegate"
								 	&& this.props.profile.payableBrokers[0].type.toLowerCase() === 'agency'){
											return(<BrokerTable widgetContent={this.props.widgetContent} actions={this.props.actions} selectedTinDelegate={this.props.selectedTinDelegate}
																					profile={this.props.profile} onSearchEnter={this.onSearchEnter} goToSelectPlan={this.goToSelectPlan}
																					filteredData={this.props.filteredDataDelegate} showTitle={true}/>);

					}else if(this.props.userType.toLowerCase() == "agent"
											&& this.props.profile.affliatedStates.length == 1
													&& this.props.profile.payableBrokers.length == 1){
								this.props.actions.updateComponentState({selectedRadio : event.target.value});
								browserHistory.push('demographics');
					}else if(this.props.userType.toLowerCase() == 'delegate'
								&& this.props.profile.payableBrokers[0].type.toLowerCase() === 'general agency'
									&& this.props.profile.assignedAgentsPopulated == false){
									return(<DelegateGA widgetContent={this.props.widgetContent} filterAgencySearchList={this.props.filterAgencySearchList}
																		actions={this.props.actions} profile={this.props.profile} generalAgencyBrokerList={this.props.generalAgencyBrokerList}
																		selectedStateGA={this.props.selectedStateGA}/>);
					}else if(this.props.userType == 'delegate'
									&& this.props.profile.payableBrokers[0].type == "agent"){
										return (
											<SelectAffiliationFromRadio userType = {this.props.userType}
																			profile={this.props.profile}
																			widgetContent={this.props.widgetContent}
																			isSingleStateAssociation={this.props.isSingleStateAssociation}
																			selection = {this.props.selection}
																			selectedRadio = {this.props.selectedRadio}
																			actions = {this.props.actions}/>);

					}
					else{
						return (
							<SelectAffiliationFromRadio userType = {this.props.userType}
															profile={this.props.profile}
															widgetContent={this.props.widgetContent}
															isSingleStateAssociation={this.props.isSingleStateAssociation}
															selection = {this.props.selection}
															selectedRadio = {this.props.selectedRadio}
															actions = {this.props.actions}/>);
					}
				}else{
					return (
						<h1></h1>
								);
				}

		}
	}
});

function mapStateToProps(state, ownProps){
	return {
		profile : (state.loginReducer.broker == undefined ?
							(state.loginReducer.delegate == undefined ? undefined : state.loginReducer.delegate)
						 : state.loginReducer.broker),
		widgetContent : state.changeTinReducer.widgetContent,
		isSingleStateAssociation : state.loginReducer.isSingleStateAssociation,
		selection : state.changeTinReducer.selection,
		selectedRadio : state.changeTinReducer.selectedRadio,
		isUserDataReady :  state.loginReducer.isUserDataReady,
		isSingleAgencyAssociation : state.loginReducer.isSingleAgencyAssociation,
		userType : (state.loginReducer.broker == undefined ?
							(state.loginReducer.delegate == undefined ? undefined : "delegate")
						 : "agent"),
		filteredDataDelegate : state.changeTinReducer.filteredDataDelegate,
		selectedTinDelegate : state.changeTinReducer.selectedTinDelegate != undefined ? state.changeTinReducer.selectedTinDelegate : undefined,
		selectedStateGA : state.changeTinReducer.selectedStateGA != undefined ? state.changeTinReducer.selectedStateGA : undefined,
		filterAgencySearchList : state.changeTinReducer.filterAgencySearchList != undefined ? state.changeTinReducer.filterAgencySearchList : undefined,
		generalAgencyBrokerList : state.changeTinReducer.generalAgencyBrokerList != undefined ? state.changeTinReducer.generalAgencyBrokerList : undefined
	}
}
function mapDispatchToProps(dispatch){
	return {
			actions : bindActionCreators(changeTinReduxActions , dispatch)
	}
}
module.exports = connect(mapStateToProps , mapDispatchToProps)(ChangeTIN);



/*

*/
