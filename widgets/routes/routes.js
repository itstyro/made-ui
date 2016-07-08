'use strict'
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var IndexRoute = require('react-router').IndexRoute;
var Header = require('./../header/src/components/headerController.js');
var Redirect = require('react-router').Redirect;
var SwitchUser = require('./../switchuser/switchUser.js');


var Main = require('./../main/main.js');
var ChangeTIN = require('./../changetin/src/components/changeTINContainer.js');
var DemographicWidget = require('./../demographicWidget/src/components/mainCustForm.js');
	var DashboardWidget = require('./../dashboard/src/components/dashboard.js');

var routes = (
  <Route path="/app" component={Main}>
        <IndexRoute component={SwitchUser}/>
        <Route path="changeTin" component={ChangeTIN}></Route>
        <Route path="demographics" component={DemographicWidget}></Route>
        <Route path="dashboard" component={DashboardWidget}></Route>
        <Redirect from="*" to="/app" />
  </Route>
);

module.exports = routes;
