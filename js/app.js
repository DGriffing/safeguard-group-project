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

		.state('memberBios', {
			templateUrl: 'partials/memberBios.html',
			controller: 'BiosCtrl'
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

.controller('MembersCtrl', ['$scope', '$http', '$uibModal', function($scope, $http, $uibModal) {
	$http.get('data/members.json').then(function(response) {
 		$scope.members = response.data;
 	});

 	$scope.memberInfo = function() {
	 	var modalInstance = $uibModal.open({
			templateUrl: 'partials/memberBios.html'
		});
	}	
}])

.controller('BiosCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('data/members.json').then(function(response) {
 		$scope.members = response.data;
 	});
}])

.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {

}])
