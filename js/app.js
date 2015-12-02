'use strict';

angular.module('SafeguardApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})

		.state('form', {
			url: '/Form', 
			templateUrl: 'partials/form.html',
			controller: 'FormCtrl'
		})

		.state('projects', {
			url: '/Projects', 
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsCtrl'
		})

		.state('members', {
			url: '/Members', 
			templateUrl: 'partials/members.html',
			controller: 'MembersCtrl'
		})

	// Sends all false paths to home
	$urlRouterProvider.otherwise('/');
})

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

}])
