'use strict';

var catequistaModule = angular.module('catequistaModule', []);

catequizandoModule.controller('catequistaListController', function($scope, $http, $routeParams, webService, utilService) {


	$scope.registros = [];

	$scope.setPage = function(indexPage) {
		if (filtro) {
			fetchRegistrosNome(indexPage);
		} else {
			fetchRegistros(indexPage);
		}
	};

	$scope.page = new Paginate($scope.setPage);

	// carrega todos os registros usando paginacao
	var fetchRegistros = function(pageIndex) {
		
		$scope.registros = [];

		// conexao firebase catequizandos
		var catequizandosRef = firebase.database().ref('catequistas').orderByChild("nome")
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

	fetchRegistros(0);

})
.controller('catequistaController', function($scope, $http, $routeParams, webService) {

	var controller = this;
	var idRegistro = $routeParams.id;

	$scope.registro = {};

	$scope.operacaoOK = false;
	$scope.operacaoErro = false;

	$scope.positions = [{lat:-3.121552,lng:-60.035365,title:""}];

	// adiciona catequista
	$scope.addRegistro = function() {


		// cria novo registro de turmas
		if ( idRegistro == undefined)
		{
			idRegistro  = firebase.database().ref("catequistas").push().getKey();
			$scope.registro.key = idRegistro ;
		}

		var updates = {};
		updates['/catequistas/' + idRegistro ] = $scope.registro;

  		// atualiza turmas
  		firebase.database().ref().update(updates);		

	};

	var fetchRegistro = function(id) {

		// conexao firebase turmas
		var cateqRef = firebase.database().ref('catequistas/' + $routeParams.id).orderByValue();

		cateqRef.on('value', function(data) {
			$scope.registro = data.val();
			$scope.$apply();

		});

	};

	// inicialia dados da tela
	var resetForm = function() {
		$scope.registro = {};
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

	fetchRegistro(idRegistro);
	
	//if ( $scope.listarTurma )
	//{
	//	fetchRegistrosTurma();
	//}
	

});