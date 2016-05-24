'use strict';

(function() {

	angular.module('catequeseServices')

	.factory('CatequistaService', ['$resource', '$rootScope',

		function ($resource, $rootScope) {

			var catequistaId = '';
			var operacao = '';
			var enabled = false;

			return $resource("", {},
			{
				'getAll': {method: "GET", params: {currentPage: "@currentPage", sizePage: "@sizePage", tipo: "@tipo"}, 
				url: $rootScope.urlBase +'/catequista/page/:currentPage/:sizePage/:tipo' },
				'searchByName': { method: "GET", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value", tipo: "@tipo"},
				url: $rootScope.urlBase +'/catequista/nome/page/:currentPage/:sizePage/:tipo/:value' },
				'search': { method: "POST", params: {currentPage: "@currentPage",  sizePage: "@sizePage", value: "@value"},
				url: $rootScope.urlBase +'/catequista/page/:currentPage/:sizePage/:tipo/value/:value' },
				'create': { method: "POST", url: $rootScope.urlBase + 'catequista'},
				'get': { method: "GET", params: {id: "@id"}, url: $rootScope.urlBase + 'catequista/id/:id' },
				'remove': { method: "DELETE", params: {id: "@id"},  url: $rootScope.urlBase + 'catequista/:id' },
				'update': { method: "POST",  url: $rootScope.urlBase + 'catequista'}
			});

		}]);

})();
