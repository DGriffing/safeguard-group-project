'use strict';

angular.module('SafeguardApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])

.config(function($stateProvider){

	$stateProvider
		.state('home', {
			url: '/', //"root" directory
			templateUrl: 'partials/home.html',
			controller: 'HomepageCtrl'
		})

		.state('form', {
			url: '/Form', 
			templateUrl: 'partials/form.html',
			controller: 'FormCtrl'
		})
})

.controller('HomepageCtrl', ['$scope', '$http', function($scope, $http) {

}])
