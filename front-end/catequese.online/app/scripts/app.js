'use strict';

/**
 * @ngdoc overview
 * @name catequeseonlineApp
 * @description
 * # catequeseonlineApp
 *
 * Main module of the application.
 */
 angular
 .module('catequeseonlineApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMap',
  'catequeseServices', 
  'catequeseUtilServices',
  'catequizandoModule',
  'catequistaModule',
  'turmaModule', 
  'AuthController',
  'AuthService'
  ])
 .config(function ($routeProvider) {

  $routeProvider

  /* login */
  .when('/', {
    title : "Login",
    templateUrl : 'views/login/login.html',
    controller : 'LoginController'
  }).when('/login', {
    templateUrl : 'views/login/login.html',
    controller : 'LoginController'
  }).when('/home', {
    templateUrl : 'views/home.html',
    controller : 'MainCtrl'
  })

  /* catequizando */
  .when('/catequizandolist', {
    templateUrl : 'views/catequizando/catequizandoList.html',
    controller : 'catequizandoListController'
  }).when('/catequizando', {
    templateUrl : 'views/catequizando/catequizando.html',
    controller : 'catequizandoController'
  }).when('/catequizando/:id', {
    templateUrl : 'views/catequizando/catequizando.html',
    controller : 'catequizandoController'
  }).when('/catequizandoturma/:id/:idturma', {
    templateUrl : 'views/catequizando/catequizando.html',
    controller : 'catequizandoController'
  })  .when('/aniversario', {
    templateUrl : 'views/catequizando/aniversario.html',
    controller : 'aniversarioController'
  })

  /* catequista */
  .when('/catequistaList', {
    templateUrl : 'views/catequista/catequistaList.html',
    controller : 'catequistaListController'
  })

  /* turma */
  .when('/turmalist', {
    templateUrl : 'views/turma/turmaList.html',
    controller : 'turmaController'
  }).when('/turma/:id', {
    templateUrl : 'views/turma/turma.html',
    controller : 'turmaListaController'
  }).

  otherwise('/');

}).controller('home', function($scope) {

  $scope.box = function() {

    /* bootbox.alert("Mensagem alerta", function(result) {
    }); */

};

}).controller('navigation', function($rootScope, $scope, $http, $location, webService) {

  $scope.auth = false;

  $scope.credentials = {};

  $scope.loginUser = function() {

    webService.login($scope.credentials.username, $scope.credentials.password).then(function(value) {
      $scope.auth = value;
      if ($scope.auth) {
        $location.path('/home');
      } else {
        $location.path('/');
      }
    }, function() {
      $location.path('/');
    }, function() {

    });

  };

  /*
   * var authenticate = function(callback) {
   * 
   * $http.get('user').success(function(data) { if (data.name) {
   * $rootScope.authenticated = true; } else { $rootScope.authenticated =
   * false; } callback && callback(); }).error(function() {
   * $rootScope.authenticated = false; callback && callback(); }); }
   * 
   * authenticate(); $scope.credentials = {}; $scope.login = function() {
   * $http.post('login', $.param($scope.credentials), { headers : {
   * "content-type" : "application/x-www-form-urlencoded" }
   * }).success(function(data) { authenticate(function() { if
   * ($rootScope.authenticated) { $location.path("/"); $scope.error = false; }
   * else { $location.path("/login"); $scope.error = true; } });
   * }).error(function(data) { $location.path("/login"); $scope.error = true;
   * $rootScope.authenticated = false; }) };
*/
}).run([ '$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint
    // ignore:line
  }

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    // redirect to login page if not logged in
    current = null;
    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
      $location.path('/login');
    }
  });
} ]).factory('authHttpResponseInterceptor', [ '$q', '$location', function($q, $location) {
  return {
    response : function(response) {
      if (response.status === 401) {
        console.log("Response 401");
      }
      return response || $q.when(response);
    },
    responseError : function(rejection) {
      if (rejection.status === 401) {
        console.log("Response Error 401", rejection);
        $location.path('/login').search('returnTo', $location.path());
      }
      return $q.reject(rejection);
    } 
  };
} ]).config([ '$httpProvider', function($httpProvider) {
  // Http Intercpetor to check auth failures for xhr requests
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
} ]);