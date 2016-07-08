var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');

module.exports.getSummaryRequest = function(requestData){
  var requestObj = {
              "getSummaryRequest": {
                              "userId": requestData.userId
                            }
              };
      //  return  utils.ajaxGetNoJsonp(appConfig.config.getSummaryRequestURL+requestData.userId , requestObj);
       return  utils.ajaxGetNoJsonp(appConfig.config.getSummaryRequestURL+requestData.userId);
}

module.exports.getZipCode = function(requestData){
        var serviceHeaders = {
          "authorization": "Basic c3JjTERBUG9sc1dTU2VjVUk6U3RhZ2UyMDEw",
          "content-type": "application-json",
          "Access-Control-Allow-Origin" : "*"
        }
//        return  utils.ajaxGetWithHeaders(appConfig.config.getZipCode , requestData , serviceHeaders);
          return utils.ajaxGet(appConfig.config.getZipCode , requestData);
}
