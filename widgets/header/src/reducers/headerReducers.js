var assign = require('object-assign');
var headerReducer = function headerReducer(state=[],action){
	//state = state || initialState;
	switch (action.type){

  	case 'ON_HEADER_CONTENT_SUCCESS' :
    		//return action.agentInfo;
    		return  assign({} , state , {"widgetContent" : action.cmsContent});

	  case 'RESET_APP_STATE' :
		    		//return action.agentInfo;
		    		return  [];

		default : return state;

	}
}

module.exports = headerReducer;
