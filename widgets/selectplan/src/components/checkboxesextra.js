
var React = require('react');
var ReactDOM = require('react-dom');
var planJson=require('../jsons/planList.json');
var SingleCheckExtra = require("./singlecheckextra");
var CheckBoxesExtra = React.createClass({

       render: function() {
         var checkboxExtra = this.props.extraplandata.map(function(riderObj){
            return <SingleCheckExtra  extrapolicy={riderObj.displayName} />;
         });
        //  var checkboxExtra =  this.props.extraplandata.map((extrapolname)=>{
   		 //    return  <SingleCheckExtra  extrapolicy={extrapolname} />
   		 //  });
	      return(
          <div>
            {checkboxExtra}
	        </div>
		  )

	   }

});
	module.exports = CheckBoxesExtra;
