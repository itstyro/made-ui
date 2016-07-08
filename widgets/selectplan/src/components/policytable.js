
var React = require('react');
var ReactDOM = require('react-dom');
var planJson = require('../jsons/planList.json');
var SubPolicyData = require("./subpolicydata");
var PolicyTable = React.createClass({

          getInitialState : function(){
            return {
              imgSrc:"/images/selectplan/src/images/u252.png"
            }
          },

        render: function() {

        var subpolicy = this.props.tabledata.map(function(polname,index){
          return  (<SubPolicyData  policy={polname} key={index} handlePolicySelect={this.props.handlePolicySelect} elemenId={index}/>)
        },this);
          return(
             <div>
              {subpolicy}
   				  </div>
   		  )

	   }

});
	module.exports = PolicyTable;
