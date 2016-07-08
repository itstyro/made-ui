
var React = require('react');
var ReactDOM = require('react-dom');
var planJson = require('../jsons/planList.json');
var Dropdown = React.createClass({


            getDefaultProps: function() {



            },

            componentDidMount: function() {


            },
            _changeValue: function(event) {

                if (this.props.onChange) {
                    this.props.onChange(event);

                }
                if (this.props.id === "yearSelected") {
                    var d = new Date();
                    var currentYearSelected = d.getFullYear();

                    if (event.target.value === currentYearSelected) {
                        //  $("#dropdownchange").prop("disabled", true);
                        document.getElementById("dropdownchange").disabled = false;
                    } else {
                        document.getElementById("dropdownchange").disabled = true;
                    }

                }

                //  this.props.onChange._onYearSelected(event.value);
                // this.props.onChange._onMonthSelected(event.value);
                //this.props.onChange._onPolicySelected(event.value);



            },


       render: function() {

         return(
           <div>


 		  <select  id="dropdownchange" onChange={this._changeValue}>

 			  <option value={this.props.defaultValue}>{this.props.defaultValue} </option>
 				{this.props.drownDownValues.map((item , i)=>{
 		       return   <option value={item.value == undefined ? item : item.value}>{item.name == undefined ? item :item.name}</option>

 		       })
 		  }

             </select>
 		  </div>
 		  )

	   }

});
	module.exports = Dropdown;
