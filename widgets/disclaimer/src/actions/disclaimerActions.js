'use strict'
var constant = require('./../constants/disclaimerConstants.js');
var utils = require('./../../../common/utils/utils.js');


export function initContentSuccess(cmsContent) {
  return { type: constant.ON_DISCLAIMER_CONTENT_SUCCESS , cmsContent};
}

export function updateComponentState(updatedProps){
  return {type: constant.REQUEST_DISCLAIMER_STATE_UPDATE , updatedProps};
}

export function resetAppState(){
	return {type : constant.RESET_APP_STATE};
}
