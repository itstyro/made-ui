'use strict'
var constant = require('./../constants/loginConstants.js');
var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');
var browserHistory = require('react-router').browserHistory;


export function initContentSuccess(cmsContent) {
  return { type: constant.CMS_CONTENT_LOGIN_SUCCESS , cmsContent};
}
export function getUserDetailsSuccess(userSummary) {
  return { type: constant.ON_LOGIN_STUB_FETCH , userSummary};
}

export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_STATE_LOGIN_UPDATE , updatedProps};
}

export function fetchUserSummary(userName){
  debugger;
  return function(dispatch){
    var summaryPromise = utils.ajaxGetNoJsonp('/api/getUserSummary' , {userName : userName});
    summaryPromise.then(function(response){
      //console.log(response);
        if(response.error != undefined){
           alert("Error occured in login");
          //  debugger;
          //  utils.ajaxGetNoJsonp(appConfig.config.STUB_URL+userName+".json").then(function(userData){
          //  dispatch(getUserDetailsSuccess(userData));
          //  browserHistory.push('disclaimer');
            // _this.props.actions.initContentSuccess(cmsContent);
//           });

        }else{
          if(response.error === null){
            // utils.ajaxGetNoJsonp(appConfig.config.STUB_URL+userName+".json").then(function(userData){
            // dispatch(getUserDetailsSuccess(userData));
            // browserHistory.push('disclaimer');
             // _this.props.actions.initContentSuccess(cmsContent);
             alert("Error occured in login");
            //});
          }else{
            var jsonData = JSON.parse(response);
            if(jsonData.responseCode.responseCode != 200){
              alert("Error occured in login - "+jsonData.responseCode.message);
              // utils.ajaxGetNoJsonp(appConfig.config.STUB_URL+userName+".json").then(function(userData){
              // dispatch(getUserDetailsSuccess(userData));
              // browserHistory.push('disclaimer');
               // _this.props.actions.initContentSuccess(cmsContent);
              //});
            }else{
              dispatch(getUserDetailsSuccess(jsonData));
              browserHistory.push('disclaimer');
            }
          }

        }

    });
    summaryPromise.error(function(response){
          alert("Error occured in login");
          //browserHistory.push('/');
          // utils.ajaxGetNoJsonp(appConfig.config.STUB_URL+userName+".json").then(function(userData){
          //  dispatch(getUserDetailsSuccess(userData));
          //  browserHistory.push('disclaimer');
          //  // _this.props.actions.initContentSuccess(cmsContent);
      //});
    })
  }
}
