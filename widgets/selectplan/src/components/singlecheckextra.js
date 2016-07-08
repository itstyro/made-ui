
var React = require('react');
var ReactDOM = require('react-dom');
var SingleCheckExtra = React.createClass({


      getDefaultProps:function(){



	  },

	  componentDidMount:function(){


	  },

       render: function() {

	    //  console.log("subpolicytable"+this.props.policy);
	      return(
          <div>
		    <div className="extraPlanBackGround extraPlanAddedOptionl" >


        <input type="checkbox" name="extraPlans" value="extraPlan" />
			 {this.props.extrapolicy}


           </div>
		  </div>
		  )

	   }

});
	module.exports = SingleCheckExtra;
