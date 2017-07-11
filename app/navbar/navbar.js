'use strict';

angular.module('myApp.navbar', ['ngRoute', 'dataService'])

.controller('navbarCtrl', ['$scope', '$http', '$routeParams', 'dataFirebase', '$rootScope', function($scope,$http,$routeParams,dataFirebase,$rootScope) {

    function init(){
        $scope.mainTitle = dataFirebase.getMainTitles();
        $scope.subTitle = dataFirebase.getSubTitiles();    
    }
    init();

    $rootScope.$on('DATA_RECEIVED', function(scope) {
        init();
        if (!$rootScope.$$phase) {
          $scope.$apply();  
        }
    });
    
    // Add Component to database script starts
    $scope.addComponent = function(){
      dataFirebase.addMainTitle($scope.formData.companyname);
    }

    // Add Component to database script starts
    $scope.addComponentTitle = function(){
        var subTitleObj = {};
        subTitleObj.title = $scope.formData.registerContentTitle;
        subTitleObj.mainId = dataFirebase.getSelectedMainId();
        dataFirebase.addSubTitle(subTitleObj);
    }

    $scope.onAddSubtitle = function(id){
      dataFirebase.setSelectedMainId(id);
    }
}]);