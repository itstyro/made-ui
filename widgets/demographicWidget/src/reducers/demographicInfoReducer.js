var assign = require('object-assign');
var demographicInfoReducer = function demographicInfoReducer(state=[],action){

switch (action.type){
    	case 'ON_DEMOGRAPHIC_CONTENT_SUCCESS' :
    		return  assign({} , state , {"widgetContent" : action.cmsContent});

			case 'REQUEST_DEMOGRAPHIC_STATE_UPDATE' :
	    		return  assign({} , state , action.updatedProps);
      case 'RESET_APP_STATE' :
          return [];
      case 'SAVE_DATA_IN_STATE' :
          return assign({} , state ,{userDemographicData :  action.userDemographicData});
		default : return state;

	}
}




module.exports = demographicInfoReducer;
