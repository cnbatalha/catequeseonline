'use strict';

/**
 * @ngdoc function
 * @name catequeseonlineApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the catequeseonlineApp
 */
 angular.module('catequeseonlineApp')
 .controller('MainCtrl', function ( $scope, $http, $window, $timeout, webService, Excel ) {

 	this.awesomeThings = [
 	'HTML5 Boilerplate',
 	'AngularJS',
 	'Karma'
 	];


 	$scope.turmas = [];
  var turmasAux = [];

 	$scope.exportToExcel=function(tableId){ 

 		var exportHref=Excel.tableToExcel(tableId,'sheet name');
 		$timeout(function(){location.href=exportHref;},100); 
 	}; 

 	$scope.formatData = function(data) {
 		var dateFormat = new Date(data);
 		return dateFormat.toLocaleDateString();
 	};

 	var fetchTurmas = function() {

 		// var recentPostsRef = firebase.database().ref('catequizandos/').orderByChild("nome").startAt("A").endAt("A\uf8ff");

 		// var recentPostsRef = firebase.database().ref('catequizandos/turmas').orderByChild("turmas/-KLmd5k4CqEqS6JPzLe6");

 		var recentPostsRef = firebase.database().ref('turmas').orderByChild("nome").limitToFirst(8);		
 		// -KLiNSOqJcAC62KDbwwk - catequizando
 		// -KLmd5k4CqEqS6JPzLe6 - turma
				
		
		/*recentPostsRef.on('value', function(data) {
        
        $scope.turmas = data.val();
        $scope.$apply();
        console.log($scope.turmas);    

		});*/
 		

    
		recentPostsRef.once('value', function(data) {
  		  // $scope.turmas = data.val();
  		  // console.log($scope.turmas);
        
        data.forEach(function(childSnapshot) {
          // key will be "fred" the first time and "barney" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          childData.key = key;

          $scope.turmas.push(childData);
          $scope.$apply();

          //console.log(key);
          //console.log(childData);

        }); 
  	});

 	};

 	$scope.aniversarios = [];

 	var d = new Date();
 	$scope.mes = d.getMonth() +1;

 	var fechAniversariantes = function() {
 		//webService.aniversarioCatequizando($scope.mes).then(function(value) {
 		//	$scope.aniversarios = value;
 		//}, function() {
    //  
 		//}, function() {
    //  
 		//});
 	};


 	$scope.substrNome = function( nome )
 	{
 		return nome.substr(0,20) + '...';
 	};



 	$scope.positions = [{lat:-3.121552,lng:-60.035365,title:"Paróquia Nsa. Glória"}];

 	$scope.addMarker = function(event) {
 		var ll = event.latLng;
 		$scope.positions.push({lat:ll.lat(), lng: ll.lng()});
 	};


 	$scope.export = function(id)
 	{
 		tableToExcel()
 		//window.open('data:application/vnd.ms-excel,' + $(id).html());
   		// e.preventDefault();
   	}

   	fetchTurmas();
   	fechAniversariantes();



   });
