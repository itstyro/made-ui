var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var browserHistory = require('react-router').browserHistory;

var rootReducer = require('./../rootreducer/rootReducer.js');
var constant = require('./../changetin/src/constants/changeTinConstants.js');
var utils = require('./../common/utils/utils.js');
//var thunk = require('redux-thunk').default;
import thunk from 'redux-thunk';

var store = createStore(rootReducer, applyMiddleware(thunk));

module.exports = store;


browserHistory.listen(function (location) {
  console.log(location);
store.dispatch({type : 'ON_ROUTE_TRANSITION' , location});
});

//  var configureStore = function configureStore(initialState) {
//    return createStore(
//      rootReducer,
//      init(),
//      applyMiddleware(thunk)
//    );
//  }
//
// function init(){
//       var _this = this;
//       var userType = "";
//       utils.asyncAxiosGet(constant.LOGIN_STUB_URL).then(function(userSummary){
//             if(userSummary.data.broker != undefined){
//               return {changeTinReducer : {broker : userSummary.data.broker}};
//             }
//             else {
//               return {changeTinReducer : {delegate : userSummary.data.delegate}};
//             }
//       });
// }
