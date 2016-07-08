/* Combine all available reducers to a single root reducer.

 */
var combineReducers = require('redux').combineReducers;
var changeTinReducer = require('./../changetin/src/reducers/changeTinReducers.js');
var headerReducer = require('./../header/src/reducers/headerReducers.js');
var loginReducer = require('./../login/src/reducers/loginReducers.js');
var disclaimerReducer = require('./../disclaimer/src/reducers/disclaimerReducer.js');
var demographicInfoReducer = require('./../demographicWidget/src/reducers/demographicInfoReducer.js');
var dashboardReducer = require('./../dashboard/src/reducers/dashboardReducers.js');
var selectPlanReducer = require('./../selectplan/src/reducers/selectPlanReducer.js')
/* Populated by react-webpack-redux:reducer */
var assign = require('object-assign');
var appReducer = function appReducer(state=[],action){

switch (action.type){

    	case 'ON_ROUTE_TRANSITION' :
    		return  assign({} , state , {"activeRoute" : action.location});

		default : return state;

	}
}

module.exports = appReducer;

const rootReducer = combineReducers({
  appReducer,
  changeTinReducer,
  headerReducer,
  loginReducer,
  disclaimerReducer,
  demographicInfoReducer,
  dashboardReducer,
  selectPlanReducer
});

module.exports = rootReducer;
