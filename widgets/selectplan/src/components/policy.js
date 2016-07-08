
var React = require('react');
var ReactDOM = require('react-dom');
var planJson=require('../jsons/planList.json');
var PolicyName =  require("./policyName");
var Policy = React.createClass({


      getDefaultProps:function(){
	  
	  
	  
	  },
	 
	  componentDidMount:function(){
	  
	      
	  },
	 
       render: function() {
	   
	    
	      return(
          <div>
		
          
         {this.props.pName}
		  </div>
		  )
		  
	   }

});
	module.exports = Policy;
