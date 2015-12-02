'use strict';

angular.module('SafeguardApp', ['ngSanitize', 'ui.router', 'ui.bootstrap'])

.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})

		.state('members', {
			url: '/Members', 
			templateUrl: 'partials/members.html',
			controller: 'MembersCtrl'
		})

		.state('projects', {
			url: '/Projects', 
			templateUrl: 'partials/projects.html',
			controller: 'ProjectsCtrl'
		})

		.state('sponsors', {
			url: '/#sponsors', 
			templateUrl: 'partials/home.html'
		})

		.state('form', {
			url: '/Participate', 
			templateUrl: 'partials/form.html',
			controller: 'FormCtrl'
		})

	// Sends all false paths to home
	$urlRouterProvider.otherwise('/');
})

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {

}])
