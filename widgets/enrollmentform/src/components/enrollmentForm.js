var React = require('react');
var ReactDOM = require('react-dom');

var EnrollmentFormComponent = React.createClass({
	componentWillMount: function() {

	},


});

function mapDispatchToProps(dispatch){
	return {
		actions : bindActionCreators(dashboardActions , dispatch)
	}
}

module.exports = connect(mapStateToProps ,mapDispatchToProps)(EnrollmentFormComponent);
