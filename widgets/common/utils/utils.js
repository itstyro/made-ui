require('es6-promise').polyfill();
var axios = require('axios');
var $ = require('jquery');



module.exports.ajaxGet = function ajaxGet(url , data){
return $.ajax({
    url : url,
    dataType: 'JSONP',
    data : data,
    jsonpCallback: 'callback',
    type: 'GET'});
}


module.exports.ajaxGetWithHeaders = function ajaxGetWithHeaders(url , data , serviceHeaders){
var requestHeaders = (serviceHeaders == undefined ?  {"Access-Control-Allow-Origin" : "*"} : Object.assign({} , {"Access-Control-Allow-Origin" : "*"} , serviceHeaders));
return $.ajax({
    url : url,
    data : data,
    headers : requestHeaders,
    type: 'GET'});
}


module.exports.ajaxGetNoJsonp = function asyncAjax(url , data){
  debugger;
return $.ajax({
    url : url,
    data : data,
    type: 'GET'});
}

module.exports.getStaticJSON = function getStaticJSON(url){
  debugger;
return $.ajax({
    url : url,
    type: 'GET'});
}


module.exports.asyncAxiosGet = function asyncAxiosGet(url){
return axios(url);
}
