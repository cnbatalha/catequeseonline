'use strict';

angular.module('AuthController', [])

.controller('LoginController',

	function($scope, $rootScope, $location, AuthenticationService) {
		
		$rootScope.serviceName = '/catequese-online-2';
		$rootScope.urlBase = 'http://sistematic.serveftp.net:8080' + $rootScope.serviceName;				
	//$rootScope.urlBase = 'http://localhost:8080' + $rootScope.serviceName;				
	
	// reset login status
	AuthenticationService.ClearCredentials();

	var config = {
		apiKey: "AIzaSyAvlrUUU0j6b5geu0D4gJN1fMuD50Y-yE4",
		authDomain: "catequese-online-01.firebaseapp.com",
		databaseURL: "https://catequese-online-01.firebaseio.com",
		storageBucket: "catequese-online-01.appspot.com",
	};



	$scope.login = function() {

		firebase.initializeApp(config);

		var rootRef = firebase.database().ref();

		var auth = firebase.auth();

		var redirect = function()
		{
			$location.path('/home');		
		}

		var provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider).then(function(result) {
			console.log(result);
			$rootScope.authTk = result.credential.accessToken;
			
			$rootScope.auth = true; 
			var user = result.user;
			$location.path('/home');
			$scope.$apply();
			//$cookieStore.put('globals', $rootScope.globals);
			console.log(user);

		  // ...
		}).catch(function(error) {
			console.log(error);
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});

		$location.path('/home');

		/*$scope.dataLoading = true;
		$rootScope.userLogin = $scope.username;
		AuthenticationService.Login($scope.username, $scope.password, function(response) {
			if (response.data === true) {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.path('/home');
				$scope.auth = true;
			} else {
				$scope.error = 'Login inválido!'; // response.message;
				$scope.dataLoading = false;
			}
		});*/
};

$scope.logout = function() {
	AuthenticationService.ClearCredentials();
	$location.path('/login');
};

if ($scope.auth !== true) {
	AuthenticationService.ClearCredentials();
		//$location.path('/login');
	}

});