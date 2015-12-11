'use strict';

angular.module('SafeguardApp', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'firebase'])

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'partials/home.html'
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
			templateUrl: 'partials/projects.html'
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

        .state('confirmation', {
            templateUrl: 'partials/confirmation.html',
            controller: 'ConfirmationCtrl'
        })

	// Sends all false paths to home
	$urlRouterProvider.otherwise('/');
})


.controller('MembersCtrl', ['$scope', '$http', '$uibModal', '$filter', '$stateParams', function($scope, $http, $uibModal, $filter, $stateParams) {
    
    //
    $http.get('data/members.json').then(function(response) {
        $scope.members = response.data;
    });  

    //
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
    
    //
    $scope.close = function () {
        $uibModalInstance.dismiss('close');
    };
}])


.controller('FormCtrl', ['$scope', '$http', '$uibModal', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function($scope, $http, $uibModal, $firebaseArray, $firebaseObject, $firebaseAuth) {
  
    // Holds participant's star ratings (0-5)
    var starScore;
    // Connects to Safeguard's Firebase
    var ref = new Firebase("https://safeguard.firebaseio.com");
    // Connect's to 'participants' in Firebase
    var participantsRef = ref.child('participants');
    $scope.participants = $firebaseArray(participantsRef);
    // Holds information about the participant signing up
    $scope.newParticipant = {};

    // When page is ready, prevents pressing enter from submitting form
    $(document).ready(function() {
        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    });

    // Saves participant's rating
    $('#star').raty({
        click: function(score, evt){
            starScore = score;
        }
    });

    // Detects when form's 'Sign Up' button has been clicked
    // Checks whether form is valid
    // If valid, submits information to the Firebase
    // Opens a confirmation modal to confirm sucessfull sign up
    $scope.submitForm = function(obj){
        var time = $scope.dateSpent.getTime();
        var date = Date(time);
        // Checking if valid
        if(obj.$valid) {
            // Adding to Firebase
            $scope.participants.$add({
                name: $scope.name,
                email: $scope.email,
                role: document.querySelector('input[name="role"]:checked').value,
                birthdate: $scope.birthdate,
                stayDate: date,
                natureOfStay: $scope.natureOfStay,
                rating: starScore,
                time: Firebase.ServerValue.TIMESTAMP
            })
            $scope.selectedMember = obj;
            // Opens Confirmation modal
            var modalInstance = $uibModal.open({
                templateUrl: 'partials/confirmation.html',
                controller: 'ConfirmationCtrl',
                scope: $scope
            });
        }
        else {
            console.log('Form entered was invalid.');
        }
    }



    // Resets all of the fields in the form
    $scope.reset = function(form) {
        $scope.email = "";
        $scope.name = "";
        $scope.dateSpent = "";
        $scope.birthdate = "";
        document.getElementById('patient').checked = true;
        document.getElementById('caregiver').checked = false;    
        $scope.natureOfStay = "";
        $('#star').raty({ starScore: 0 });
    }

    // Returns 'True' if date in hospital is within the last two years
    $scope.dateSpentInput = function(dateSpent){
        var nowDate = new Date(); 
        var dayToday = nowDate.getDate();
        var monToday = nowDate.getMonth();
        var yToday = nowDate.getFullYear();
        
        var usersdateSpent= new Date(dateSpent);
        var usersDay = usersdateSpent.getDate();
        var userMonth = usersdateSpent.getMonth();
        var usersYear = usersdateSpent.getFullYear();

        // If user's year is over 2 years before current year, return false.
        if(yToday - usersYear > 2) { 
            return false;
        }
        // If user's year is less than 2 years before current year...  
        // If user's month hasn't already passed in current year, return false. 
        if(usersYear == yToday - 2 && monToday > userMonth) {
        return false; 
        }
        // If user's year is less than 2 years before current year... 
        // If user's month is same as current month..
        // If user's day is less than current day, return false.
        if(usersYear == yToday - 2 && userMonth == monToday && dayToday >= usersDay) {
        return false; 
        }
        // Otherwise, user's date is within the 2 year requirement, return true.
        return true;
    }

    // Compares user's birthday to today's date and checks if user is 7+ 
    $scope.birthdateInput = function(birthdate){
    var todaysDate = new Date(); 
    var usersBirthdate = new Date(birthdate);
    var dayToday = todaysDate.getDate();
    var userDay = usersBirthdate.getDate();
    var monthToday = todaysDate.getMonth();
    var userMonth = usersBirthdate.getMonth();
    var yearToday = todaysDate.getFullYear();
    var userYear = usersBirthdate.getFullYear();
    //If user's birthdate year is over 7 years before today's year, return true
    if(yearToday - userYear > 7) { 
    return true;
    }
    //If user's birthdate year is (yearToday - 7) and the user's birthday month has already 
    //passed in this calendar year, return true. 
    if(userYear == yearToday - 7 && monthToday > userMonth) {
    return true; 
    }
    //If user's birthdate year is (yearToday - 7) and the month of the user's bday is the same
    //as this year's current month and the the user's day of birth already passed or is 
    //today in this current year, return true
    if(userYear == yearToday - 7 && userMonth == monthToday && dayToday > userDay + 1) {
    return true; 
    }
    //otherwise the user is under 7, return false 
    return false;
    }

}])

.controller('ConfirmationCtrl', ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) { 
   $scope.close = function () {
      $uibModalInstance.dismiss('close');
   };
}])