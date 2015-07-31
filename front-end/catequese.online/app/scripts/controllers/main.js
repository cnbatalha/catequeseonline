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

 	$scope.formatData = function(data) {
 		var dateFormat = new Date(data);
 		return dateFormat.toLocaleDateString();
 	};

 	var fetchTurmas = function() {

 		webService.getTurmaList().then(function(value) {
 			$scope.turmas = value;
 		});
 	};

 	$scope.aniversarios = [];

 	var d = new Date();
 	$scope.mes = d.getMonth() +1;

 	var fechAniversariantes = function() {
 		webService.aniversarioCatequizando($scope.mes).then(function(value) {
 			$scope.aniversarios = value;
 		}, function() {

 		}, function() {

 		});
 	};


	$scope.substrNome = function( nome )
	{
		return nome.substr(0,20) + '...';
	};

 	fetchTurmas();
 	fechAniversariantes();



 });
