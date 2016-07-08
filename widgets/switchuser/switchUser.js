var React = require('react');
var ReactDOM = require('react-dom');
var constant = require('./../changetin/src/constants/changeTinConstants.js');
var changeTinReduxActions = require('./../changetin/src/actions/changeTinReduxActions');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var browserHistory = require('react-router').browserHistory;
var utils = require('./../common/utils/utils.js');
var apiOpertaions = require('./../changetin/src/api/apiOperations.js');


var SwitchUser = React.createClass({
  onUserSelect : function(event){
    var _this = this;
    apiOpertaions.getSummaryRequest({userId : event.target.value}).then(function(userSummary){
          _this.props.actions.getUserDetailsSuccess(userSummary);
        		browserHistory.push('/app/changeTin')
    });
  },
  componentDidMount : function(){
      // var promiseZipCode = apiOpertaions.getZipCode({zipCode : "23294"})
      // promiseZipCode.then(function(data){
      //   console.log(data);
      // });
      // promiseZipCode.error(function(data){
      //   console.log(data);
      // });
  },
  render: function(){
    return(
          <select onChange={this.onUserSelect}>
              <option value="-1">Select a user</option>
              <option value="agentProfile1.json">Agent 1</option>
              <option value="agentProfile2.json">Agent 2</option>
              <option value="delegateProfile1.json">Delegate 1</option>
              <option value="delegateProfile2.json">Delegate 2</option>
          </select>
  );}
});

function mapStateToProps(state,ownProps){
  return {
    myProps : state.changeTinReducer
  }
}

function mapDispatchToProps(dispatch){
	return {
			actions : bindActionCreators(changeTinReduxActions , dispatch)
	}
}
module.exports = connect(mapStateToProps,mapDispatchToProps)(SwitchUser);
