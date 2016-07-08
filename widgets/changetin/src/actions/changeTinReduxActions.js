'use strict'
var constant = require('./../constants/changeTinConstants.js');
var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');


export function initContentSuccess(cmsContent) {
  return { type: constant.CMS_CONTENT_SUCCESS , cmsContent};
}
export function getUserDetailsSuccess(userSummary) {
  return { type: constant.USER_DETAIL_FETCH_SUCCESS , userSummary};
}

export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_STATE_UPDATE , updatedProps};
}

export function resetComponentState(updatedProps){
  return {type: constant.RESET_COMPONENT_STATE , updatedProps};
}


export function fetchCmsContent(userType){
  return function(dispatch){
    var _this = this;
    utils.ajaxGet(appConfig.config.CMS_CONTENT_URL , {usertype : userType}).then(function(cmsContent){
      dispatch(initContentSuccess(cmsContent));
    });
  }
}

export function filterOnSearchCriteria(propertyName , array){
  return function filterTable(dispatch){
    var filteredArray = array.filter(function(item){
              return item[propertyName.key].toLowerCase().indexOf(propertyName.value.toLowerCase()) > -1;
    } , this);
    if(filteredArray.length == 0){
      dispatch({type: constant.CHANGETIN_TABLE_FILTER , array});
    }else{
      dispatch({type: constant.CHANGETIN_TABLE_FILTER , filteredArray});
    }
  }
}

export function filterAgencySearchList(propertyName , array){
  return function filterTable(dispatch){
    var filteredArray = array.filter(function(item){
              return item[propertyName.key].toLowerCase().indexOf(propertyName.value.toLowerCase()) > -1;
    } , this);
    if(filteredArray.length == 0){
      dispatch({type: constant.CHANGETIN_AGENCY_TABLE_FILTER , array});
    }else{
      dispatch({type: constant.CHANGETIN_AGENCY_TABLE_FILTER , filteredArray});
    }
  }
}

export function fetchBrokerList(brokerId){
  return function(dispatch){
    utils.ajaxGetNoJsonp('/api/fetchBrokerList').then(function(response){
      var jsonData = JSON.parse(response);
    //  if(jsonData.responseCode.responseCode != 200){
    //      console.dir(jsonData);
    //  }
       dispatch({type: constant.GENERAL_AGENCY_FETCH_BROKERS_SUCCESS , jsonData})
    });
  }
}
