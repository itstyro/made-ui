'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var ChangeTINTitle = require('./changeTINTitle.js');
var browserHistory = require('react-router').browserHistory;
var SearchFromList = require('./searchFromList.js');
var BrokerTable = require('./brokerTable.js');
var DelegateGA = React.createClass ({
  onStateSelect : function(event){
          this.props.actions.updateComponentState({selectedStateGA : event.target.value});

  },
	render: function() {
	 		var states;
			var uniqueStates=[];
					var states = this.props.profile.payableBrokers[0].payableBrokers.map(function(item){
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

         var agenciesForSelectedState;
        this.props.selectedStateGA!=undefined ?
         agenciesForSelectedState = this.props.profile.payableBrokers[0].payableBrokers.filter(function(item){
               return item.affliatedStates.indexOf(this.props.selectedStateGA) >= 0 ;
          },this)
          : "";

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
            {(this.props.selectedStateGA != undefined && this.props.selectedStateGA!= "-1" ) ?
            (<div className="large-12 columns">
                  <SearchFromList agencyList={agenciesForSelectedState} generalAgencyBrokerList={this.props.generalAgencyBrokerList}
                                  filterAgencySearchList={this.props.filterAgencySearchList}
                                  selectedStateGA={this.props.selectedStateGA}
                                  actions={this.props.actions}/>
              </div>) : ""
            }
            <BrokerTable profile={this.props.profile} generalAgencyBrokerList={this.props.generalAgencyBrokerList}
                        widgetContent={this.props.widgetContent}
                        showTitle={false}/>
	  		</div>
      );
		}

});


module.exports = connect()(DelegateGA);
