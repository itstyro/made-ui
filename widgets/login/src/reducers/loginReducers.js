var assign = require('object-assign');
var loginReducer = function loginReducer(state=[],action){

switch (action.type){
      case 'ON_LOGIN_STUB_FETCH' :
      debugger;
      var _userSummary = (action.userSummary != undefined ? (action.userSummary.data != undefined ? action.userSummary.data : action.userSummary) : undefined);
      	if(_userSummary.broker!=undefined){
          if(_userSummary.broker.affliatedStates.length == 1){
            return assign({} , state , {"broker" : _userSummary.broker , "delegate" : undefined,
                                        "isSingleStateAssociation" : true ,
                                          "isUserDataReady" : true});
          }	else{
    						return assign({} , state , {"broker" : _userSummary.broker , "delegate" : undefined,
                                            "isSingleStateAssociation" : false ,
                                              "isUserDataReady" : true});
    			}

				}else if(_userSummary.delegate !=undefined){
          if(_userSummary.delegate.payableBrokers[0].type == "agent" && _userSummary.delegate.payableBrokers.length == 1){
            return assign({} , state , {"delegate" : _userSummary.delegate , "broker" : undefined,
                                        "isSingleAgencyAssociation" : true,
                                        "isUserDataReady" : true});
            }
          else{
          return assign({} , state , {"delegate" : _userSummary.delegate ,"broker" : undefined,
                                      "isSingleAgencyAssociation" : false,
                                    "isUserDataReady" : true});
          }
        }
        else{
          break;
        }

        case 'CMS_CONTENT_LOGIN_SUCCESS' :
    		return  assign({} , state , {"widgetContent" : action.cmsContent});

		case 'REQUEST_STATE_LOGIN_UPDATE' :
	    	return  assign({} , state , action.updatedProps);
    case 'RESET_APP_STATE' :
            return [];

		default : return state;

	}
}

module.exports = loginReducer;
