'use strict';

var turmaModule = angular.module('turmaModule', []);

turmaModule.controller('turmaController', function($scope, $http, webService) {

	$scope.registros = [];

	var fetchRegistros = function() {

		webService.getTurmaList().then(function(value) {
			$scope.registros = value;
		});
	}

	fetchRegistros();

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});

turmaModule.controller('turmaListaController', function($scope, $http, $routeParams, webService, utilService) {

	var controller = this;
	var idTurma = $routeParams.id;

	$scope.turma = {};
	$scope.turmas = webService.turmas;
	$scope.total = 0;

	var localizaTurma = function(idTurma) {
		$scope.turma = $.grep($scope.turmas, function(e, i) {
			return e.id == idTurma;
		});

		$scope.turma = $scope.turma[0];
		console.log($scope.turma);
		return $scope.turma;
	}

	localizaTurma(idTurma);

	$scope.registros = [];

	var fetchRegistros = function() {
		webService.getTurmaCatequizandoList(idTurma).then(function(value) {
			$scope.registros = value;
			$scope.total = $scope.registros.length;
		});
	}

	fetchRegistros();

	$scope.formatData = function(data) {
		var dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}
});
