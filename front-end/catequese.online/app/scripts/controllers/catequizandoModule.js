'use strict';

var catequizandoModule = angular.module('catequizandoModule', []);

catequizandoModule.controller('aniversarioController', function($scope, $http, $routeParams, webService, utilService) {

	$scope.registros = {};
	$scope.mes = '';

	$scope.turmas = webService.turmas;
	
	var fechRegistros = function() {
		webService.aniversarioCatequizando($scope.mes).then(function(value) {
			$scope.registros = value;
		}, function() {

		}, function() {

		});
	};

	$scope.load = function() {
		fechRegistros();
	};
	
	
	$scope.formatData = function(data) {
		var dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	};
	

	// localiza turma
	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id === idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		return $scope.turmaAtual;
	};
	
	$scope.getTurma = function(idTurma) {
		var loTurma = localizaTurma(idTurma);
		if (loTurma === undefined) {
			return '';
		} else {
			return loTurma.nome;
		}
	};

	
})
.controller('catequizandoController', function($scope, $http, $routeParams, webService) {

	var controller = this;

	var idCatequizando = $routeParams.id;
	var filtro = false;
	$scope.catequizando = {};

	$scope.operacaoOK = false;
	$scope.operacaoErro = false;

	console.log(webService.turmas);
	$scope.turmas = webService.turmas;

	$scope.idTurma = {};
	$scope.turmaAtual = {};
	$scope.inputSearch = '';

	console.log(webService.turmas);

	$scope.setPage = function(indexPage) {
		if (filtro) {
			fetchRegistrosNome(indexPage);
		} else {
			fetchRegistros(indexPage);
		}
	};

	$scope.page = new Paginate($scope.setPage);

	// localiza turma
	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id === idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		return $scope.turmaAtual;
	};

	$scope.registros = [];

	// carrega todos os registros usando paginacao
	var fetchRegistros = function(pageIndex) {

		webService.getCatequizandoList(pageIndex).then(function(value) {
			$scope.page.loadPage(value);
			$scope.registros = $scope.page.content;
		});
	};

	if (idCatequizando == undefined) {
		$scope.catequizando = {};
		fetchRegistros(0);
	} else {
		webService.getCatequizando(idCatequizando).then(function(value) {
			$scope.catequizando = value;
			$scope.catequizando.nascimento = new Date($scope.catequizando.nascimento);
			localizaTurma($scope.catequizando.idTurmaAtual);
		});
	}

	// adiciona catequizando
	$scope.addCatequizando = function() {

		this.catequizando.idTurmaAtual = $scope.turmaAtual.id;

		webService.addCatequizando(this.catequizando).then(function(value) {
			console.log(value);
			$scope.operacaoOK = (value.status == 200);
			$scope.operacaoErro = !$scope.operacaoOK;
			resetForm();
		}, function(reason) {

		}, function(value) {

		});
	};

	// busca registro de catequizandos por nome
	$scope.buscarRegistro = function() {
		// caso nao seja informado valor campo para pesquisa retorna todos os
		// registros
		if ($scope.inputSearch.length == 0) {
			fetchRegistros(0);
			filtro = false;
		} else {
			fetchRegistrosNome(0);
			filtro = true;
		}
	};

	var fetchRegistrosNome = function(indexPage) {
		webService.getCatequizandoNome($scope.inputSearch, indexPage).then(function(value) {
			$scope.page.loadPage(value);
			$scope.registros = $scope.page.content;
		}, function(reason) {

		}, function(value) {

		});
	};

	$scope.formatData = function(data) {
		var dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	};

	$scope.getTurma = function(idTurma) {
		var loTurma = localizaTurma(idTurma);
		if (loTurma == undefined) {
			return '';
		} else {
			return loTurma.nome;
		}
	};

	// caixa para confirmar exclusao de catequizando
	$scope.removeCatequizando = function(idCatequizando) {

		bootbox.alert('Confirmar exclusão de Catequizando?', function() {
		});
	};

	// inicialia dados da tela
	var resetForm = function() {
		$scope.catequizando = {};
		$scope.turmaAtual = {};
	};

});
