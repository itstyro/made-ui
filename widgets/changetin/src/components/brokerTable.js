var React= require('react');
var ChangeTINTitle = require('./changeTINTitle.js');
var DelegateTableDetail = require('./delegateTableDetail.js');
var browserHistory = require('react-router').browserHistory;
var BrokerTable =  React.createClass({
    onRowClick : function(event){
        if(event.target.className === "myTableRow"){
        this.props.actions.updateComponentState({selectedTinDelegate : event.target.attributes.data.nodeValue});
          event.stopPropagation();
        }
    //    console.log("Row clicked"+event.target.attributes.data.nodeValue);
    //    browserHistory.push('demographics');
    },
    onSearchEnter : function(event){
        this.props.onSearchEnter({key : "firstName" , value: event.target.value} , this.props.profile.assignedAgents);
    },
    goToSelectPlan : function(){
      browserHistory.push('selectPlan');
    },
    generateTableRows : function(){
      if(this.props.filteredData != undefined){
        return this.props.filteredData.map(function(item){
                 return(
                   <tr key={item.brokerTIN} onClick={this.onRowClick}>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow"><span onClick={this.onRowClick}>{item.firstName}</span>
                               <span>{item.lastName}</span></td>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow">{item.brokerTIN}</td>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow">{item.affliatedStates.toString()}
                   {this.props.selectedTinDelegate === item.brokerTIN ? (<DelegateTableDetail detail={item} goToSelectPlan={this.goToSelectPlan} content={this.props.widgetContent.selectwritingagent[0].pageContent}/>) : ""}</td>
                   </tr>
                 )
         } , this);
      }else{
        return this.props.profile.assignedAgents.map(function(item){
                 return(
                   <tr key={item.brokerTIN}>
                   <td onClick={this.onRowClick} data={item.brokerTIN} className="myTableRow"> <span onClick={this.onRowClick}>{item.firstName}</span>
                             {item.lastName === "null" ? "" : ","}
                               <span>{item.lastName}</span></td>
                   <td onClick={this.onRowClick} data={item.brokerTIN} className="myTableRow">{item.brokerTIN}</td>
                   <td onClick={this.onRowClick} data={item.brokerTIN} className="myTableRow">{item.affliatedStates.toString()}
                   {this.props.selectedTinDelegate === item.brokerTIN ? (<DelegateTableDetail detail={item} goToSelectPlan={this.goToSelectPlan} content={this.props.widgetContent.selectwritingagent[0].pageContent}/>) : ""}
                   </td>
                   </tr>
                 )
         } , this);

      }
    },
    generateGeneralAgencyTableRows : function(){
      if(this.props.generalAgencyBrokerList != undefined){
        return this.props.generalAgencyBrokerList.payableBrokers.map(function(item){
                 return(
                   <tr key={item.brokerTIN} onClick={this.onRowClick}>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow"><span onClick={this.onRowClick}>{item.firstName}</span>
                               <span>{item.lastName}</span></td>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow">{item.brokerTIN}</td>
                   <td onClick={this.onRowClick}  data={item.brokerTIN} className="myTableRow">{item.affliatedStates.toString()}
                   {this.props.selectedTinDelegate === item.brokerTIN ? (<DelegateTableDetail detail={item} goToSelectPlan={this.goToSelectPlan} content={this.props.widgetContent.selectwritingagent[0].pageContent}/>) : ""}</td>
                   </tr>
                 )
         } , this);
      }
    },
    render : function(){
      //var tableRows =  this.generateTableRows();
      var tableRows;
      if(this.props.generalAgencyBrokerList != undefined){
        tableRows =  this.generateGeneralAgencyTableRows();
      }else{
        tableRows =  this.generateTableRows();
      }
      return(
        <div className="large-12 row mainTag">
        {(this.props.showTitle != undefined && this.props.showTitle==true) ? (<div><ChangeTINTitle widgetContent = {this.props.widgetContent} /><input type="search" placeholder="search" onChange={this.onSearchEnter} /></div>) : ""}

        <table className="brokerListTable">
          <thead>
            <tr onClick={this.onRowClick}>
              <th id="column1">{this.props.widgetContent.selectwritingagent[0].pageContent.lblAgentName}</th>
              <th id="column2">{this.props.widgetContent.selectwritingagent[0].pageContent.lblAgentTin}</th>
              <th id="column3">{this.props.widgetContent.selectwritingagent[0].pageContent.lblState}</th>
            </tr>
          </thead>
          <tbody>
                {tableRows}
          </tbody>
        </table>
        </div>
      )
    }
});

module.exports = BrokerTable;
