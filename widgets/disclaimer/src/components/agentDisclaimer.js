var jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
//var WelcomePage = require('./welcomePage');
var ReactSimpleAlert = require('react-simple-alert');
var browserHistory = require('react-router').browserHistory;
import ReactHtmlParser from 'react-html-parser';
//var CheckBox = require('./checkboxInput.js');
var AgentDisclaimer = React.createClass({

    componentDidMount:function() {

    },
    htmlDecode:function(input)
    {
        var e = document.createElement('textarea');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;

    },

   checkAgree: function(){
          if(this.props.isDisclaimerAgreed == undefined || this.props.isDisclaimerAgreed == false )
        {
            document.getElementById("errorMsg").style.display ="block";
        }else
        {
          browserHistory.push('dashBoard');
        }
    },
    onAgree : function(event){
          this.props.updateState({isDisclaimerAgreed : event.target.checked});
    },
    checkDisagree : function(){
      console.log("user logged out");
      this.props.resetAppState();
      browserHistory.push('/');
    },
    componentDidUpdate : function(){
      if(this.props.profile == undefined){
        browserHistory.push('/');
      }
    },
    render: function() {
        debugger;
        var _this = this;
        var msg = "";
        if(typeof this.props.widgetContent === "undefined"){
            return null;
        }
        else
        {
            if(this.props.userType === "delegate"){
              var assDelegate = "";
              if(this.props.profile.payableBrokers[0].type == "Agent"){
                assDelegate =this.props.profile.payableBrokers[0].firstName +" "+ this.props.profile.payableBrokers[0].middleName +" "+ this.props.profile.payableBrokers[0].lastName;
              }else{
                  assDelegate = this.props.profile.payableBrokers[0].name;
              }
              console.log('assdelegate-->',assDelegate);
            var disBodyContent =this.props.widgetContent.Disclaimer[0].pageContent.content.map(function (field, i) {
                if(field.field_type=="rich_text" && field.name=='AssistantDeclaration'){
                    return(
					<div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
                        <div className="xSmall-12 small-12 medium-12 large-12 columns contentInfo clrPad">
							                <div id="assistantContent">{ReactHtmlParser(field.content)}</div>
                              <span className="assDelegatetxt">{assDelegate}</span>
						            </div>
					</div>
                      );
            }else{
              return(
    <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
                  <div className="xSmall-12 small-12 medium-12 large-12 columns contentInfo clrPad">
                        <div id="dynamicContentAssistant" dangerouslySetInnerHTML={{__html: _this.htmlDecode(field.content)}} />
                  </div>
    </div>
                );
            }

            });
          }else{
            var disBodyContent =this.props.widgetContent.Disclaimer[0].pageContent.content.map(function (field, i) {
                if(field.field_type=="rich_text"){
                    return(
          <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
                        <div className="xSmall-12 small-12 medium-12 large-12 columns contentInfo clrPad">
                              <div id="dynamicContentAgent" dangerouslySetInnerHTML={{__html: _this.htmlDecode(field.content)}} />
                        </div>
          </div>
                      );
            }

            });
          }
       /* var rsaOptions = {
            message: msg,
            alert: this.state.alert
        };*/

        return(
            <div id="mainDiv" className="mainContainerDisclaimer row">
                <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
                    <div id="headerLabel" className="xSmall-12 small-12 medium-12 large-12 columns header clrPad">
                     {_this.props.widgetContent.Disclaimer[0].pageContent.lblLegalAgreement}
                    </div>
                </div>
                <div className="contentbody">


                    {disBodyContent}


                    {msg}
                </div>

        <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
            <div className="xSmall-12 small-12 medium-12 large-12 columns  clrPad">
                <label className="terms">
                    <input type="checkbox" id="checkAgree1" ref="disclaimerCheckBox" onChange={this.onAgree}/>{this.props.lblTermsAcknowledgement}
						              {_this.props.widgetContent.Disclaimer[0].pageContent.lblTermsAcknowledgement}
				        </label>
            </div>
       </div>
       <div  className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo" id="errorMsg" >{_this.props.widgetContent.Disclaimer[0].pageContent.messages.lblErrorMessageTermstobeAgreed}</div>
    <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad rowInfo">
        <div className="xSmall-12 small-12 medium-12 large-12 columns clrPad">
           <span> <input className="button w3-round acceptBtn " id="submitButton"  type="submit" onClick={_this.checkAgree} name={_this.props.widgetContent.Disclaimer[0].pageContent.lblAgree} value={_this.props.widgetContent.Disclaimer[0].pageContent.lblAgree}/> </span>
           <span> <input className="button w3-round cancelBtnDisclaimer" id="cancelButton" type="submit" onClick={this.checkDisagree} name={_this.props.widgetContent.Disclaimer[0].pageContent.lblDisagree} value={_this.props.widgetContent.Disclaimer[0].pageContent.lblDisagree} /></span>
        </div>
    </div>

</div>

                    );

        //});

    }


}
});
module.exports = AgentDisclaimer
