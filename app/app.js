'use strict';

	// Declare app level module which depends on views, and components
	angular.module('myApp', ['ngRoute', 'firebase', 'myApp.home','myApp.profile','myApp.navbar', 'myApp.form', 'myApp.addArticle']).

	config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  		$locationProvider.hashPrefix('!');

    	$routeProvider
  		.when('/article', {
  		  templateUrl: 'home/home.html',
  		  controller: 'homeCtrl'
  		})
      .when('/article/:articleId', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      })
       .when('/addArticle', {
        templateUrl: 'add_Articles/addArticle.html',
        controller: 'addArticleCtrl'
      })
       .when('/addArticle/:subId', {
        templateUrl: 'add_Articles/addArticle.html',
        controller: 'addArticleCtrl'
      })
  		.when('/profile', {
  		  templateUrl: 'profile/profile.html',
  		  controller: 'profileCtrl'
  		})
  		.when('/navbar', {
  		  templateUrl: 'navbar/navbar.html',
  		  controller: 'navbarCtrl'
  		})
      .when('/form', {
        templateUrl: 'forms/form.html',
        controller: 'formCtrl'
      })
  		.otherwise({redirectTo: '/article'});
	}])

	.controller('mainController', function($scope){
    $scope.selectedSubId = 1;
    $scope.subtitleAttachArticle = function(subId){
        $scope.selectedSubId = subId;
    }
		$scope.registerModal = function() {
    		$('.registerWrapper').css('display', 'block');
    		$('.loginWrapper').css('display', 'none');
  	}
  	$scope.loginModal = function() {
    		$('.registerWrapper').css('display', 'none');
    		$('.loginWrapper').css('display', 'block');
  	}
	});


