'use strict';

angular.module('SafeguardApp', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'firebase'])

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

.controller('MembersCtrl', ['$scope', '$http', '$uibModal', '$filter', '$stateParams', function($scope, $http, $uibModal, $filter, $stateParams) {
	$http.get('data/members.json').then(function(response) {
 		$scope.members = response.data;
  });  

  $scope.memberInfo = function(obj) {
    console.log(obj);
    $scope.selectedMember = obj;
    var modalInstance = $uibModal.open({
      templateUrl: 'partials/memberBios.html',
      controller: 'BiosCtrl',
      scope: $scope
    });
  }
}])

.controller('BiosCtrl', ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) { 
   $scope.close = function () {
      $uibModalInstance.dismiss('close');
   };
}])


.controller('ProjectsCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('FormCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function($scope, $http, $firebaseArray, $firebaseObject, $firebaseAuth) {


  // Star rating for Patient Stay
  var starScore;
   $('#star').raty({
      // click: function(score, evt){
      //     starScore = score;
      // }
  });

  var ref = new Firebase("https://safeguard.firebaseio.com");

  var usersRef = ref.child('users');
  $scope.users = $firebaseObject(usersRef);
  var Auth = $firebaseAuth(ref);
  $scope.newUser = {}; //holds info about the new user we're creating

  $scope.signUp = function() {

  }



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
    $scope.dateSpent = "";
  	$scope.birthdate = "";
  	$scope.caregiverOrPatient = "";
    $scope.natureOfStay = "";
  }
  $scope.dateSpentInput = function(dateSpent){
    var nowDate = new Date(); 
    var usersdateSpent= new Date(dateSpent);
    var dayToday = nowDate.getDate();
    var usersDay = usersdateSpent.getDate();
    var monToday = nowDate.getMonth();
    var userMonth = usersdateSpent.getMonth();
    var yToday = nowDate.getFullYear();
    var usersYear = usersdateSpent.getFullYear();
    //If user's dateSpent year is over 2 years before today's year, return false
    if(yToday - usersYear > 2) { 
      return false;
    }
    //If user's dateSpent year is 2013 and the user's month has already 
    //passed in this calendar year, return true. 
    if(usersYear == yToday - 2 && monToday > userMonth) {
      return false; 
    }
    //If user's dateSpent year is 2 years and the month of the user's bday is the same
    //as this year's current month and the the user's day of birth already passed or is 
    //today in this current year, return true
    if(usersYear == yToday - 2 && userMonth == monToday && dayToday >= usersDay) {
      return false; 
    }
    //otherwise the user is within the 2 year requirement, return true;
    return true;
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
  	if(userYear == 2002 && userMonth == monthToday && dayToday > userDay + 1) {
  		return true; 
  	}
  	//otherwise the user is under 13, return false 
  	return false;
  }
}])