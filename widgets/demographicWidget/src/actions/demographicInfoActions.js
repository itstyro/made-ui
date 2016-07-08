'use strict'
var constant = require('./../constants/demographicInfoConstants.js');
var utils = require('./../../../common/utils/utils.js');


export function initContentSuccess(cmsContent) {
  return { type: constant.ON_DEMOGRAPHIC_CONTENT_SUCCESS , cmsContent};
}


export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_STATE_UPDATE , updatedProps};
}

export function resetAppState(){
	return {type : constant.RESET_APP_STATE};
}

export function saveDataInState(data){
  return {type: constant.SAVE_DATA_IN_STATE , userDemographicData : data }
}
