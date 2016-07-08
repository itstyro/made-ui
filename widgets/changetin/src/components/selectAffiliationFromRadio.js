//this covers following scenarios
//Delegate: Scenario 2:  Delegate works for a SINGLE Agent who is associated with MULTIPLE Agencies
//Agent :Scenario 1 - Agent is affiliated with multiple agencies in multiple states.
//Agent :Scenario 2 (see Wireframe-Agent Affiliation-Scenario-2): Agent is affiliated with multiple agencies in only 1 State.
'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var connect = require('react-redux').connect;
var Logger = require('./../../../common/components/Logger.js');
var updateComponentState = require('./../actions/changeTinReduxActions.js').updateComponentState;
var BrokerDetails = require('./brokerDetail.js');
var ChangeTINTitle = require('./changeTINTitle.js');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var browserHistory = require('react-router').browserHistory;


var SelectAffiliationFromRadio = React.createClass ({

	transitionTONextRoute :function(){
		browserHistory.push('/demographics')
	},
	goBackToDashBoard : function(){
		this.props.actions.resetComponentState();
		browserHistory.push('/dashboard')
	},
	onStateSelect : function(event){
		this.props.actions.updateComponentState({selection :{ stateCode :event.target.value } ,
																						selectedRadio : "-1"
		});
	},
	onRadioChange : function(event){
			this.props.actions.updateComponentState({selectedRadio : event.target.value});
	},
	getRadioGroup : function(resultRows){
		 var showRadioSelected = false;
		// showRadioSelected = resultRows.length == 1 ? true : false;
		// if(showRadioSelected){
		// 	this.props.actions.updateComponentState({selectedRadio : resultRows[0].brokerTIN});
		// }
	  return resultRows.map(function(agency){
			var name ;
			if(agency.type == "Agent" || agency.type == "agent"){
				name = agency.firstName+" "+agency.lastName;
			}else{
				name = agency.name
			}
			return (
				<div class="row"><input type="radio" name="affiliationRadio" key="agency.name" defaultChecked={showRadioSelected}
				value={agency.brokerTIN} onChange={this.onRadioChange}/><label>{name}
				</label>

				<ReactCSSTransitionGroup transitionName="example" transitionAppearTimeout={500}
				transitionAppear={true} transitionEnterTimeout={600} transitionLeaveTimeout={100}>
				{(this.props.selectedRadio === agency.brokerTIN || showRadioSelected) ?
					<BrokerDetails key={agency.brokerTIN}
					hidden={true} broker={agency} brokerName={name}
					content={this.props.widgetContent.selectwritingagent[0].pageContent} />
					: ""
				}
				</ReactCSSTransitionGroup>
				</div>
			)
		} , this);
	},

	render: function() {
	 		var states;
			var uniqueStates=[];
			if(this.props.profile != undefined){
				if(this.props.userType === "agent" && !this.props.isSingleStateAssociation ){
					states = this.props.profile.affliatedStates.map(function(item){
						return (<option value={item} key={item} defaultValue>{item}</option>);
					});
				}else if(this.props.userType === "delegate"){
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
				 states = uniqueStates.map(function(item){
					 return (<option value={item} key={item} defaultValue>{item}</option>);
				 });
				}
			}

			var resultRows, radioGroup ;
			if(this.props.userType === "agent"){
				if(this.props.isSingleStateAssociation){
						resultRows = this.props.profile.payableBrokers;
				}
				else if(this.props.selection!= undefined && this.props.selection.stateCode != undefined){
					resultRows = this.props.profile.payableBrokers.filter(function(agency){
						if(agency.affliatedStates.indexOf(this.props.selection.stateCode) > -1)
						return agency;
					}, this);

				}
			}else if(this.props.userType === "delegate"){
				if(this.props.isSingleStateAssociation){
						resultRows = this.props.profile.payableBrokers[0].payableBrokers;
				}
				else if(this.props.selection!= undefined && this.props.selection.stateCode != undefined){
					resultRows = this.props.profile.payableBrokers[0].payableBrokers.filter(function(agency){
						if(agency.affliatedStates.indexOf(this.props.selection.stateCode) > -1)
						return agency;
					}, this);

				}
			}
			if(resultRows!=undefined) radioGroup = this.getRadioGroup(resultRows);

			return (
				<div className="large-12 row mainTag">
									<ChangeTINTitle widgetContent = {this.props.widgetContent} />
									{(states !== undefined && states.length >1) ?
										(<div className="large-6 medium-9 small-12 columns">
										<select id="cmbState" className="selectDropdownLine" onChange={this.onStateSelect}>
										<option value="-1" defaultValue>{this.props.widgetContent.selectwritingagent[0].pageContent.lblPickState}</option>
										{states}
										</select>
										</div>): ""}
						<hr className="hrLine"/>
						<div className="large-6 medium-6 small-12 columns"></div>
						{(this.props.selection != undefined && this.props.selection.stateCode!== "-1"
										|| this.props.isSingleStateAssociation
												|| this.props.isSingleAgencyAssociation)
																				?
						(   <div className="large-12 columns radioGrp">
								<label className="customerCreditViatxt">{this.props.widgetContent.selectwritingagent[0].pageContent.lblCustomerCreditVia}</label>
													<div id="radioGroup" ref="radioGroup">{radioGroup}</div>
								</div>):
								""}
						<div className="column">
							{(this.props.selectedRadio!= undefined && this.props.selectedRadio !== "-1")
							?
							(<button className="button continueBtn top45" onClick={this.transitionTONextRoute}>{this.props.widgetContent.selectwritingagent[0].pageContent.lblContinue}</button>): ""}
							{(this.props.selectedRadio!= undefined && this.props.selectedRadio !== "-1")
								?
							(<button className="button w3-round top45 cancelBtnDisclaimer" onClick={this.goBackToDashBoard}>CANCEL</button>):""}
						</div>
						</div>);
		}

});


module.exports = SelectAffiliationFromRadio;
