'use strict'
var React = require('react');
var ReactDOM = require('react-dom');

var Provider = require('react-redux').Provider;
var configureStore = require('./../store/configureStore.js');
var store = require('./../store/configureStore.js');

//var routes = require('./../routes/routes.js');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;
var Redirect = require('react-router').Redirect;
var DefaultRoute = require('react-router').DefaultRoute;

var utils = require('./../common/utils/utils.js');
var ChangeTIN = require('./../changetin/src/components/changeTINContainer.js');
var Header = require('./../header/src/components/headerController.js');
var changeTinConstants = require('./../changetin/src/constants/changeTinConstants.js');
var SwitchUser = require('./../switchuser/switchUser.js');
var PageLogin = require('./../login/src/components/login.js');
var Disclaimer = require('./../disclaimer/src/components/disclaimer.js');
var DemographicWidget = require('./../demographicWidget/src/components/mainCustForm.js');
var DashBoard = require('./../dashboard/src/components/dashboard.js');
var SelectPlan = require('./../selectplan/src/components/selectplan.js');

var Main = React.createClass ({
	componentWillMount : function(){
		//Logger.debug('ChangeTIN.componentWillMount()');
	},

	componentWillUnmount : function(){
		//Logger.debug('ChangeTIN.componentWillUnmount()');
	},

	componentDidMount : function(){

		},

	render: function() {
			return (
		        <div>
					{this.props.children}
		        </div>
			);
	}
});



module.exports = Main;


ReactDOM.render(
  <Provider store={store}>
	<Router history={browserHistory}>
	<Route path="/" component={Main}>
				<IndexRoute component={PageLogin}/>
				<Route path="disclaimer" component={Disclaimer}></Route>
				<Route path="changeTin" component={ChangeTIN}></Route>
				<Route path="dashBoard" component={DashBoard}></Route>
				<Route path="demographics" component={DemographicWidget}></Route>
				<Route path="selectplan" component={SelectPlan}></Route>
				<Route path="enrollment" component={EnrollmentForm}</Route> 
				<Redirect from="*" to="/" />
 	</Route>
	</Router>
  </Provider>,
  document.getElementById('app')
);

if(document.getElementById('header')){
	ReactDOM.render(<Header store={store}/> , document.getElementById('header'));
}
