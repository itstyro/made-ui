var assign = require('object-assign');
var selectPlanReducer = function selectPlanReducer(state=[],action){

switch (action.type){
			case 'REQUEST_SELECTPLAN_STATE_UPDATE' :
          debugger;
	    		return  assign({} , state ,action.updatedProps);
      case 'REQUEST_SELECTPLAN_DATA' :
					return assign({},state,{'policyData': action.planDataObj})
          return [];
      case 'RESET_SELECTPLAN_COMPONENT_STATE' :
          return [];
		default : return state;
	}
}

module.exports = selectPlanReducer;
