'use strict';

/**
 * @ngdoc function
 * @name catequeseonlineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the catequeseonlineApp
 */
 angular.module('catequeseonlineApp')
 .controller('MainCtrl', function ( $scope, $http, webService ) {

 	this.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];

 	$scope.turmas = [];

 	var fetchTurmas = function() {

 		webService.getTurmaList().then(function(value) {
 			$scope.turmas = value;
 		});
 	};

 	$scope.aniversarios = [];
	
	var d = new Date();
	$scope.mes = d.getMonth();
	
	var fechAniversariantes = function() {
		webService.aniversarioCatequizando($scope.mes).then(function(value) {
			$scope.aniversarios = value;
		}, function() {

		}, function() {

		});
	};


	fetchTurmas();
	fechAniversariantes();

 });
