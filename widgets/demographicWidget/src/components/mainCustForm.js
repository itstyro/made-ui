//var jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
//var Ajax = require('react-ajax');
var demoJSON=require('../jsons/demographicJSON.json');
var zipJson=require('../jsons/zipCodeJSON.json');
var $=require('jquery');
var moment=require('moment');
var demographicInfoActions = require('./../actions/demographicInfoActions.js');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect;

var utils = require('./../../../common/utils/utils.js');
var constant = require('./../constants/demographicInfoConstants.js');
var appConfig = require('./../../../common/config.js');
var browserHistory = require('react-router').browserHistory;
//var Calendar = require('react-input-calendar').Calendar;
import Calendar from 'react-input-calendar';
import { If, Then, Else } from 'react-if';
import ReactHtmlParser from 'react-html-parser';
var Crouton = require('react-crouton');
var browserHistory = require('react-router').browserHistory;
//import Calendar from './calenderWrapper';

var DemographicWidget = React.createClass({
	getInitialState:function(){
		return {
			data:{},
      countyFetch:{},
      countyIndex:{},
      countyArray:[],
      flagForEmailAddress:false,
      startDate:moment(),
      monthForAppplicationDate:{},
      dayForAppplicationDate:{},
      yearForAppplicationDate:{},
      mandFname:false,
      mandLname:false,
      mandGender:false,
      mandDob:false,
      emailError:false,
      phoneNumberError:false,
      mandAddress:false,
      mandCity:false,
      mandCounty:false,
      zipCodeError:false,
      manAppSigned:false,
			mandFieldCounter:0,
			invalidCounter:0,
			dateOfBirthValue : undefined,
			appSignedValue : undefined,
			dob:''
		}
	},

  componentDidMount:function() {
	var _this = this;
		 if(this.props.profile == undefined){
		 	browserHistory.push('/');
		 }else{
			var demoGraphicPromise = utils.ajaxGet('http://va10n10246.wellpoint.com:9082/cs/ContentServer?c=Portal_C&cid=1439331474347&d=Universal&pagename=brkSecure%2FPortal_C%2FMADE%2FPortal%2FDynamicContent')
      demoGraphicPromise.then(function(cmsContent){
 			 _this.props.actions.initContentSuccess(cmsContent);
 		 });

 		 demoGraphicPromise.error(function(data){
 			 	_this.props.actions.resetAppState();
 			  browserHistory.push('/');
 		 });

		}


  },

navigatingToDashboard:function()
{
	browserHistory.push('/dashboard');
},
	effectiveDateSelected:function(dateSelected)
	{
		var newDate,flag=false;
		var _this=this;
		var todaysDate=moment().format('MM/DD/YYYY');
		if($('#calendardivAppSigned').val()=="")
		{
			document.getElementById('effectiveDateValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageappSignedDateRequired;
			document.getElementById("calendardivAppSigned").style.borderColor = "red";
			document.getElementById('effectiveDateValidation').style.display="inline";
		}
	},

dateOfBirthSel:function(dateSelected)
{
	var newDate;
	var _this=this;
	var todaysDate=moment().format('MM/DD/YYYY');

	if($('#calendardiv').val()=="")
	{
		document.getElementById('dobValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagedobRequired;
		document.getElementById("calendardiv").style.borderColor = "red";
		document.getElementById('dobValidation').style.display="inline";
	}

},
  populateCounty:function(event){
    event.preventDefault();
    var _this=this;
		var mainRespData;
    var data = $('#custZipCode').val();
		var appSignedValue = $('#calendardivAppSigned').val();
		var dateOfBirthValue= $('#calendardiv').val();

		document.getElementById('stateAppend').textContent="";
		document.getElementById('custCounty').textContent="";
		//document.getElementById('custMultiCounty').textContent="";
		document.getElementById('countyValidation').style.display="none";
    _this.mandCounty=false;

    if(($('#custZipCode').val())!="")
    {
      document.getElementById('zipCodeValidation').style.display="none";
      document.getElementById("custZipCode").style.borderColor = "lightgrey";

    }

    if(($('#custZipCode').val()==""))
    {
      document.getElementById('zipCodeValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagezipCodeRequired;
      _this.zipCodeError=true;
			document.getElementById('zipCodeValidation').style.display="inline";
      document.getElementById("custZipCode").style.borderColor = "red";



    }
    else if($('#custZipCode').val().length<5)
    {
      document.getElementById('zipCodeValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblInformationinvalidZipCode;
      _this.zipCodeError=true;
			document.getElementById('zipCodeValidation').style.display="inline";
			document.getElementById("custZipCode").style.borderColor = "red";
				_this.setState({countyList :'',mandFieldCounter:0 ,invalidCounter:0,appSignedValue : appSignedValue ,dateOfBirthValue : dateOfBirthValue});

    }
		else
    {
			var i = 0, option;
			var jsonData;
			debugger;
			var url = '/api/getZipCode?zipCode='+$('#custZipCode').val();
			utils.ajaxGetNoJsonp(url).then(function(response){
						console.log(response);
						jsonData = JSON.parse(response);
						mainRespData=jsonData;
						if(!jsonData || jsonData.responseMessage.status!='SUCCESSFUL')
						{
							document.getElementById('zipCodeValidation').textContent = "Service not reachable";
							document.getElementById('zipCodeValidation').style.display="inline";
								document.getElementById('zipCodeValidation').style.display="inline";
							_this.zipCodeError=true;
							document.getElementById('zipCodeValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblInformationnoPlansForCountry
							_this.validateFlag=_this.validateFlag+1;
						}else{
							document.getElementById('stateAppend').textContent = jsonData.zipCode.stateCode;
							_this.zipCodeError=false;

							var div = document.getElementById('custCounty');
								while(div.firstChild)
								{
									div.removeChild(div.firstChild);
								}

								if(jsonData.zipCode.countyList.length==1)
								{
									document.getElementById('custCounty').textContent = jsonData.zipCode.countyList[0].countyName;
									document.getElementById('countyValidation').style.display="none";
									document.getElementById("custCounty").value = this.countyFetch;
								}
								_this.setState({countyList : jsonData.zipCode.countyList ,mandFieldCounter:0 ,appSignedValue : appSignedValue ,dateOfBirthValue : dateOfBirthValue});

						}
      });
    }
  },

maxlengthValidationForApp:function(event)
{
	var _this=this;
	var number=/^[0-9/]+$/;
	document.getElementById("calendardivAppSigned").style.borderColor = "lightgrey";
	document.getElementById('effectiveDateValidation').style.display="none";

	_this.manAppSigned =  false;
	//event.preventDefault();
	if(event=="Invalid date")
	{
		document.getElementById('effectiveDateValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageAppSignedOnDateInvalid;
		document.getElementById("calendardivAppSigned").style.borderColor = "red";
		document.getElementById('effectiveDateValidation').style.display="inline";


		console.log('Invalid date');
		console.log(event);
	}
	if(($('#calendardivAppSigned').val().match(number))&&($('#calendardivAppSigned').val()!=""))
	{
		var dateSel=$('#calendardivAppSigned').val();
		var todaysDate=moment().format('MM/DD/YYYY');

		 if ((moment(dateSel).isAfter(todaysDate) == false)&&(moment(dateSel,'MM/DD/YYYY').isValid()==true))
		{
			document.getElementById("calendardivAppSigned").style.borderColor = "lightgrey";
			document.getElementById('effectiveDateValidation').style.display="none";

			_this.manAppSigned =  false;
		}
		else
		{
			document.getElementById('effectiveDateValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageAppSignedOnDateInvalid;
			document.getElementById("calendardivAppSigned").style.borderColor = "red";

			document.getElementById('effectiveDateValidation').style.display="inline";

			_this.manAppSigned=true;
		}
	}
},

  maxlengthValidation:function(event)
  {
		var _this=this;
		//event.preventDefault();
//		console.log('----',event.target);
document.getElementById("calendardiv").style.borderColor = "lightgrey";
document.getElementById('dobValidation').style.display="none";
_this.manAppSigned=false;
document.getElementById('countyValidation').style.display="none";
_this.mandCounty=false;
		if(event=="Invalid date")
		{
			document.getElementById('dobValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageDOBInvalid;
			document.getElementById("calendardiv").style.borderColor = "red";
			document.getElementById('dobValidation').style.display="inline";

			console.log('Invalid date');
			console.log(event);
		}

    var letters = /^[A-Za-z' -]+$/;
    var number=/^[0-9/]+$/;

    if(($('#custFname').val().match(letters))&&($('#custFname').val().trim().length<=12))
        {
          document.getElementById('fnameValidation').style.display="none";
          document.getElementById('custFname').textContent=($('#custFname').val());
          document.getElementById("custFname").style.borderColor = "lightgrey";

        }
      else
    {
			if($('#custFname').val().trim()!="")
			{
				document.getElementById('fnameValidation').style.display="none";
	      $('#custFname').val($('#custFname').val().substr(0,($('#custFname').val().length-1)));
	      document.getElementById("custFname").style.borderColor = "lightgrey";
			}
    }

    if(($('#custLastName').val().match(letters))&&($('#custLastName').val().trim().length<=16))
    {
      document.getElementById('lastNameValidation').style.display="none";
      document.getElementById('custLastName').textContent=($('#custLastName').val());
      document.getElementById("custLastName").style.borderColor = "lightgrey";

    }
    else
    {
			if($('#custLastName').val().trim()!="")
			{
				document.getElementById('lastNameValidation').style.display="none";
	      $('#custLastName').val($('#custLastName').val().substr(0,($('#custLastName').val().length-1)));
	      document.getElementById("custLastName").style.borderColor = "lightgrey";
			}
    }

    if(($('#calendardiv').val().match(number))&&($('#calendardiv').val()!=""))
    {
			var dateSel=$('#calendardiv').val();
		//	this.setState({dob:dateSel});
			var todaysDate=moment().format('MM/DD/YYYY');

			 if ((moment(dateSel).isAfter(todaysDate) == false)&&(moment(dateSel,'MM/DD/YYYY').isValid()==true))
			{
				document.getElementById("calendardiv").style.borderColor = "lightgrey";
				document.getElementById('dobValidation').style.display="none";

			}
			else
			{
				document.getElementById('dobValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageDOBInvalid;
				document.getElementById("calendardiv").style.borderColor = "red";
				document.getElementById('dobValidation').style.display="inline";

				_this.manAppSigned=true;
			}
    }




		if($('#custMailAddress').val().trim().length<=50)
				{
					document.getElementById('mailAddressValidation').style.display="none";
					document.getElementById('custMailAddress').textContent=($('#custMailAddress').val());
					document.getElementById("custMailAddress").style.borderColor = "lightgrey";

				}
			else
		{
			document.getElementById('mailAddressValidation').style.display="none";
			$('#custMailAddress').val($('#custMailAddress').val().substr(0,($('#custMailAddress').val().length-1)));
			document.getElementById("custMailAddress").style.borderColor = "lightgrey";


		}

		if($('#custAddress2').val().length>25)
				{
					$('#custAddress2').val($('#custAddress2').val().substr(0,($('#custAddress2').val().length-1)));
		}
    //else
  //  {custMailAddress
    //  $('#calendardiv').val($('#calendardiv').val().substr(0,($('#calendardiv').val().length-1)));
  //  }


    if(($('#custAddress1').val())!="")
    {
      document.getElementById('AddressValidation').style.display="none";
      document.getElementById("custAddress1").style.borderColor = "lightgrey";

    }

   /* if(($('#custEffectiveDate').val())!="")
    {
      document.getElementById('dobValidation').style.display="none";
      document.getElementById("custEffectiveDate").style.borderColor = "lightgrey";
    }*/
		var cityRegex=/^[A-Za-z ]+$/;
		if(($('#custCity').val().match(cityRegex))&&($('#custCity').val().trim().length<=25))
				{
					document.getElementById('cityValidation').style.display="none";
					document.getElementById('custCity').textContent=($('#custCity').val());
					document.getElementById("custCity").style.borderColor = "lightgrey";

				}
			else
		{
			if($('#custCity').val().trim()!="")
			{
				document.getElementById('cityValidation').style.display="none";
				$('#custCity').val($('#custCity').val().substr(0,($('#custCity').val().length-1)));
				document.getElementById("custCity").style.borderColor = "lightgrey";
			}
		}

		var onlyNumberRegex=/^[0-9]+$/;
		if($('#custZipCode').val().match(onlyNumberRegex))
				{
				//	document.getElementById('stateAppend').textContent="";
				//	document.getElementById('custCounty').textContent="";
					document.getElementById('zipCodeValidation').style.display="none";
					document.getElementById('custZipCode').textContent=($('#custZipCode').val());
					document.getElementById("custZipCode").style.borderColor = "lightgrey";

				}
			else
		{
			if($('#custZipCode').val()!="")
			{
				document.getElementById('zipCodeValidation').style.display="none";
				$('#custZipCode').val($('#custZipCode').val().substr(0,($('#custZipCode').val().length-1)));
				document.getElementById("custZipCode").style.borderColor = "lightgrey";
			}
		}


    if($('input[name=radioName]:checked').length > 0)
    {
      document.getElementById('genderValidation').style.display="none";

    }
		if($('input[name=countySelectedRadio]:checked').length > 0)

        {

            document.getElementById('countyValidation').style.display="none";
        }
     if($('#custFname').val().length>12)
        {
          document.getElementById('fnameValidation').style.display="none";
          document.getElementById("custFname").style.borderColor = "lightgrey";
          $('#custFname').val($('#custFname').val().substr(0,12));

        }
    else if($('#custLastName').val().length>16)
        {
          document.getElementById('lastNameValidation').style.display="none";
          document.getElementById("custLastName").style.borderColor = "lightgrey";
          $('#custLastName').val($('#custLastName').val().substr(0,16));
        }
    else if($('#custAddress1').val().length>25)
        {
          document.getElementById('AddressValidation').style.display="none";
          document.getElementById("custAddress1").style.borderColor = "lightgrey";
          $('#custAddress1').val($('#custAddress1').val().substr(0,25));
        }
    else if($('#custCity').val().length>25)
        {
          document.getElementById('cityValidation').style.display="none";
          document.getElementById("custCity").style.borderColor = "lightgrey";
          $('#custCity').val($('#custCity').val().substr(0,25));
        }
    else if($('#custZipCode').val().length>5)
    {
      document.getElementById('zipCodeValidation').style.display="none";
      $('#custZipCode').val($('#custZipCode').val().substr(0,5));
    }

  },
	focusForPhoneNumber1:function()
	{
		var _this=this;
		var numberValidation=/^[0-9]+$/;

		if($('#custPhoneNumber').val().match(numberValidation))
			{
				document.getElementById('custPhoneNumber').textContent=($('#custPhoneNumber').val());
				document.getElementById("custPhoneNumber").style.borderColor = "lightgrey";

				if($('#custPhoneNumber').val().length==3)
				{
					_this.phoneNumberError=false;
					$('#custPhoneNumber1').focus();
				}
				if($('#custPhoneNumber').val().length>3)
				{
					$('#custPhoneNumber').val($('#custPhoneNumber').val().substr(0,($('#custPhoneNumber').val().length-1)));
				}
			}
			else
			{
				$('#custPhoneNumber').val($('#custPhoneNumber').val().substr(0,($('#custPhoneNumber').val().length-1)));

			}
	},
	focusForPhoneNumber2:function()
	{
		var _this=this;
		var numberValidation=/^[0-9]+$/;

		if($('#custPhoneNumber1').val().match(numberValidation))
			{
				document.getElementById('custPhoneNumber1').textContent=($('#custPhoneNumber1').val());
				document.getElementById("custPhoneNumber1").style.borderColor = "lightgrey";

				if($('#custPhoneNumber1').val().length==3)
				{
					_this.phoneNumberError=false;
					$('#custPhoneNumber2').focus();
				}
				if($('#custPhoneNumber1').val().length>3)
				{
					$('#custPhoneNumber1').val($('#custPhoneNumber1').val().substr(0,($('#custPhoneNumber1').val().length-1)));
				}
			}
			else
			{
				$('#custPhoneNumber1').val($('#custPhoneNumber1').val().substr(0,($('#custPhoneNumber1').val().length-1)));

			}
	},
	onBlurPhoneNumber:function()
	{
		var _this=this;
	if(($('#custPhoneNumber').val().length<3)&&($('#custPhoneNumber').val()!=""))
	{
		document.getElementById('phNumberValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagePhoneNoInvalid;
		_this.phoneNumberError=true;
		document.getElementById("custPhoneNumber").style.borderColor = "red";
		document.getElementById('phNumberValidation').style.display="inline";
	}
	else {
		document.getElementById("custPhoneNumber").style.borderColor = "lightgrey";
	_this.phoneNumberError=false;
		document.getElementById('phNumberValidation').style.display="none";
	}
	},
	onBlurPhoneNumber1:function()
	{
		var _this=this;
	if(($('#custPhoneNumber1').val().length<3)&&($('#custPhoneNumber1').val()!=""))
	{
		document.getElementById('phNumberValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagePhoneNoInvalid;
		_this.phoneNumberError=true;
		document.getElementById("custPhoneNumber1").style.borderColor = "red";
		document.getElementById('phNumberValidation').style.display="inline";
	}
	else {
		document.getElementById("custPhoneNumber1").style.borderColor = "lightgrey";
	_this.phoneNumberError=false;
		document.getElementById('phNumberValidation').style.display="none";
	}
	},
	onBlurPhoneNumber2:function()
	{
		var _this=this;
	if(($('#custPhoneNumber2').val().length<4)&&($('#custPhoneNumber2').val()!=""))
	{
		document.getElementById('phNumberValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagePhoneNoInvalid;
		_this.phoneNumberError=true;

		document.getElementById("custPhoneNumber2").style.borderColor = "red";
		document.getElementById('phNumberValidation').style.display="inline";
	}
	else {
		document.getElementById("custPhoneNumber2").style.borderColor = "lightgrey";
		document.getElementById('phNumberValidation').style.display="none";
		_this.phoneNumberError=false;
	}
	},

	focusForPhoneNumber3:function()
	{
		var _this=this;
		var numberValidation=/^[0-9]+$/;

		if($('#custPhoneNumber2').val().match(numberValidation))
			{
				document.getElementById('custPhoneNumber2').textContent=($('#custPhoneNumber2').val());
				document.getElementById("custPhoneNumber2").style.borderColor = "lightgrey";

				if($('#custPhoneNumber2').val().length==4)
				{
					_this.phoneNumberError=false;
					$('#custPhoneNumber2').blur();
				}
				if($('#custPhoneNumber2').val().length>4)
				{
					$('#custPhoneNumber2').val($('#custPhoneNumber2').val().substr(0,($('#custPhoneNumber2').val().length-1)));
				}
			}
			else
			{
				$('#custPhoneNumber2').val($('#custPhoneNumber2').val().substr(0,($('#custPhoneNumber2').val().length-1)));
			}
	},

onBlurMainValidationcustCity:function(event)
{
	event.preventDefault();
	var _this = this;
	if ($('#custCity').val().trim() == "") {
		document.getElementById('cityValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagecityRequired;
		_this.mandCity=true;
		document.getElementById("custCity").style.borderColor = "red";
		document.getElementById('cityValidation').style.display="inline";

	}else{
		_this.mandCity=false;
	}
},
onBlurMainValidationcustFname:function(event)
{
event.preventDefault();
var _this = this;

if ($('#custFname').val().trim() == "")
{
	document.getElementById('fnameValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagefirstNameRequired;
	document.getElementById("custFname").style.borderColor = "red";
	document.getElementById('fnameValidation').style.display="inline";

	_this.mandFname = true;
}else{
	_this.mandFname = false;
}
},

onBlurMainValidationcustLastName:function(event)
{
	event.preventDefault();
	var _this = this;
	if ($('#custLastName').val().trim() == "") {
 	console.log(_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagelastNameRequired);
 	document.getElementById('lastNameValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagelastNameRequired;
 	document.getElementById('lastNameValidation').style.display="inline";
 	document.getElementById("custLastName").style.borderColor = "red";
 	_this.mandLname = true;


 }else{
 		_this.mandLname = false;
 }
},

onBlurMainValidationRadioSelected:function(event)
{
	event.preventDefault();
	var _this = this;
	if ($('input[name=radioName]:checked').length<=0) {
 	document.getElementById('genderValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagegenderRequired;
 	document.getElementById('genderValidation').style.display="inline";
 	_this.mandGender = true;
	}
	else{
		_this.mandGender = false;
	}
},

onBlurMainValidationcustAddress1:function(event)
{
	event.preventDefault();
	var _this = this;
 if ($('#custAddress1').val().trim() == "") {
	document.getElementById('AddressValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageaddress1Required;
	_this.mandAddress=true;
	document.getElementById("custAddress1").style.borderColor = "red";
	document.getElementById('AddressValidation').style.display="inline";

}else{
	_this.mandAddress=false;
}
},

  mandatoryValidation:function(event)
	{
    event.preventDefault();
    var _this = this;
		var counter=0,invalid=0;
		var elementId = event.target.id;
		var appSignedValue = $('#calendardivAppSigned').val();
		var dateOfBirthValue= $('#calendardiv').val();
		if ($('#custFname').val().trim() == "") {

      document.getElementById('fnameValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagefirstNameRequired;
      document.getElementById("custFname").style.borderColor = "red";
			document.getElementById('fnameValidation').style.display="inline";
      _this.mandFname = true;
			counter=counter+1;

    }else{
			_this.mandFname = false;
		}
     if ($('#custLastName').val().trim() == "") {
      console.log(_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagelastNameRequired);
      document.getElementById('lastNameValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagelastNameRequired;
			document.getElementById('lastNameValidation').style.display="inline";
			document.getElementById("custLastName").style.borderColor = "red";
      _this.mandLname = true;
			counter=counter+1;

    }else{
			_this.mandLname = false;

		}
     if ($('input[name=radioName]:checked').length <= 0) {
      document.getElementById('genderValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagegenderRequired;

      _this.mandGender = true;
			counter=counter+1;

    }else{
				_this.mandGender = false;
		}
		 if($('#calendardiv').val()=="")
		{
			console.log(_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagedobRequired);
			document.getElementById('dobValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagedobRequired;
			document.getElementById('dobValidation').style.display="inline";
			document.getElementById("calendardiv").style.borderColor = "red";
			_this.mandDob = true;
			counter=counter+1;

		}else{
			_this.mandDob = false;
		}
		if ($('#custAddress1').val().trim() == "") {
			document.getElementById('AddressValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageaddress1Required;
			_this.mandAddress=true;
			document.getElementById("custAddress1").style.borderColor = "red";
			document.getElementById('AddressValidation').style.display="inline";
			counter=counter+1;

		}else{
			_this.mandAddress=false;

		}
		if ($('#custCity').val().trim() == "") {
			document.getElementById('cityValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagecityRequired;
			_this.mandCity=true;
			document.getElementById("custCity").style.borderColor = "red";
			document.getElementById('cityValidation').style.display="inline";
			counter=counter+1;
		}else{
			_this.mandCity =  false;
		}

		if ($('#custZipCode').val().trim() == "")
		{
			document.getElementById('zipCodeValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagezipCodeRequired;
			_this.zipCodeError=true;
			document.getElementById("custZipCode").style.borderColor = "red";
			document.getElementById('zipCodeValidation').style.display="inline";
			counter=counter+1;
		}

		if($('#calendardivAppSigned').val()=="")
		{
			document.getElementById('effectiveDateValidation').textContent = _this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageappSignedDateRequired;
			document.getElementById('effectiveDateValidation').style.display="inline";
			document.getElementById("calendardivAppSigned").style.borderColor = "red";
			_this.manAppSigned = true;
			counter=counter+1;

		}

		var number=/^[0-9/]+$/;
		if($('#calendardiv').val()!="")
		{
			if($('#calendardiv').val().trim()=="Invalid date")
			{
				invalid=invalid+1;
			}
			if(($('#calendardiv').val().match(number))&&($('#calendardiv').val()!=""))
			{
				var dateSel=$('#calendardiv').val();
				var todaysDate=moment().format('MM/DD/YYYY');

				 if ((moment(dateSel).isAfter(todaysDate) == true)&&(moment(dateSel,'MM/DD/YYYY').isValid()==false))
				{
					invalid=invalid+1;
				}
			}
		}

		if($('#calendardivAppSigned').val()!="")
		{
			if($('#calendardivAppSigned').val().trim()=="Invalid date")
			{
				invalid=invalid+1;
			}
			if(($('#calendardivAppSigned').val().match(number))&&($('#calendardivAppSigned').val()!=""))
			{
				var dateSel=$('#calendardivAppSigned').val();
				var todaysDate=moment().format('MM/DD/YYYY');

				 if ((moment(dateSel).isAfter(todaysDate) == true)&&(moment(dateSel,'MM/DD/YYYY').isValid()==false))
				{
					invalid=invalid+1;
				}
			}
		}

		if (($('#custZipCode').val().trim() != "")&&($('#custZipCode').val().length<5))
		{
			invalid=invalid+1;
		}
		var mail=false,phNo=false;

		if($('#custMailAddress').val().trim()!="")
		{
			var mailId=$('#custMailAddress').val().trim();
			var atpos = mailId.indexOf("@");
			var dotpos = mailId.lastIndexOf(".");
			if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mailId.length)
			{
				document.getElementById('mailAddressValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageemailInvalid;
				_this.emailError=true;
				document.getElementById("custMailAddress").style.borderColor = "red";
				document.getElementById('mailAddressValidation').style.display="inline";
				mail=true;
				invalid=invalid+1;
			}
			else {
				_this.emailError=false;
				mail=false;
			}
		}

		if((($('#custPhoneNumber').val()!="")&&($('#custPhoneNumber').val().length!=3))||(($('#custPhoneNumber1').val()!="")&&($('#custPhoneNumber1').val().length!=3))||((($('#custPhoneNumber2').val()!="")&&($('#custPhoneNumber2').val().length!=4))))
	 {
		 invalid=invalid+1;
	 }

		_this.setState({mandFieldCounter:counter , invalidCounter:invalid, appSignedValue :appSignedValue , dateOfBirthValue : dateOfBirthValue});


			if(($('input[name=countySelectedRadio]:checked').length!=0)||(this.state.countyList.length==1))
			            {
			if(elementId=="continueBtn" && counter == 0 && invalid==0 &&
				(_this.mandFname ==false)&&(_this.mandLname == false)&&
					(_this.mandGender ==false)&&(_this.mandDob == false)&&
						(_this.mandAddress==false)&&(_this.mandCity == false)&&
							(_this.zipCodeError==false)&&(_this.manAppSigned==false)&&
							 (_this.phoneNumberError==false || _this.phoneNumberError== undefined)&&
								(mail==false)&&(_this.emailError==false || _this.emailError== undefined))
			{
				var references = this.refs;
				var year=document.getElementById('calendardiv').value.substr(6,8);
				var date=document.getElementById('calendardiv').value.substr(3,2);
				var month=document.getElementById('calendardiv').value.substr(0,2);
				var userData = {
					custCity :  references.custCity.value.trim(),
					zipCode : references.custZipCode.value.trim(),
					stateCode : document.getElementById('stateAppend').textContent,
					gender : references.gender.value,
					countyName : (this.state.countyList.length > 1 ? references.countyName.value : this.state.countyList[0].countyName),
          dob:year.concat('-').concat(month).concat('-').concat(date)


				}
				this.props.actions.saveDataInState(userData);
				browserHistory.push('selectplan')
			}
		}
		 else
		 {
			 if(($('#custZipCode').val().trim().length==5)&&(this.state.countyList.length!=0))
			 {
				 document.getElementById('countyValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageCountyRequired;
				 _this.mandCounty=true;
				 document.getElementById('countyValidation').style.display="inline";
			 }
			 if((($('#custPhoneNumber').val()!="")&&($('#custPhoneNumber').val().length!=3))||(($('#custPhoneNumber1').val()!="")&&($('#custPhoneNumber1').val().length!=3))||((($('#custPhoneNumber2').val()!="")&&($('#custPhoneNumber2').val().length!=4))))
			{
				document.getElementById('phNumberValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagePhoneNoInvalid;
				_this.phoneNumberError=true;
				document.getElementById('phNumberValidation').style.display="inline";
			}
		 }
			if(counter==0 && invalid==0 && (_this.emailError==false || _this.emailError== undefined) && elementId == "draftBtn")
			{
				console.log("save draft clicked");
				browserHistory.push('dashboard');
			}

  },

    emailValidation:function()
		{
      var _this = this;
      var validateFlag = false;
			if($('#custMailAddress').val().trim()!="")
			{
				var mailId=$('#custMailAddress').val().trim();
				var atpos = mailId.indexOf("@");
				var dotpos = mailId.lastIndexOf(".");
				if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mailId.length)
				{
					document.getElementById('mailAddressValidation').textContent=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessageemailInvalid;
					_this.emailError=true;
					document.getElementById("custMailAddress").style.borderColor = "red";
					document.getElementById('mailAddressValidation').style.display="inline";
					validateFlag=true;
				}else{
					_this.emailError=false;
				}
			}

    },


	componentDidUpdate : function(){
		if($("#calendardiv").val().length > 0) {
			$("#calendardiv").val("");
		}
		if(this.state.appSignedValue != undefined){
				$('#calendardivAppSigned').val(this.state.appSignedValue);
		}
		if(this.state.dateOfBirthValue != undefined){
				$('#calendardiv').val(this.state.dateOfBirthValue);
		}

	},

	render: function() {
      var _this=this;
			console.log('****',_this.state.mandFieldCounter);
			var data = {
			type: 'error',
			message:'',
			onDismiss:false,
			timeout:2000000,
			butons:
			[{name:'X'}]
			};

			if(this.props.widgetContent == undefined){
	        return null;
				}
	      else
	      {
					data.message=_this.props.widgetContent.demographic[0].pageContent.messages.lblErrorMessagesummaryErrorMsg;
					data.message=data.message.replace('$mandatoryCount$', _this.state.mandFieldCounter).replace('$invalidCount$',_this.state.invalidCounter);
					var countyRadio;

					if(this.state.countyList != undefined && this.state.countyList.length > 1){
						countyRadio =_this.state.countyList.map(function (field, i) {

									return(
										<div className="row">
									  <input type="radio" name="countySelectedRadio" key={field.countyName} ref="countyName"
										value={field.countyName}/>
										<label>{field.countyName}
										</label>
										</div>
										);
					});

			}

			return (
				<div>
				<If condition={this.state.mandFieldCounter >0 || this.state.invalidCounter>0 }>
							<Then>
								<div id="croutonHeaderId" className="row small-12 medium-12 large-12 columns croutonHeader">
								<Crouton id={Date.now()} message={ReactHtmlParser(data.message)} type={data.type} buttons={data.butons} timeout={data.timeout} title={data.title} />
								</div>
							</Then>
					</If>

				<div className="row small-12 medium-12 large-12 columns headerComponent desktopView">

				<span><img src="/images/demographicWidget/src/images/profile_active.png" /></span>
				 <span className="mainHeaderTextDemo">{_this.props.widgetContent.demographic[0].pageContent.lblCustomerInformation}</span>
				 <span><span className="mainHeaderLine"></span></span>
				 <span><img src="/images/demographicWidget/src/images/plan_inactive.png" /></span>
				 <span className="mainHeaderTextDemo1 ">{_this.props.widgetContent.demographic[0].pageContent.lblSelectPlan}</span>
				 <span><span className="mainHeaderLine"></span></span>
				 <span><img src="/images/demographicWidget/src/images/pdf_inactive.png" /></span>
				 <span className="mainHeaderTextDemo1">{_this.props.widgetContent.demographic[0].pageContent.lblFormData}</span>
			</div>


			<div className="row small-12  smartView">

				<div className="firstDiv">
					<div className="firstDiv2"><img src="/images/demographicWidget/src/images/profile_active.png"/></div>
					<div className="firstDiv1">{_this.props.widgetContent.demographic[0].pageContent.lblCustomerInformation}</div>
				</div>

			<div><div className="secondDiv" />&nbsp;</div>
			<div className="secondDiv1">
				<div><img src="/images/demographicWidget/src/images/plan_inactive.png"/></div>
				<div className="secondDiv2">{_this.props.widgetContent.demographic[0].pageContent.lblSelectPlan}</div>
			</div>

		<div><div className="thirdDiv">&nbsp;</div></div>
		<div className="thirdDiv1">
			<div><img src="/images/demographicWidget/src/images/pdf_inactive.png"/></div>
			<div className="thirdDiv2">{_this.props.widgetContent.demographic[0].pageContent.lblFormData}</div>
		</div>

		</div>

      <div className="row small-12 medium-12 large-12 columns bodybg">
      <div className="row small-12 medium-12 large-12 columns mainFormDemoInfoPage" >
      <div className="AgentInfo">
        <form className="customerInformationValidation">

          <div className="mainHeaderAlignDemographic">

          </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblFirstName} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns">
          <input type="text" id="custFname" ref="custFname" className="textboxDimention" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationcustFname}/>
        <span>  <p className="redMandatoryFieldValidation" id="fnameValidation" visible={_this.mandFname}></p></span>
        </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblLastName} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns">
          <input type="text"  id="custLastName" ref="custLastName" className="textboxDimention" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationcustLastName}/>
          <p className="redMandatoryFieldValidation" id="lastNameValidation" visible={_this.mandLname}></p>
        </div>
        <div className="small-12 medium-2 large-2 columns">
        </div>
      </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblGender} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns radiotxt">
        	<span className="small-12 medium-6 large-6 columns">
          <input type="radio" name="radioName" value="male" id="male" ref="gender" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationRadioSelected}/> <label className="radiotxt"> Male</label>
            </span>

            <span  className='small-12 medium-6 large-6 columns radioFem'>
          <input type="radio" name="radioName" value="female" id="female" ref="gender" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationRadioSelected}/> <label> Female</label>
            </span>
          <span className="redMandatoryFieldValidation" id="genderValidation" visible={_this.mandGender}></span>
        </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
        </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblDateOfBirth} : </span><span className="redMandatoryField">*</span></p>
        </div>
            <div className="small-12 medium-6 large-6 columns">
						<Calendar date={moment().subtract("years", 65)}  format='MM/DD/YYYY' maxDate={moment()}
									onChange={_this.maxlengthValidation} placeholder="MM/DD/YYYY"
									onBlur={_this.dateOfBirthSel} strictDateParsing='true'
									inputFieldId='calendardiv' key="calendardiv"/>
              <div><p className="redMandatoryFieldValidationDate" id="dobValidation" visible={_this.mandDob}></p></div>
            </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
         <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblEmailAddress} : </span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns ">
          <input type="email" id="custMailAddress" className="textboxDimention" onChange={_this.maxlengthValidation} onBlur={_this.emailValidation} />
          <p className="redMandatoryFieldValidation" id="mailAddressValidation" visible={_this.emailError}></p>
        </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>

      <div className="row small-12 medium-12 large-12 columns">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
           <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblPhoneNumber} : </span></p>
        </div>
          <div className="small-3 medium-1 large-2 columns numtxt numberFirst">
            <input type="text"  id="custPhoneNumber" ref="custPhoneNumber" onChange={_this.focusForPhoneNumber1} onBlur={_this.onBlurPhoneNumber}/>
          </div>
          <div className="small-3 medium-1 large-2 columns numtxt numberSecond">
             <input type="text"  id="custPhoneNumber1" ref="custPhoneNumber1" onChange={_this.focusForPhoneNumber2} onBlur={_this.onBlurPhoneNumber1}/>
          </div>
          <div className="small-3 medium-1 large-2 columns numtxt numberSecond">
           <input type="text"  id="custPhoneNumber2" ref="custPhoneNumber2" onChange={_this.focusForPhoneNumber3} onBlur={_this.onBlurPhoneNumber2}/>
          </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>

      </div>
  		<div className="phnNumErrorMsg"><p  id="phNumberValidation" visible={_this.phoneNumberError}></p></div>
      <div className="HeaderAlignDemographic">


         <div className="row small-12 medium-12 large-12 columns bottomdist">
              <img src="/images/demographicWidget/src/images/u61_line.png" className="headingImage" /><br/>
         </div>

      </div>

      <div className="row small-12 medium-12 large-12 columns ">
        <div className=" small-12 medium-2 large-2  columns labelAlignDemographic">
           <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblAddress} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns ">
          <input type="text" id="custAddress1" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationcustAddress1} className="textboxDimention" ref="custAddress1"/>
          <p className="redMandatoryFieldValidation" id="AddressValidation" visible={_this.mandAddress}></p>
        </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>

      <div className="row small-12 medium-12 large-12 columns ">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
           <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblAddress2} :</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns ">
          <input type="text" id="custAddress2" ref="custAddress1"className="textboxDimention" onChange={_this.maxlengthValidation}/>
        </div>
        <div className="small-6 medium-6 large-6 columns">
        </div>
      </div>

      <div className=" row small-12 medium-12 large-12 columns ">
        <div className="small-12 medium-2 large-2  columns labelAlignDemographic">
           <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblAgentCity} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-6 large-6 columns ">
          <input type="text"  id="custCity" onChange={_this.maxlengthValidation} onBlur={_this.onBlurMainValidationcustCity} className="textboxDimention"  ref="custCity"/>
          <p className="redMandatoryFieldValidation" id="cityValidation" visible={_this.mandCity}></p>
        </div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>

      <div className=" row small-12 medium-12 large-12 columns ">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{demoJSON.DemographicInfo[0].pageContent.lblZipCodePrimary} : </span><span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-12 medium-2 large-3 columns ">
          <input type="text" id="custZipCode" onBlur ={this.populateCounty} className="textboxDimention" ref="custZipCode" onChange={_this.maxlengthValidation}/>
      </div>
         <div className="small-12 medium-2 large-2 columns stateAlign labelAlignDemographic">
          <p className=""><span>{_this.props.widgetContent.demographic[0].pageContent.lblAgentState} : </span><span  className="stateValue" id="stateAppend">&nbsp;</span></p>
        </div>
      </div>
			<div class="row small-6 medium-6 large-6 small-offset-6 medium-offset-6 large-offset-6 ">
							<p className="redMandatoryFieldValidationZip" id="zipCodeValidation" visible={_this.zipCodeError}></p>
						</div>

      <div className=" row small-12 medium-12 large-12 columns ">
        <div className="small-12 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels"><span>{_this.props.widgetContent.demographic[0].pageContent.lblCounty} : </span></p>
        </div>
        <div className="small-12 medium-4 large-4 columns countrytxt" >
				<div  id="custCounty">
        </div>
				<div id="custMultiCounty" onChange={_this.maxlengthValidation}>
					{countyRadio}
				</div>
				<p className="redMandatoryFieldValidationCounty" id="countyValidation" visible={_this.mandCounty}></p>
				</div>
        <div className="small-4 medium-4 large-4 columns">
        </div>
      </div>

          <div className="HeaderAlignDemographic">
            <div className="row small-12 medium-12 large-12 columns">
              <img src="/images/demographicWidget/src/images/u61_line.png" className="headingImage" /><br/>
            </div>
          </div>


      <div className=" row small-12 medium-12 large-12 columns ">
        <div className="small-11 medium-2 large-2 columns labelAlignDemographic">
          <p className="labels">{_this.props.widgetContent.demographic[0].pageContent.lblAppSignedByCust}  <span className="redMandatoryField">*</span></p>
        </div>
        <div className="small-6 medium-6 large-6 columns">
				<Calendar format='MM/DD/YYYY' maxDate={moment()}
				 					onChange={_this.maxlengthValidationForApp} placeholder="MM/DD/YYYY"
									onBlur={_this.effectiveDateSelected} strictDateParsing='true'
									inputFieldId='calendardivAppSigned' key="calendardivAppSigned"/>
				</div>
        <div className="small-2 medium-2 large-2 columns">
        </div>
      </div>
			<div class="row small-6 medium-6 large-6 small-offset-6 medium-offset-6 large-offset-6 ">
				<p className="redMandatoryFieldValidationDateApp" id="effectiveDateValidation" visible={_this.manAppSigned}></p>
			</div>

          <div className="row small-12 medium-12 large-12 columns bottomLine">
            <img src="/images/demographicWidget/src/images/u61_line.png" className="headingImageBlue" /><br/>
          </div>

      <div className="row small-12 medium-12 large-12 columns demographicbutton">
          <span>

			<button type="button radius" onClick={this.mandatoryValidation} className="button saveContinueDemographic" id="continueBtn">{_this.props.widgetContent.demographic[0].pageContent.lblSaveAndContinue}</button>
             <button type="button" className="button radius saveDraftBtnDemographic" onClick={this.mandatoryValidation} id="draftBtn">{_this.props.widgetContent.demographic[0].pageContent.lblSaveAsDraft}</button>

             <button type="button" className="cancelAnchorTag radius" onClick={this.navigatingToDashboard}>{this.props.widgetContent.demographic[0].pageContent.lblCancel}</button>

          </span>
        </div>
     </form>
    </div>
    </div>
   </div>
	 </div>
		  );

    }
    }
});


function mapStateToProps(state, ownProps){
	return {
		widgetContent : state.demographicInfoReducer.widgetContent,
		profile : (state.loginReducer.broker == undefined ?
							(state.loginReducer.delegate == undefined ? undefined : state.loginReducer.delegate)
						 : state.loginReducer.broker)
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions : bindActionCreators(demographicInfoActions , dispatch)
	}
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(DemographicWidget);
//var dom = document.getElementById('demographicWidget');

//ReactDOM.render(<DemographicWidget />, document.getElementById('demographicWidget'));
