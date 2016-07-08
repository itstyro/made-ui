var assign = require('object-assign');
var dashboardReducer = function dashboardReducer(state=[],action){

switch (action.type){
      case 'CMS_DASHBOARD_CONTENT_SUCCESS' :
        return  assign({} , state , {"widgetContent" : action.cmsContent});
      case 'REQUEST_DASHBOARD_STATE_UPDATE' :
        return  assign({} , state ,action.updatedProps );
      case 'SUMMARY_DASHBOARD_CONTENT_SUCCESS':
        return assign({},state,{"applicationContent":action.customerInfo})
      case 'SUMMARY_DASHBOARD_CONTENT_SUCCESS_ASSISTANT':
        return assign({},state,{"assistantContent": action.customerInfo})
      case 'RESET_APP_STATE' :
        return [];

      default : return state;

}
}

module.exports = dashboardReducer;
