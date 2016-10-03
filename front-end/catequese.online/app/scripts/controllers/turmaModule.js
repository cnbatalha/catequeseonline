'use strict';

var turmaModule = angular.module('turmaModule', ['ui.bootstrap']);

turmaModule.controller('turmaController', function($scope, $http, webService) {

	$scope.registros = [];


	var updateLista = function ( item) {
		$scope.registros.push(item);
		$scope.$apply();
	}

	var fetchRegistros = function() {

		webService.fbGetTurmas(updateLista);
	}

	// removenr turma
	$scope.removerTurma = function( t )
	{
		// conexao firebase turmas
		var turmaRef = firebase.database().ref('turmas');
		turmaRef.child(t.key).remove();
		//turmaRef.remove();
		//turmaRef.remove(function(error) {
    	//	alert(error ? "Uh oh!" : "Success!");
  		//});
	}

	fetchRegistros();

	$scope.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});

turmaModule.controller('turmaListaController', function($scope, $uibModal, $http, $routeParams, TurmaService, webService, utilService) {

	// controller
	var controller = this;

	// id da turma selecionada
	$scope.idTurma = $routeParams.id;
	
	// total de catequizandos
	$scope.total = 0;

	// turma atual
	$scope.turma = {};

	// registro de catequizandos
	$scope.registros = [];

	// conexao firebase turmas
	var recentPostsRef = firebase.database().ref('turmas/' + $routeParams.id).orderByValue();
	
	// evento consultando turmas
	recentPostsRef.on('value', function(data) {
	  	$scope.turma = data.val();
	  	$scope.$apply();
	  	$scope.registros = [];


	  	if ("catequizandos" in  $scope.turma)
	  	{
			$scope.total = $scope.turma.catequizandos.size;

		  	// consultando catequizandos da turma
		  	for (var variable in $scope.turma.catequizandos) {
	 		   	//console.log(variable);

				var catequizandosRef = firebase.database().ref('catequizandos/' + variable).orderByValue();

				catequizandosRef.on('value', function(data) {				
					var catequizando = data.val();
					catequizando.key = data.key;
					$scope.registros.push(catequizando);
					$scope.$apply();

				});
			}
		}

	});		

	// salva turma
	$scope.salvarTurma = function()
	{

		// cria novo registro de turmas
		if ( $scope.idTurma == undefined)
		{
			$scope.idTurma  = firebase.database().ref("turmas").push().getKey();
			$scope.turma.key = $scope.idTurma ;
		}

		var updates = {};
  		updates['/turmas/' +$scope.idTurma ] = $scope.turma;

  		// atualiza turmas
  		firebase.database().ref().update(updates);		
	}

	// lista de turmas
	$scope.turmas = [];

	// carregando turmas
	var fetchTurmas = function() {

		// webService.getTurmaList().then(function(value) {
		//	$scope.turmas = value;
		// });
	}

	fetchTurmas();

	// exportando excel
	$scope.exportarExcel = function(e)
	{
		//window.open('data:application/vnd.ms-excel,' + $('dvData').html());
    	//e.preventDefault();

    	$scope.printDiv('dvData');
    }

    // exportanto excel
    $scope.printDiv = function(divName) {
    	var printContents = document.getElementById(divName).innerHTML;
    	var popupWin = window.open('', '_blank', 'width=800,height=600');
    	popupWin.document.open();
    	popupWin.document.write('<html><head><link rel="stylesheet" href="styles/main.css"></head><body onload="window.print()">' + printContents + '</body></html>');
    	popupWin.document.close();
    }	 

    // remove catequizando da turma
    $scope.removerCatequizando =  function(catequizando) {

		var updates = {};

		// verificando se pos
		if ("turmas" in catequizando)
		{
			if ($scope.idTurma in catequizando.turmas)			
			{
    			delete catequizando.turmas[$scope.idTurma];				
  				updates['/catequizandos/' + catequizando.key + '/turmas'] = catequizando.turmas;    			
			}
		}

    	delete $scope.turma.catequizandos[catequizando.key];
  		updates['/turmas/' +$scope.idTurma + '/catequizandos'] = $scope.turma.catequizandos;

  		firebase.database().ref().update(updates);

    }

    var localizaTurma = function(idTurma) {

    	$scope.turma = $.grep($scope.turmas, function(e, i) {
    		return e.id == idTurma;
    	});

    	$scope.turma = $scope.turma[0];
    	console.log($scope.turma);
    	return $scope.turma;
    }

    // localizaTurma($scope.idTurma );

    $scope.formatData = function(data) {
    	var dateFormat = new Date(data);
    	return dateFormat.toLocaleDateString();
    }

    $scope.animationsEnabled = true;

    // abrindo panel para selecionar catequizando
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

    	// retorno do panel de catequizandos
    	modalInstance.result.then(function (selectedItem) {

    		$scope.selectedItem = selectedItem;    		    		
    		$scope.registros.push($scope.selectedItem);

			//if (!("turmas" in selectedItem))
			//{
			//	selectedItem.turmas = {};
			//}	    		


			// vunculando catequizando as turmas
			var updates = {};
  			updates['/catequizandos/' + selectedItem.key + '/turmas/' + $scope.idTurma] = true;
  			updates['/turmas/' +$scope.idTurma + '/catequizandos/' + selectedItem.key] = true;

  			firebase.database().ref().update(updates);

  			// return firebase.database().ref().update(updates);

			// https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js

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
