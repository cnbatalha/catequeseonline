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

	$scope.positions = [{lat:-3.121552,lng:-60.035365,title:""}];

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

		// conexao firebase turmas
		var cateqRef = firebase.database().ref('catequizandos/' + $routeParams.id).orderByValue();

		cateqRef.on('value', function(data) {
			$scope.catequizando = data.val();
			$scope.$apply();

		});

		//webService.getCatequizando(id).then(function(value) {
		//	$scope.catequizando = value;
		//	$scope.catequizando.nascimento = new Date($scope.catequizando.nascimento);
		//	localizaTurma($scope.catequizando.idTurmaAtual);
		//	localizaFrequencia($scope.catequizando.frequencia);
		//	$scope.getGeoPosition();
		//});

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

	$scope.getGeoPosition = function()
	{
		
		return $http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.catequizando.endereco + ' MANAUS',
		{
			headers : {authorization : undefined}
		})
		.then(function(value) {
			console.log(value.data);

			var retorno = value.data.results[0];

			console.log(retorno);

			var position = {};

			position.lat = retorno.geometry.location.lat;
			position.lng = retorno.geometry.location.lng;
			position.title = $scope.catequizando.nome;

			$scope.positions = [];
			$scope.positions.push(position)	;

			console.log($scope.positions);
			return value.data;
		});	
	}

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
		
		$scope.registros = [];

		// conexao firebase catequizandos
		var catequizandosRef = firebase.database().ref('catequizandos').orderByChild("nome")
		.startAt($scope.inputSearch)
		.endAt($scope.inputSearch + "\uf8ff")
		.limitToFirst(10);

		catequizandosRef.once('value', function(data) {		

			data.forEach(function(data) {
		        // key will be "fred" the first time and "barney" the second time
		        var key = data.key;
		        // childData will be the actual contents of the child
		        var childData = data.val();
		        childData.key = key;

		        $scope.registros.push(childData);
		        $scope.$apply();

		    }); 

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

		fetchRegistros(0);
		//if ($scope.inputSearch.length == 0) {
		//	fetchRegistros(0);
		//	filtro = false;
		//} else {
		//	fetchRegistrosNome(0);
		//		filtro = true;
		//}
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
