'use strict'
var React = require('react');

var BrokerDetails = React.createClass({
	render : function(){
		var name;
		return (
			<div className="brokerDetail" key={this.props.brokerName}>
			<div className="row small-12 medium-9 large-6 callout boxColor boxDim">
			 	<ul className="menu vertical nested nameHeading">
					<li><b>{this.props.brokerName}</b></li>
				</ul>
  	 		<div className="small-12 large-12 medium-12 columns detailsDiv">
				<ul className="menu vertical nested">
  			<li>
						<span>{this.props.content.lblAgentNumber}</span> :
						<span>{this.props.broker.brokerTIN}</span>
				</li>
				<li>
						<span>{this.props.content.lblAgentAddress}</span> :
						<span>{this.props.broker.contactInfo.address.address1}</span>
						{typeof this.props.broker.contactInfo.address.address2 !== "null" ?
						(<span>{this.props.broker.contactInfo.address.address2}</span>) : ""}
				</li>
				<li>
						<span>{this.props.content.lblState}</span> :
						<span>{this.props.broker.contactInfo.address.state}</span>
				</li>
				<li>
						<span>{this.props.content.lblZipcode}</span> :
						<span>{this.props.broker.contactInfo.address.zipCode}</span>
				</li>
				<li>
						<span>{this.props.content.lblPhoneNumber}</span> :
						<span>{this.props.broker.contactInfo.communicationChannels != undefined  ?
										this.props.broker.contactInfo.communicationChannels[0].value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
										: ""}</span>
				</li>

				</ul>
			</div>
</div>
</div>
);
		}

	});

	module.exports = BrokerDetails;
