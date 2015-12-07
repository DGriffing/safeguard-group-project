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
			templateUrl: 'partials/members.html'
		});
	}	
}])

// .controller('BiosCtrl', ['$scope', '$http', function($scope, $http) {
// 	$http.get('data/members.json').then(function(response) {
//  		$scope.members = response.data;
//  	});
// }])

.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('FormCtrl', ['$scope', '$http', function($scope, $http) {
	//Detects that the form is submitted
  $scope.submitForm = function(form){
  	if(form.$valid) {
  		console.log('form is valid, YAY!');
  	}
  	else {
  		console.log('form is invalid, BOOO!');
  	}
 
  }
  // This resets all of the fields on the form
  $scope.reset = function(form) {
  	$scope.email = "";
  	$scope.firstName = "";
  	$scope.lastName = "";
  	$scope.birthdate = "";
  	$scope.password = "";
  	$scope.confirmpassword = "";
  }
  //Compare's password and confirm password fields to see if they equal each other
  $scope.passwordConfirmed = function() {
  	if($scope.password === $scope.confirmpassword) { //if the two are the same, return true
  		$scope.signUpForm.confirmpassword.$setValidity('$invalid', true);
  		return true;
  	}
  	else {
  		$scope.signUpForm.confirmpassword.$setValidity('$invalid', false);
  		return false;
  	}
  }
  //Compares user's birthday to today's date and checks if user is 13+ 
  $scope.birthdateInput = function(birthdate){
  	var todaysDate = new Date(); 
  	var usersBirthdate = new Date(birthdate);
  	var dayToday = todaysDate.getDate();
  	var userDay = usersBirthdate.getDate();
  	var monthToday = todaysDate.getMonth();
  	var userMonth = usersBirthdate.getMonth();
  	var yearToday = todaysDate.getFullYear();
  	var userYear = usersBirthdate.getFullYear();
  	//If user's birthdate year is over 13 years before today's year, return true
  	if(yearToday - userYear > 18) { 
  		return true;
  	}
  	//If user's birthdate year is 2002 and the user's birthday month has already 
  	//passed in this calendar year, return true. 
  	if(userYear == 2002 && monthToday > userMonth) {
  		return true; 
  	}
  	//If user's birthdate year is 2002 and the month of the user's bday is the same
  	//as this year's current month and the the user's day of birth already passed or is 
  	//today in this current year, return true
  	if(userYear == 2002 && userMonth == monthToday && dayToday >= userDay) {
  		return true; 
  	}
  	//otherwise the user is under 13, return false 
  	return false;
  }
}])