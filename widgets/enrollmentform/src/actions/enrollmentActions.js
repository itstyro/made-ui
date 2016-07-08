'use strict'
var constant = require('./../constants/enrollmentConstants.js');
var utils = require('./../../../common/utils/utils.js');


export function updateStateProperty(field, value) {
  return { type: constant.ON_DISCLAIMER_CONTENT_SUCCESS , {map[field], value}};
}

export function setApplicationInfo(appilcationInfo){
  return {type: constant.REQUEST_DISCLAIMER_STATE_UPDATE , appilcationInfo};
}

export function resetAppState(){
	return {type : constant.RESET_APP_STATE};
}


