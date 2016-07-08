'use strict'
var constant = require('./../constants/selectPlanConstants.js');
var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');
var utils = require('./../../../common/utils/utils.js');

export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_SELECTPLAN_STATE_UPDATE , updatedProps};
}

export function getplanDataState(planDataObj){
  return {type: constant.REQUEST_SELECTPLAN_DATA , planDataObj};
}

export function resetComponentState(updatedProps){
  return {type: constant.RESET_COMPONENT_STATE , updatedProps};
}

export function fetchBrands(requestParams){
  return function(dispatch){
    utils.ajaxGetNoJsonp("/api/fetchBrands", {state : requestParams.stateCode , county: requestParams.countyName}).then(function(response){
         console.log(response);
           var jsonData = JSON.parse(response);
         //dispatch(updateComponentState({brandName : jsonData.brandName}));
         dispatch(updateComponentState({brandName : "Anthem"}));
    });
  }
}
export function fetchPlan(requestParams){
  return function(dispatch){
    var coverageMonth = requestParams.coveragemonth;
    utils.ajaxGetNoJsonp("/api/fetchPlan", {zipCode : requestParams.zipCode ,
                                 county: requestParams.county,
                               state: requestParams.state,
                             brandName: requestParams.brandName,
                           coverageyear: requestParams.coverageyear,
                         coveragemonth: requestParams.coveragemonth,
                       dob: requestParams.dob,
                     gender: requestParams.gender,
                   type:'primary'}).then(function(response){
         console.log(response);
           var jsonData = JSON.parse(response);
         dispatch(updateComponentState({planDataObj : jsonData , selectedIndex : coverageMonth}));
    });
  }
}
