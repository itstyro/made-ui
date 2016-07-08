var assign = require('object-assign');
var enrollmentConstants = require('..\constants\enrollmentConstants');

var enrollmentReducer = function(state=[], action){

	switch (action.type){
		case enrollmentConstants.UPDATE_FIELD_TO_STATE :
			return  assign({} , state , {"widgetContent" : action.cmsContent});

		case enrollmentConstants.SET_APPLICATION_INFO :
			return  assign({} , state , action.updatedProps);
		
		default : return state;
	}
}

module.exports = enrollmentReducer;


// Mapping data