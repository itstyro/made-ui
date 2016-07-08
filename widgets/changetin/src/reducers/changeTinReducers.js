var assign = require('object-assign');
var changeTinReducer = function changeTinReducer(state=[],action){

switch (action.type){
      case 'ON_STUB_FETCH' :
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
      case 'CHANGETIN_AGENCY_TABLE_FILTER' :
          return assign({} , state, {filterAgencySearchList : action.filteredArray});
    	case 'ON_SUCCESS' :
    		return  assign({} , state , {"widgetContent" : action.cmsContent});

			case 'REQUEST_STATE_UPDATE' :
	    		return  assign({} , state , action.updatedProps);
      case 'ON_CHANGE_TIN_TABLE_FILTER':
          return assign({} , state, {filteredDataDelegate : action.filteredArray});
      case 'GENERAL_AGENCY_FETCH_BROKERS_SUCCESS' :
          return assign({}, state, {generalAgencyBrokerList : action.jsonData});
      case 'RESET_APP_STATE' :
          return [];
      case 'RESET_COMPONENT_STATE' :
          return [];
		default : return state;

	}
}

module.exports = changeTinReducer;
