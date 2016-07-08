
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var axios = require('axios');
//var planJson = require('../jsons/planList.json');
//var subplanJson = require('../jsons/subPlans.json');
var Dropdown = require("./dropdown");
var PolicyTable = require("./policytable");
var CheckBoxesExtra = require("./checkboxesextra");


var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;
var appConfig = require('./../../../common/config.js');
var selectPlanActions = require('./../actions/selectPlanActions.js');
var utils = require('./../../../common/utils/utils.js');
var browserHistory = require('react-router').browserHistory;


var Selectplan = React.createClass({

            getInitialState: function() {
                debugger;
                var date = new Date();
                var currentYear = date.getFullYear();
                var currentMonthIndex = date.getMonth()+1;
                var futureYear = currentYear + 1;
                var str = '';
                var monthstring;
                var monthStringArray = [];
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                for (var i = 1; i < 7 ; i++) {
                    //var date = new Date(date.setMonth(date.getMonth() + i));
                    var index = (currentMonthIndex + i) > 12 ? (currentMonthIndex + i) - 12 : currentMonthIndex + i;
                    monthstring = monthNames[index-1];
                    monthStringArray.push({name : monthstring , value : index});

                    //  str += " : " + monthNames[date.getMonth() + i];

                }

                var yearArray;

                if (currentMonthIndex >= 8) {
                    yearArray = [currentYear, futureYear];

                } else {
                    yearArray = [currentYear];

                }


                var futureMontharray = monthStringArray;
                var emptyArray = [];
                var emptySubPolicy = [];
                var emptyExtraPolicy = [];
                var planData = [];
                var defaultPlanValue="Select Category";
                var yearselected = '';

                return {
                    yearArray: yearArray,
                    futureMontharray: futureMontharray,
                    emptyArray: emptyArray,
                    emptySubPolicy: emptySubPolicy,
                    emptyExtraPolicy: emptyExtraPolicy,
                    selectPlanData : [],
                    planBenefits: [],
                    defaultPlanValue:defaultPlanValue,
                    data: {},
                    yearselected:''
                }

            },
            navigatingToDashboardByCancel:function()
            {
            	browserHistory.push('/dashboard');
            },

            componentDidMount: function() {

                var _this = this;

              //  var _this = this;

                     $.ajax({
                     //url: 'http://va10n40504.anthem.com:81/cs/ContentServer?c=Portal_C&cid=1439331255275&d=Universal&pagename=brkSecure%2FPortal_C%2FMADE%2FPortal%2FDynamicContent&usertype=agent&state=' + stateName,

                     url: 'http://va10n10246.wellpoint.com:9082/cs/ContentServer?c=Portal_C&cid=1439331474347&d=Universal&pagename=brkSecure%2FPortal_C%2FMADE%2FPortal%2FDynamicContent',
                     dataType: 'JSONP',
                     jsonpCallback: 'callback',
                     type: 'GET',
                     success: function (response) {
                       console.log(response);
                       console.log("Sup");
                       //console.log(JSON.stringify(response));

                       _this.setState({data: response});
                     }.bind(_this)
                   });

                   this.props.actions.fetchBrands({stateCode : this.props.userDemographicData.stateCode , countyName: this.props.userDemographicData.countyName});

                // axios.get('/jsons/plansummary.json')
                //     .then(function(response) {
                //         console.log(response);
                //         _this.setState({
                //             selectPlanData: response.data.planSummaryResponse.medicarePlans.medicarePlan
                //         });
                //         _this.setState({
                //             planBenefits: response.data.planSummaryResponse.medicarePlans.medicarePlan.riders
                //         });
                //     }).catch(function(error) {
                //         console.log(error);
                //     });

            },

            getDefaultProps: function(arg) {



            },
            _onYearSelected: function(event) {
              console.log('-----',event.target.value);
              this.setState({
                yearselected:event.target.value
              });

              if(this.props.selectedMonth != undefined &&  this.props.selectedMonth !== 'Month'){
                    this.props.actions.fetchPlan({zipCode : this.props.userDemographicData.zipCode,
                                                county: this.props.userDemographicData.countyName,
                                              state: this.props.userDemographicData.stateCode,
                                            brandName: "Anthem",
                                          coverageyear: this.state.yearselected,
                                        coveragemonth: selectedText,
                                      dob: this.props.userDemographicData.dob.replace(/\//gi, "-"),
                                    gender: this.props.userDemographicData.gender,
                                  type:'primary' });
              }

            },


            _onMonthSelected: function(event) {
                var _this = this;
                var d = new Date();
                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";

                //  var policyData = planJson.plans;
                var policyArrayShow = [];
                var selectedText = event.target.value;
                if(event.target.value < this.state.futureMontharray[0].value){
                  document.getElementById("dropdownchange").value = this.state.yearArray[1];
                  this.setState({
                    yearselected:  document.getElementById("dropdownchange").value
                  })

                }else if(event.target.value != "Month"){
                  document.getElementById("dropdownchange").value = this.state.yearArray[0];
                  this.setState({
                    yearselected:  document.getElementById("dropdownchange").value
                  })

                }
                /* _this.state.emptyArray = [];
                _this.state.emptySubPolicy = [];
                _this.state.emptyExtraPolicy = [];
                _this.state.defaultPlanValue="Select Category" */

                this.setState({
                    emptyArray:[]
                })
                this.setState({
                    emptySubPolicy:[]
                })
                this.setState({
                    emptyExtraPolicy:[]
                })
                this.setState({
                    defaultPlanValue:"Select Category"
                })
                var policyArray=[];
                if (selectedText === "Month") {
                  //  _this.state.emptyArray = [];
                  document.getElementById("dropdownchange").disabled = false;
                  this.props.actions.updateComponentState({planDataObj : undefined , selectedMonth : "Month"});
                  this.selectedIndex = 0;
                }
                else{
                  document.getElementById("anthemExtra").style.display = 'none';
                  document.getElementById("extraPlanSelect").style.display = 'none';
                this.props.actions.updateComponentState({selectedMonth : selectedText , planDataObj : undefined});
                if(this.state.yearselected !== '' && this.state.yearselected !== 'Year'){
                  this.props.actions.fetchPlan({zipCode : this.props.userDemographicData.zipCode,
                                                  county: this.props.userDemographicData.countyName,
                                                state: this.props.userDemographicData.stateCode,
                                              brandName: "Anthem",
                                            coverageyear: this.state.yearselected,
                                          coveragemonth: selectedText,
                                        dob: this.props.userDemographicData.dob.replace(/\//gi, "-"),
                                      gender: this.props.userDemographicData.gender,
                                    type:'primary' });
                }
              }


                //this.setState(emptyArray:policyArrayShow);
                this.setState({
                    emptyArray: policyArrayShow
                });


                if(this.props.policyData == undefined){
                  alert("no plan");
                }

            },
            populatePolicyData : function(){
                var policyData = this.props.policyData.planSummaryResponse.medicarePlans;
                var policyArrayShow = [];
                var d = new Date();

                if(this.props.policyData != undefined){
                    if(parseInt(this.props.selectedIndex) === (d.getMonth()+2) ||
                          parseInt(this.props.selectedIndex) === (d.getMonth()+3) ||
                              parseInt(this.props.selectedIndex) === (d.getMonth()+4)){
                                for (var j = 0; j < policyData.medicarePlan.length; j++) {
                                        if (policyData.medicarePlan[j].coverageType == "ORIG_MEDICARE"
                                                || policyData.medicarePlan[j].coverageType == "PDP"
                                                    || policyData.medicarePlan[j].coverageType == "MED_SUPP"
                                                        || policyData.medicarePlan[j].coverageType == "MAPD"
                                                            || policyData.medicarePlan[j].coverageType == "MA") {
                                            policyArray = policyData.medicarePlan[j].coverageType;
                                            if (policyArrayShow.indexOf(policyArray) == -1) {
                                                policyArrayShow.push(policyArray);
                                            }
                                        }
                                     }

                              }else{
                                    for (var k = 0; k < policyData.medicarePlan.length; k++) {
                                        if (policyData.medicarePlan[k].coverageType == "MED_SUPP") {
                                            var policyArray = policyData.medicarePlan[k].coverageType;
                                            if (policyArrayShow.indexOf(policyArray) == -1) {
                                                policyArrayShow.push(policyArray);
                                            }

                                        }

                              }
                            }
              }
              return policyArrayShow;
            },
            _onPolicySelected: function(event) {

                document.getElementById('dividerLine').style.display = "block";
                document.getElementById('showButtons').style.display = "block";
                document.getElementById('toggleTick') !== null ? document.getElementById('toggleTick').style.display = "none" : "";


                console.log("Selected policy value is "+event.target.value);
                var selectedPolicy = event.target.value;

                var policyDataTable = this.props.policyData.planSummaryResponse.medicarePlans.medicarePlan;
                var extraDetails = this.props.policyData.planSummaryResponse.medicarePlans.medicarePlan.riders;
                var medicareData = [];
                var medicareAdvData;
                var medsUpDataShow;
                var medsUpDataPush = [];
                var prescriptionDataPush;
                var prescriptionDataShow = [];
                var extraPlanData;
                var extraPlanDataShow = [];
                var getPlanefits;
                var totalExtrasName;
                var extraPlanAccessData = []
                var getPlanefitsArray = [];
                //this.state.emptySubPolicy = [];
                //this.state.emptyExtraPolicy = [];
                this.setState({
                      emptySubPolicy: []
                  });
                this.setState({
                      emptyExtraPolicy: []
                  });
                  this.props.actions.updateComponentState({selectedPolicy : undefined , showRiders : false});
                if (selectedPolicy === "Select Category" && selectedPolicy != 'MED_SUPP') {
                    document.getElementById('plannotselected').style.display = "block";
                    document.getElementById('dividerLine').style.display = "none";
                    document.getElementById('showButtons').style.display = "none";
                    document.getElementById('medsuptext').style.display = "none";
                    document.getElementById('showOtherCheck').style.display = "none";
                    document.getElementById('anthemExtra').style.display="none!important";
                    document.getElementById('extraPlanSelect').style.display = "none!important";
                    this.setState({
                          emptySubPolicy: []
                      });
                      this.setState({
                            emptyExtraPolicy: []
                        });
                  $(" div #extraCheckbox").removeClass("showScrollExtra");
                } else {
                    if (selectedPolicy === "ORIG_MEDICARE") {
                        document.getElementById('plannotselected').style.display = "none";
                        for (var i = 0; i < policyDataTable.length; i++) {
                            if (policyDataTable[i].coverageType === "ORIG_MEDICARE") {
                                document.getElementById('extraPlanSelect').style.display = "none";
                                document.getElementById('medsuptext').style.display = "none";
                                document.getElementById('showOtherCheck').style.display = "none"
                                medicareAdvData = policyDataTable[i].displayname;
                                medicareData.push(medicareAdvData);
                            }
                        }
                         $(" div #extraCheckbox").removeClass("showScrollExtra");
                        this.setState({
                            emptySubPolicy: medicareData
                        });
                        this.setState({
                            emptyExtraPolicy: extraPlanAccessData
                        });


                        //this.setState({emptyExtraPolicy: this.state.emptyExtraPolicy .concat(extraPlanDataShow)});
                    } else if (selectedPolicy === "MED_SUPP") {
                        document.getElementById('plannotselected').style.display = "none";
                        document.getElementById('medsuptext').style.display = "block";
                        document.getElementById('showOtherCheck').style.display = "block";
                        document.getElementById('anthemExtra').style.display = "block";
                        document.getElementById('extraPlanSelect').style.display = "none";
                        for (var i = 0; i < policyDataTable.length; i++) {
                            if (policyDataTable[i].coverageType === "MED_SUPP") {
                                medsUpDataShow = policyDataTable[i].displayname;
                                medsUpDataPush.push(medsUpDataShow);
                                // if (policyDataTable[i].productType === "MEDICAL") {
                                //     extraPlanAccessData.push(policyDataTable[i].riders);
                                //     if(extraPlanAccessData.length > 0 && this.props.userDemographicData.stateCode === "WI"){
                                //       document.getElementById('extraPlanSelect').style.display = "block";
                                //     }
                                // }
                            }

                        }
                        this.setState({
                            emptySubPolicy: medsUpDataPush
                        });
                        this.setState({
                            emptyExtraPolicy: extraPlanAccessData
                        });

                    }
                    else if (selectedPolicy === "MAPD") {
                        document.getElementById('plannotselected').style.display = "none";
                        document.getElementById('medsuptext').style.display = "block";
                        document.getElementById('anthemExtra').style.display = "none";
                    //    document.getElementById('extraPlanSelect').style.display = "block";
                        document.getElementById('showOtherCheck').style.display = "block";

                        for (var i = 0; i < policyDataTable.length; i++) {
                            if (policyDataTable[i].coverageType === "MAPD" ) {
                                medsUpDataShow = policyDataTable[i].displayname;
                                medsUpDataPush.push(medsUpDataShow);
                              //  if (policyDataTable[i].productType === "MEDICAL") {
                              //      extraPlanAccessData.push(policyDataTable[i].riders !== undefined ? policyDataTable[i].riders : []);
                                    // getPlanefits = policyDataTable[i].riders;
                                    //
                                    // for (var n = 0; n < getPlanefits.length; n++) {
                                    //     totalExtrasName = getPlanefits[n].displayName;
                                    //     if (extraPlanAccessData.indexOf(totalExtrasName) == -1) {
                                    //         extraPlanAccessData.push(totalExtrasName);
                                    //         if(extraPlanAccessData.length>8){
                                    //          document.getElementById("extraCheckbox").className = "showScrollExtra";
                                    //          $(" div #extraCheckbox").addClass("showScrollExtra");
                                    //         }
                                    //         else{
                                    //              $(" div #extraCheckbox").removeClass("showScrollExtra");
                                    //         }
                                    //     }
                                    // }
                            //    }
                            }

                        }
                        this.setState({
                            emptySubPolicy: medsUpDataPush
                        });
                        // this.setState({
                        //     emptyExtraPolicy: extraPlanAccessData
                        // });

                    }
                    else if (selectedPolicy === "MA") {
                        document.getElementById('plannotselected').style.display = "none";
                        document.getElementById('medsuptext').style.display = "block";
                        document.getElementById('anthemExtra').style.display = "none";
                        document.getElementById('extraPlanSelect').style.display = "block";
                        document.getElementById('showOtherCheck').style.display = "block";

                        for (var i = 0; i < policyDataTable.length; i++) {
                            if (policyDataTable[i].coverageType === "MA") {
                                medsUpDataShow = policyDataTable[i].displayname;
                                medsUpDataPush.push(medsUpDataShow);
                                if (policyDataTable[i].productType === "MEDICAL" && policyDataTable[i].riders != undefined) {
                                    getPlanefits = policyDataTable[i].riders;
                                    for (var n = 0; n < getPlanefits.length; n++) {
                                        totalExtrasName = getPlanefits[n].displayName;
                                        if (extraPlanAccessData.indexOf(totalExtrasName) == -1) {
                                            extraPlanAccessData.push(totalExtrasName);
                                            if(extraPlanAccessData.length>8){
                                             document.getElementById("extraCheckbox").className = "showScrollExtra";
                                             $(" div #extraCheckbox").addClass("showScrollExtra");
                                            }
                                            else{
                                                 $(" div #extraCheckbox").removeClass("showScrollExtra");
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        this.setState({
                            emptySubPolicy: medsUpDataPush
                        });
                        this.setState({
                            emptyExtraPolicy: extraPlanAccessData
                        });

                    }
                    else if (selectedPolicy === "PDP") {
                        document.getElementById('plannotselected').style.display = "none";
                        document.getElementById('medsuptext').style.display = "none";
                        document.getElementById('extraPlanSelect').style.display = "none";

                        //document.getElementById('showOtherCheck').style.display = "block"

                        for (var j = 0; j < policyDataTable.length; j++) {
                            if (policyDataTable[j].coverageType === "PDP") {
                                prescriptionDataPush = policyDataTable[j].displayname;
                                prescriptionDataShow.push(prescriptionDataPush);
                            }
                        }


                        this.setState({
                            emptySubPolicy: prescriptionDataShow
                        });
                    } else {
                        document.getElementById('plannotselected').style.display = "none";
                        document.getElementById('dividerLine').style.display = "none";
                        document.getElementById('showButtons').style.display = "none";
                        this.setState({
                              emptySubPolicy: []
                          });
                          this.setState({
                                emptyExtraPolicy: []
                            });
                             $(" div #extraCheckbox").removeClass("showScrollExtra");
                    }
                }
            },
      showRidersForPlan : function(event){
        var policyDataTable = this.props.policyData.planSummaryResponse.medicarePlans.medicarePlan;
        var selectedPolicy = policyDataTable.filter(function(item){
               if(item.displayname === event.target.attributes.data.nodeValue && item.riders !== undefined){ return item; }
        });
        if(selectedPolicy != undefined && selectedPolicy.length !=0 && selectedPolicy[0].riders != undefined){
          if(this.props.selectedPolicy != undefined &&
                  this.props.selectedPolicy.length > 0 &&
                  this.props.selectedPolicy[0].displayname === event.target.attributes.data.nodeValue){
            this.props.actions.updateComponentState({selectedPolicy : undefined , showRiders : false});
          }else{
            this.props.actions.updateComponentState({selectedPolicy : selectedPolicy , showRiders : true});
          }
        }else{
          this.props.actions.updateComponentState({selectedPolicy : selectedPolicy , showRiders : false});
        }
        document.getElementById('plannotselected').style.display = "none";
        document.getElementById('extraPlanSelect').style.display = "none";
        document.getElementById('showOtherCheck').style.display = "none";
      },
      componentDidUpdate : function(){
        if(this.props.selectedPolicy == undefined){
          document.getElementById('plannotselected').style.display = "none";
          document.getElementById('extraPlanSelect').style.display = "none";
          document.getElementById('showOtherCheck').style.display = "none";
        }
      },
       render: function() {

         var _this=this;
         var populatePolicyData;

         if(this.props.policyData != undefined){
           populatePolicyData = this.populatePolicyData();
         }

         console.log("****************************"+ populatePolicyData);
         if(typeof _this.state.data.demographic === "undefined"){
             return null;
         }
          else
        {
          var checkBoxes;
          var coverageType;
          var showRiders = false;
          if(this.props.selectedPolicy != undefined && this.props.selectedPolicy.length != 0 && this.props.selectedPolicy[0].riders !== undefined && this.props.showRiders == true)
            {
              checkBoxes = this.props.selectedPolicy.map(function(policyData , index){
                return (<CheckBoxesExtra extraplandata={policyData.riders} id={"rider"+index}/>)
              });
              coverageType = this.props.selectedPolicy[0].coverageType;
              (checkBoxes!=undefined && checkBoxes.length >0) ? showRiders=true : showRiders=false;
            }
            if(checkBoxes != undefined && checkBoxes.length > 0  && coverageType!== undefined && coverageType === "MAPD" && showRiders){
              document.getElementById('plannotselected').style.display = "none";
              document.getElementById('medsuptext').style.display = "block";
              document.getElementById('anthemExtra').style.display = "none";
              document.getElementById('extraPlanSelect').style.display = "block";
              document.getElementById('showOtherCheck').style.display = "block";
            }else if(checkBoxes != undefined && checkBoxes.length > 0  && this.props.selectedPolicy.coverageType === "MA"){
              document.getElementById('plannotselected').style.display = "none";
              document.getElementById('medsuptext').style.display = "block";
              document.getElementById('anthemExtra').style.display = "none";
              document.getElementById('extraPlanSelect').style.display = "block";
              document.getElementById('showOtherCheck').style.display = "block";
            }else if(this.props.selectedPolicy!= undefined && coverageType === "MED_SUPP"){
                document.getElementById('plannotselected').style.display = "none";
                document.getElementById('showOtherCheck').style.display = "block";
                document.getElementById('extraPlanSelect').style.display = "none";
                  if(checkBoxes != undefined && checkBoxes.length > 0  && this.props.userDemographicData.stateCode === "WI" && showRiders){
                     document.getElementById('extraPlanSelect').style.display = "block";
                     document.getElementById('anthemExtra').style.display = "none";
                   }else{
                     document.getElementById('extraPlanSelect').style.display = "none";
                     document.getElementById('anthemExtra').style.display = "block";
                     document.getElementById('medsuptext').style.display = "block";
                   }
            }else if(checkBoxes != undefined && checkBoxes.length > 0 && showRiders){
              document.getElementById('extraPlanSelect').style.display = "none";

            }
          // var checkBoxes = this.state.emptyExtraPolicy.map(function(policyData , index){
          //   return <CheckBoxesExtra extraplandata={policyData} id={"rider"+index}/>
          // });
	      return(

          <div>
          <div className="row small-12 medium-12 large-12 columns headerComponent">

          <span><img src="/images/demographicWidget/src/images/profile_inactive.png" /></span>
           <span className="mainHeaderTextDemo1">{_this.state.data.demographic[0].pageContent.lblCustomerInformation}</span>
           <span><span className="mainHeaderLine"></span></span>
           <span><img src="/images/demographicWidget/src/images/plan_active.png" /></span>
           <span className="mainHeaderTextDemo ">{_this.state.data.demographic[0].pageContent.lblSelectPlan}</span>
           <span><span className="mainHeaderLine"></span></span>
           <span><img src="/images/demographicWidget/src/images/pdf_inactive.png" /></span>
           <span className="mainHeaderTextDemo1">{_this.state.data.demographic[0].pageContent.lblFormData}</span>
        </div>

          <div className="row small-12 medium-12 large-12 columns bodybg">
          <div className="small-12 medium-12 large-12 columns mainFormDemoInfoPage" >
             <div>
                <form className="customerInformationValidation">

                   <div className="row small-12 medium-12 large-12 columns coveragePadding">
                      <div className="small-4 medium-4 large-4 columns labelAlignDemographic">
                         <p><span>{_this.state.data.demographic[0].pageContent.lblCoverage} : </span></p>
                      </div>
                      <div className="small-3 medium-3 large-3 columns" id="year" >
                         <Dropdown  drownDownValues={this.state.yearArray} id="yearSelected" defaultValue="Year" onChange={this._onYearSelected} reference="selectedYear"/>
                      </div>
                      <div className="small-3 medium-3 large-3 columns" id="month">
                         <Dropdown drownDownValues={this.state.futureMontharray}  defaultValue="Month" onChange={this._onMonthSelected} reference="selectedMonth"/>
                      </div>
                      <div className="small-2 medium-2 large-2 columns">
                      </div>
                   </div>
             <div className="lineSeperator"></div>
                   <div className="row small-12 medium-12 large-12 columns ">
                      <div className=" small-4 medium-4 large-4  columns labelAlignDemographic">
                         <p><span>{_this.state.data.demographic[0].pageContent.lblPlanCategory}: </span><span className="redMandatoryField">*</span></p>
                      </div>
                      <div className="small-6 medium-6 large-6 columns" >
                            <Dropdown drownDownValues={populatePolicyData != undefined ? populatePolicyData : []} onChange={this._onPolicySelected} valuesArray={populatePolicyData} defaultValue="Select Category"/>
                            <div className="row small-12 medium-12 large-12 columns ">
                                <div className="row small-12 medium-12 large-12 columns">
                                 <PolicyTable tabledata={this.state.emptySubPolicy} handlePolicySelect={this.showRidersForPlan}/>
                                </div>
                            </div>
                            <div id="plannotselected" className="row small-12 medium-12 large-12 columns "></div>
                            <div className="row small-12 medium-12 large-12   columns ">
                                  <div className="row small-12 medium-12 large-12  columns " id="medsuptext" >
                                  <div id="anthemExtra">{_this.state.data.demographic[0].pageContent.messages.lblInformationAnthemextrasadditionalbenefitsandRiders}</div>
                                  </div>
                            </div>
                            <br/>
                            <div className="row small-12 medium-12 large-12  columns ">
                               <div className="row small-12 medium-12 large-12 columns extraPlanBackGround extraPlanShow extraPlanAdjust " id="extraPlanSelect">
                                  <span>{_this.state.data.demographic[0].pageContent.messages.lblInformationAddOptionalSupplementalBenefitstotheselectedplan} </span>


                                    <div className="small-11 medium-11 large-11 columns" id="showOtherCheck" >
                                      {checkBoxes}
                                     <p className="extraPlanBackGround extraPlanStyle">{_this.state.data.demographic[0].pageContent.messages.lblInformationadditiontothemonthlyplanpremium}</p>
                                  </div>
                               </div>
                            </div>
                            <br/>
                      </div>
                      <div className="small-2 medium-2 large-2 columns">
                      </div>
                   </div>


               <div className="lineSeperator" id="dividerLine"></div>

                   <div className="row small-12 medium-12 large-12 columns demographicbutton" id="showButtons">
                       <span>
                          <button type="button radius" className="button saveContinueDemographic" id="continueBtn" onClick={this.goBackToDashBoard}>{_this.state.data.demographic[0].pageContent.lblSaveAndContinue}</button>
                          <button type="button" className="saveDraftBtnDemographic radius" onClick={this.navigatingToDashboardByCancel} id="draftBtn">{_this.state.data.demographic[0].pageContent.lblSaveAsDraft}</button>
                          <button type="button" className="cancelAnchorTag radius" onClick={this.navigatingToDashboardByCancel}>{_this.state.data.demographic[0].pageContent.lblCancel}</button>
                      </span>
                  </div>
                </form>
             </div>
          </div>
     </div>
  </div>

		  )
}
	   }

});

function mapStateToProps(state, ownProps){
	return {
		profile : (state.loginReducer.broker == undefined ?
							(state.loginReducer.delegate == undefined ? undefined : state.loginReducer.delegate)
						 : state.loginReducer.broker),
    userDemographicData : state.demographicInfoReducer.userDemographicData,
    brandName : state.selectPlanReducer.brandName,
    policyData : state.selectPlanReducer.planDataObj,
    selectedIndex : state.selectPlanReducer.selectedIndex,
    selectedMonth : state.selectPlanReducer.selectedMonth,
    selectedPolicy : state.selectPlanReducer.selectedPolicy,
    showRiders : state.selectPlanReducer.showRiders
	}
}

function mapDispatchToProps(dispatch){
	return {
			actions : bindActionCreators(selectPlanActions , dispatch)
	}
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(Selectplan);
