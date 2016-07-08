var constant = require('./../constants/headerConstants.js');
var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');


export function initHeaderContentSuccess(cmsContent) {
  return { type: constant.CMS_CONTENT_SUCCESS , cmsContent};
}

export function resetAppState(){
	return {type : constant.RESET_APP_STATE};
}
export function initHeaderContent() {
  debugger;
  return function(dispatch,state) {
     var headerContentPromise = utils.ajaxGet(appConfig.config.CMS_CONTENT_HEADER);
     headerContentPromise.then(function(cmsContent){
      	dispatch(initHeaderContentSuccess(cmsContent))
    });
    headerContentPromise.error(function(data){
        //dispatch(initHeaderContentSuccess(cmsContent))
        console.log(data);
   });
  };
}

//module.exports = testAction;
