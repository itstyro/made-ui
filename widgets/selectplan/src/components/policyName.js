
var React = require('react');
var ReactDOM = require('react-dom');
var planJson=require('../jsons/planList.json');
var PolicyName = React.createClass({


      getDefaultProps:function(){
	  
	  
	  
	  },
	 
	  componentDidMount:function(){
	  
	      
	  },
	 
       render: function() {
	   
	    
	      return(
		  
          <div>
		  
		  {this.props.policyName.map((polname)=>{
		    return  <Policy  policy={polname}/>
		  
		  })
		  }
		
		  </div>
		  )
		  
	   }

});
	module.exports = PolicyName;
