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

		webService.getCatequistaList(pageIndex).then(function(value) {
			$scope.page.loadPage(value);
			$scope.registros = $scope.page.content;
		});
	};

	fetchRegistros(0);

})
.controller('catequistaController', function($scope, $http, $routeParams, webService) {

	

});