'use strict';

(function() {

	angular.module('catequeseServices')

	.factory('CatequizandoService', ['$resource', '$rootScope',

		function ($resource, $rootScope) {

			var catequizandoId = '';
			var operacao = '';
			var enabled = false;

			return $resource("", {},
			{
				'getAll': {method: "GET", params: {currentPage: "@currentPage", sizePage: "@sizePage", tipo: "@tipo"}, 
				url: $rootScope.urlBase +'/catequizando/page/:currentPage/:sizePage/:tipo' },
				'searchByName': { method: "GET", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value"},
				url: $rootScope.urlBase +'/catequizando/nome/:value/page/:currentPage/:sizePage' },
				'search': { method: "POST", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value"},
				url: $rootScope.urlBase +'/catequizando/page/:currentPage/:sizePage/:tipo/value/:value' },
				'create': { method: "POST", url: $rootScope.urlBase + 'catequizando'},
				'get': { method: "GET", params: {id: "@id"}, url: $rootScope.urlBase + 'catequizando/id/:id' },
				'remove': { method: "DELETE", params: {id: "@id"},  url: $rootScope.urlBase + 'catequizando/:id' },
				'update': { method: "POST",  url: $rootScope.urlBase + 'catequizando'}
			});

		}]);

})();
