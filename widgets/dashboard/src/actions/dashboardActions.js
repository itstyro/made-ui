'use strict'
var constant = require('./../constants/dashboardConstants.js');
var utils = require('./../../../common/utils/utils.js');

export function fetchDashboardSuccess(customerInfo) {
  return {type: constant.SUMMARY_DASHBOARD_CONTENT_SUCCESS , customerInfo};

}

export function fetchDashboardSuccessForAssistant(customerInfo) {
  return {type: constant.SUMMARY_DASHBOARD_CONTENT_SUCCESS_ASSISTANT , customerInfo};

}

export function initContentSuccess(cmsContent) {
  return { type: constant.CMS_DASHBOARD_CONTENT_SUCCESS , cmsContent};
}

export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_DASHBOARD_STATE_UPDATE , updatedProps};
}

export function fetchDashboardSummaryContent(reqparameter){
  return function(dispatch){
    utils.ajaxGetNoJsonp("/api/fetchDashboard", {userId :reqparameter.userId ,
                                  partnerId:reqparameter.partnerId,
                                  isDelegate:reqparameter.isDelegate,
                                  isAgency:reqparameter.isAgency,
                                 brokerId: reqparameter.brokerId,
                               brokerTIN: reqparameter.brokerTIN})
                      .then(function(response){
         //console.log(response);
          var  jsonData = JSON.parse(response);
        dispatch(fetchDashboardSuccess({customerInfo : jsonData}));

    });

  }
}

export function fetchAssistantSummaryContent(requestparameter){
  return function(dispatch){
    utils.ajaxGetNoJsonp("/api/fetchAssistantDashboard", {agentTin :requestparameter.agentTin ,
                                  userId:requestparameter.userId,
                                  isdelegate:requestparameter.isdelegate,
                                  isAgency:requestparameter.isAgency,
                                 agentId: requestparameter.agentId,
                               partnerId: requestparameter.partnerId})
                      .then(function(response){
         //console.log(response);
          var  summaryData = JSON.parse(response);
        dispatch(fetchDashboardSuccessForAssistant({assistantInfo : summaryData}));

    });

  }
}
