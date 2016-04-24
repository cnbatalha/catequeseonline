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

	$scope.exportarExcel = function(e)
	{
		//window.open('data:application/vnd.ms-excel,' + $('dvData').html());
    	//e.preventDefault();

    	$scope.printDiv('dvData');
	}

	$scope.printDiv = function(divName) {
	 	var printContents = document.getElementById(divName).innerHTML;
	  	var popupWin = window.open('', '_blank', 'width=800,height=600');
	  	popupWin.document.open();
	  	popupWin.document.write('<html><head><link rel="stylesheet" href="styles/main.css"></head><body onload="window.print()">' + printContents + '</body></html>');
	  	popupWin.document.close();
	}	 

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

turmaModule.controller('turmaMapaController', function($scope, $http, $routeParams, webService, utilService) {

	var controller = this;
	var idTurma = $routeParams.id;

	$scope.turma = {};
	$scope.turmas = webService.turmas;
	$scope.total = 0;

	$scope.registros = [];
	$scope.positions = [];

	var fetchRegistros = function() {
		webService.getTurmaCatequizandoList(idTurma).then(function(value) {
			$scope.registros = value;
			$scope.total = $scope.registros.length;
			geolocalizaTurma();
		});
	}

	fetchRegistros();

	var geolocalizaPessoa = function( endereco, nome)
	{
		return $http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+ endereco + ' MANAUS',
		{
			headers : {authorization : undefined}
		})
		.then(function(value) {

			var retorno = value.data.results[0];
			var position = {};

			position.lat = retorno.geometry.location.lat;
			position.lng = retorno.geometry.location.lng;
			position.title = nome;

			$scope.positions.push(position)	;

			return value.data;
		});	
	};

	var geolocalizaTurma = function()
	{
		for (var reg in $scope.registros) {

			if ( $scope.registros[reg].endereco !== undefined)	
			{
				geolocalizaPessoa( $scope.registros[reg].endereco, $scope.registros[reg].nome );

			}
		}
	};

});
