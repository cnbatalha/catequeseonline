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

	// verifica se precisa listar a turma
	$scope.listarTurma = ($routeParams.idturma !== undefined );
	var idTurmaList = $routeParams.idturma;

	$scope.catequizando = {};

	$scope.operacaoOK = false;
	$scope.operacaoErro = false;

	$scope.turmas = webService.turmas;

	$scope.idTurma = {};
	$scope.turmaAtual = {};

	$scope.frequenciaAtual = [];
	$scope.statusFrequencia = [{ id: 1, status: 'Presente'}, { id: 0, status: 'Ausente'}];

	console.log(webService.turmas);

	// localiza turma
	var localizaTurma = function(idTurma) {
		$scope.turmaAtual = $.grep($scope.turmas, function(e, i) {
			return e.id === idTurma;
		});
		$scope.turmaAtual = $scope.turmaAtual[0];
		return $scope.turmaAtual;
	};

	// localiza frequencia
	var localizaFrequencia = function(idFrequencia) {
		$scope.frequenciaAtual = $.grep($scope.statusFrequencia, function(e, i) {
			return e.id === idFrequencia;
		});
		$scope.frequenciaAtual = $scope.frequenciaAtual[0];
		return $scope.frequenciaAtual;
	};


	// adiciona catequizando
	$scope.addCatequizando = function() {

		this.catequizando.idTurmaAtual = $scope.turmaAtual.id;
		this.catequizando.frequencia = $scope.frequenciaAtual.id;

		webService.addCatequizando(this.catequizando).then(function(value) {
			console.log(value);
			$scope.operacaoOK = (value.status === 200);
			$scope.operacaoErro = !$scope.operacaoOK;
			resetForm();
		}, function(reason) {

		}, function(value) {

		});
	};

	$scope.getTurma = function(idTurma) {
		var loTurma = localizaTurma(idTurma);
		if (loTurma === undefined) {
			return '';
		} else {
			return loTurma.nome;
		}
	};

	$scope.getFrequencia = function(idFrequencia) {
		var loFrequencia = localizaFrequencia(idFrequencia);
		if (loFrequencia === undefined) {
			return '';
		} else {
			return loFrequencia.status;
		}
	};

	var fetchRegistro = function(id) {

		webService.getCatequizando(id).then(function(value) {
			$scope.catequizando = value;
			$scope.catequizando.nascimento = new Date($scope.catequizando.nascimento);
			localizaTurma($scope.catequizando.idTurmaAtual);
			localizaFrequencia($scope.catequizando.frequencia);
		});

	};

	// inicialia dados da tela
	var resetForm = function() {
		$scope.catequizando = {};
		$scope.turmaAtual = {};
	};

	$scope.registros = [];

	var fetchRegistrosTurma = function() {
		webService.getTurmaCatequizandoList(idTurmaList).then(function(value) {
			$scope.registros = value;
			$scope.total = $scope.registros.length;
		});
	};

	$scope.substrNome = function( nome )
	{
		return nome.substr(0,10) + '...';
	};

	fetchRegistro(idCatequizando);
	
	if ( $scope.listarTurma )
	{
		fetchRegistrosTurma();
	}

})
.controller('catequizandoListController', function($scope, $http, $routeParams, webService) {

	$scope.turmas = webService.turmas;

	$scope.registros = [];

	var filtro = false;
	$scope.inputSearch = '';

	// carrega todos os registros usando paginacao
	var fetchRegistros = function(pageIndex) {

		webService.getCatequizandoList(pageIndex).then(function(value) {
			$scope.page.loadPage(value);
			$scope.registros = $scope.page.content;
		});
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

	$scope.setPage = function(indexPage) {
		if (filtro) {
			fetchRegistrosNome(indexPage);
		} else {
			fetchRegistros(indexPage);
		}
	};

	// caixa para confirmar exclusao de catequizando
	$scope.removeCatequizando = function(idCatequizando) {

		bootbox.alert('Confirmar exclusão de Catequizando?', function() {
		});
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

	$scope.page = new Paginate($scope.setPage);
	$scope.buscarRegistro();

})
