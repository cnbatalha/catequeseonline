'use strict';

(function() {

	angular.module('catequeseServices')

	.factory('TurmaService', ['$resource', '$rootScope',

		function ($resource, $rootScope) {

			var turmaId = '';
			var operacao = '';
			var enabled = false;

			return $resource("", {},
			{
				'getAll': {method: "GET", params: {currentPage: "@currentPage", sizePage: "@sizePage", tipo: "@tipo"}, 
				url: $rootScope.urlBase +'/cliente/page/:currentPage/:sizePage/:tipo' },
				'searchByName': { method: "GET", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value", tipo: "@tipo"},
				url: $rootScope.urlBase +'/cliente/nome/page/:currentPage/:sizePage/:tipo/:value' },
				'search': { method: "POST", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value"},
				url: $rootScope.urlBase +'/cliente/page/:currentPage/:sizePage/:tipo/value/:value' },
				'getCatequizandos': { method: "GET",  params: {idTurma: "@idTurma"} , url: $rootScope.urlBase + '/turma/:idTurma/listcatequizando'},
				'addCatequizandos': { method: "POST",  params: {idTurma: "@idTurma"} , url: $rootScope.urlBase + '/turma/:idTurma/catequizando/add'},
				'delCatequizandos': { method: "POST",  params: {idTurma: "@idTurma"} , url: $rootScope.urlBase + '/turma/:idTurma/catequizando/delete'},
				'create' : { method: "GET", url: $rootScope.urlBase + '/turma'},
				'get': { method: "GET", params: {id: "@id"}, url: $rootScope.urlBase + 'turma/id/:id' },
				'remove': { method: "DELETE", params: {id: "@id"},  url: $rootScope.urlBase + 'turma/:id' },
				'update': { method: "POST",  url: $rootScope.urlBase + 'turma'}
			});

		}]);

})();
