var assign = require('object-assign');
var disclaimerReducer = function disclaimerReducer(state=[],action){

switch (action.type){

    	case 'ON_DISCLAIMER_CONTENT_SUCCESS' :
    		return  assign({} , state , {"widgetContent" : action.cmsContent});

			case 'REQUEST_DISCLAIMER_STATE_UPDATE' :
	    		return  assign({} , state , action.updatedProps);
      case 'RESET_APP_STATE' :
          return [];
		default : return state;

	}
}

module.exports = disclaimerReducer;
