'use strict'
var React = require('react');
var ReactDOM = require('react-dom');


var SearchFromList = React.createClass({
      fetchBrokerList : function(event){
        this.props.actions.fetchBrokerList({taxId : event.target.attributes.data.nodeValue , state : this.props.selectedStateGA});
      },
      filterAgencySearchList :  function(event){
            this.props.actions.filterAgencySearchList({key : "name" , value: event.target.value} , this.props.agencyList);
      },
      render :  function(){
        var listOfAgencies = this.props.filterAgencySearchList != undefined ? this.props.filterAgencySearchList : this.props.agencyList;
        var domListOfAgencies;
        if(listOfAgencies != undefined){
            domListOfAgencies = listOfAgencies.map(function(item , index){
                return (<li className="agencySearchListItem" onClick={this.fetchBrokerList}><a href="#"  data={item.brokerId}>{item.name}</a></li>)
            } , this);
        }
          return(
          <div className="large-12 row mainTag generalAgencySearch">
          <input type="search" placeholder="search" onChange={this.filterAgencySearchList} className="search"/>
          <ul className="vertical menu agencySearchList">
              {domListOfAgencies}
          </ul>
          </div>
        );
      }
});

module.exports = SearchFromList;
