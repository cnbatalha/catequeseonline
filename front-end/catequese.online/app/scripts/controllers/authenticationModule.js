'use strict';

angular.module('AuthController', [])

.controller('LoginController',

function($scope, $rootScope, $location, AuthenticationService) {
	
	$rootScope.serviceName = '/catequese-online';
	$rootScope.urlBase = 'http://sistematic.serveftp.net:8080' + $rootScope.serviceName;				
	 
	// reset login status
	AuthenticationService.ClearCredentials();

	$scope.login = function() {
		$scope.dataLoading = true;
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
		});
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