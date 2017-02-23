'use strict';

angular.module('AuthController', [])

.controller('LoginController',

	function($scope, $rootScope, $location, AuthenticationService) {

	//$rootScope.serviceName = '/catequese-online-2';
	//$rootScope.urlBase = 'http://sistematic.serveftp.net:8080' + $rootScope.serviceName;
	//$rootScope.urlBase = 'http://localhost:8080' + $rootScope.serviceName;

	// reset login status
	// AuthenticationService.ClearCredentials();

	$scope.showLogin  = function()
	{
		return (!$rootScope.auth) || ($rootScope.auth === undefined );
	}

	$scope.showMenu  = function()
	{
		return $rootScope.auth;
	}

	// firebase configuration
	var config = {
		apiKey: "AIzaSyAvlrUUU0j6b5geu0D4gJN1fMuD50Y-yE4",
		authDomain: "catequese-online-01.firebaseapp.com",
		databaseURL: "https://catequese-online-01.firebaseio.com",
		storageBucket: "catequese-online-01.appspot.com",
	};

	// inicializando firebase
	if ($rootScope.initialized === undefined)
	{
		firebase.initializeApp(config);
		$rootScope.auth = false;
		$rootScope.initialized 	= true;

 		$location.path('#!/login');
		// FirebaseUI config
		var uiConfig = {
			'signInSuccessUrl': '#!/home',
			// Terms of service url
			'tosUrl': '<your-tos-url>',
			'signInOptions': [
	          // Leave the lines as is for the providers you want to offer your users
	          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	          //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	          //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	          //firebase.auth.GithubAuthProvider.PROVIDER_ID,
	          firebase.auth.EmailAuthProvider.PROVIDER_ID
	      ],
				'callbacks': {
						'signInSuccess': function(currentUser, credential, redirectUrl) {

							// getting token
							$rootScope.authTk = credential.accessToken;
							// getting user info
							$rootScope.user = currentUser;
							$rootScope.auth = true;
							// redirecting
							$location.path('/home');
							$scope.$apply();

							$rootScope.userName = currentUser.displayName;

							console.log($rootScope.user);

							return true;
						}
					},
	  	}

			// Initialize the FirebaseUI Widget using Firebase.
			var ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#firebaseui-auth-container', uiConfig);

  }

	// login usuario
	/*
	$scope.login = function() {

		var rootRef = firebase.database().ref();
		var auth = firebase.auth();

		var redirect = function()
		{
			$location.path('/home');
		}

		var provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider).then(function(result) {

			// getting token
			$rootScope.authTk = result.credential.accessToken;
			// getting user info
			$rootScope.user = result.user;
			$rootScope.auth = true;
			// redirecting
			$location.path('/home');
			$scope.$apply();

			$rootScope.userName = $rootScope.user.displayName;

			console.log($rootScope.user);

		}).catch(function(error) {
			console.log(error);
		 	// Handle Errors here.
		 	var errorCode = error.code;
		 	var errorMessage = error.message;
		  	// The email of the user's account used.
		  	var email = error.email;
		  	// The firebase.auth.AuthCredential type that was used.
		  	var credential = error.credential;
		  });

		$location.path('/home');
	};
	*/

	$scope.logout = function() {

  	$rootScope.auth = false;

		firebase.auth().signOut().then(function() {
  			// Sign-out successful
  			console.log('signOut');


  		}, function(error) {
  			// An error happened
  			console.log(error);
  		});

		// AuthenticationService.ClearCredentials();

		$location.path('/login');
		// $location.path('/someNewPath');
		//$location.replace();
	};

	//if ($scope.auth !== true) {
		//AuthenticationService.ClearCredentials();
		//$location.path('/login');
	//}

});
