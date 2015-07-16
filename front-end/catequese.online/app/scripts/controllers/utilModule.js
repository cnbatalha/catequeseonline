'use strict';

var catequeseUtilServices = angular.module('catequeseUtilServices', []);

catequeseUtilServices.service('utilService', function() {

	var service = this;

	service.formatData = function(data) {
		dateFormat = new Date(data);
		return dateFormat.toLocaleDateString();
	}

});