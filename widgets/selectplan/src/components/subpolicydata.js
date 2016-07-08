
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var SubPolicyData = React.createClass({
    showTickImage:function(event){

      var x = $( "div.policycell" ).find( "img" ).hide();
		  if(event.target.firstElementChild.style.display == 'block')
	  	 event.target.firstElementChild.style.display = 'none';
	    else
	      event.target.firstElementChild.style.display = 'block';

        this.props.handlePolicySelect(event)
    },

       render: function() {
	      return(
          <div>
          <div className="policytable" >
          <div className="policyrow" onClick={this.showTickImage} data={this.props.policy}>
          <div className="policycell" data={this.props.policy} onClick={this.showTickImage}>
          {this.props.policy}  <img src="/images/selectplan/src/images/u252.png" id="toggleTick" className="tickImage"  />
          </div>
          </div>
          </div>
          </div>
		  )

	   }

});
	module.exports = SubPolicyData;
