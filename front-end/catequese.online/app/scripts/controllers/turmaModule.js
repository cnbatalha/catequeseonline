'use strict';

var turmaModule = angular.module('turmaModule', ['ui.bootstrap']);

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

turmaModule.controller('turmaListaController', function($scope, $uibModal, $http, $routeParams, TurmaService, webService, utilService) {

	var controller = this;
	var idTurma = $routeParams.id;

	$scope.idTurma = $routeParams.id;

	$scope.turma = {};
	$scope.turmas = webService.turmas;
	$scope.total = 0;

	$scope.turmas = [];

	var fetchTurmas = function() {

		webService.getTurmaList().then(function(value) {
			$scope.turmas = value;
		});
	}

	fetchTurmas();

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

    $scope.removerCatequizando =  function(idCatequizando) {

    	var idSelecionados = [];
    	idSelecionados.push(idCatequizando);

    	TurmaService.delCatequizandos({idTurma: $scope.idTurma}, angular.toJson(idSelecionados),

    		function(successResult) {

    			fetchRegistros();
              //if (successResult.status === 1) {
              //  EventoService.insertParticipante({evento: ev.id}, angular.toJson($scope.listaIdParticipantesEvento));
              // }
          });

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

    	TurmaService.getCatequizandos({idTurma:$scope.idTurma})
    	.$promise.then(function(value) {

    		$scope.registros = value.catequizandos;
			//setContent(value);
		}); 
    }

    fetchRegistros();

    $scope.formatData = function(data) {
    	var dateFormat = new Date(data);
    	return dateFormat.toLocaleDateString();
    }

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

    	var modalInstance = $uibModal.open({
    		animation: $scope.animationsEnabled,
    		templateUrl: 'views/catequizando/catequizando-modal.html',
    		controller: 'ModalCatequizandoCtrl',
    		size: size,
    		resolve: {
    			items: function () {
    				return $scope.items;
    			}
    		}
    	});

    	modalInstance.result.then(function (selectedItem) {
    		$scope.selectedItem = selectedItem;
    		$scope.registros.push($scope.selectedItem);

    		var idSelecionados = [];
    		idSelecionados.push($scope.selectedItem.id);

    		TurmaService.addCatequizandos({idTurma: $scope.idTurma}, angular.toJson(idSelecionados),

    			function(successResult) {

              //if (successResult.status === 1) {
              //  EventoService.insertParticipante({evento: ev.id}, angular.toJson($scope.listaIdParticipantesEvento));
              // }
          });

    		// webService.saveClienteFilho($scope.cliente.id, $scope.selectedItem.id);

    	}, function () {
    		$log.info('Modal dismissed at: ' + new Date());
    	});
    };
})
.controller('ModalCatequizandoCtrl', function($scope, $uibModalInstance, webService, CatequizandoService) {

	$scope.items = [];	

	$scope.inputSearch = '';	

	$scope.registros = [];

	$scope.findByName = function() {

		CatequizandoService.searchByName({currentPage:0, sizePage:10, value:$scope.inputSearch })
		.$promise.then(function(value) {

			$scope.registros = value.content;
			//setContent(value);
		}); 

		//webService.getClienteListByNome(0, $scope.inputSearch, 0, 5).then(function(value) {
			//$scope.page.loadPage(value);
		//	$scope.registros = value.content;
		//});
};    

$scope.selected = {
	item: $scope.items[0]
};

$scope.add = function (cliente) {
	$uibModalInstance.close(cliente);
};


$scope.ok = function () {
	$uibModalInstance.close();
};

$scope.cancel = function () {
	$uibModalInstance.dismiss('cancel');
};

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
