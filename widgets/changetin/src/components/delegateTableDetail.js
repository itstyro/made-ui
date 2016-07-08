var React = require ('react');

var DelegateTableDetail = React.createClass({
    render : function(){
        return(
          <div className="delegateTablePopup">
          <div className="brokerDetail" key={this.props.detail.brokerTIN}>
          <div className="row small-12 medium-9 large-6 callout boxColor boxDim">
            <ul className="menu vertical nested nameHeading">
              <li><b>{this.props.detail.firstName}{this.props.detail.lastName != null ?
                                                ","+this.props.detail.lastName : ""}</b></li>
            </ul>
            <div className="small-12 large-12 medium-12 columns detailsDiv">
            <ul className="menu vertical nested">
            <li>
                <span>{this.props.content.lblAgentNumber}</span> :
                <span>{this.props.detail.brokerTIN}</span>
            </li>
            <li>
                <span>{this.props.content.lblAgentAddress}</span> :
                <span>{this.props.detail.contactInfo.address.address1}</span>
                {typeof this.props.detail.contactInfo.address.address2 !== "null" ?
                (<span>{this.props.detail.contactInfo.address.address2}</span>) : ""}
            </li>
            <li>
                <span>{this.props.content.lblState}</span> :
                <span>{this.props.detail.contactInfo.address.state}</span>
            </li>
            <li>
                <span>{this.props.content.lblZipcode}</span> :
                <span>{this.props.detail.contactInfo.address.zipCode}</span>
            </li>
            <li>
                <span>{this.props.content.lblPhoneNumber}</span> :
                <span>{this.props.detail.contactInfo.communicationChannels != undefined  ?
                        this.props.detail.contactInfo.communicationChannels[0].value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
                        : ""}</span>
            </li>
            <li className="row">
            <button className="button continueBtn top45 column"onClick={this.props.goToSelectPlan}>{this.props.content.lblContinue}</button>
            <button className="button w3-round top45 btnLink column" onClick={this.goBackToDashBoard}>CANCEL</button>
            </li>
            </ul>
          </div>
          </div>

          </div>
          </div>
        );
    }
});


module.exports = DelegateTableDetail;

/*
<div className="row small-12 medium-9 large-6 callout">
<ul className="menu vertical nested">
     <li><b>{this.props.detail.firstName}{this.props.detail.lastName != null ?
                                       ","+this.props.detail.lastName : ""}</b>
     </li>
     <li>
       <b>{this.props.detail.brokerTIN}</b>
     </li>
</ul>
<hr></hr>
<div className="small-12 large-12 medium-12 columns">
<ul className="menu vertical nested">
<li>
 <span>{this.props.detail.contactInfo.address.address1}</span>
 {typeof this.props.detail.contactInfo.address.address2 !== "null" ?
 (<span>{this.props.detail.contactInfo.address.address2}</span>) : ""}
</li>
</ul>
</div>
</div>

*/
