'use strict';

angular.module('myApp.addArticle', ['ngRoute', 'dataService', 'angularTrix'])

.controller('addArticleCtrl', ['$scope', '$http', '$routeParams', 'dataFirebase', function($scope,$http,$routeParams,dataFirebase) {
  
  //date picker js starts
  $(function () {
    $('#newdateSelection').datetimepicker({
      format: 'DD - MMMM - YYYY   //   dddd'
    });
  }); 
  // date picker ends
  //Add Articles to database script starts
  $scope.addArticles = function(){
    var articleObj={};
    articleObj.subId = parseInt($routeParams.subId);
    articleObj.title = $scope.formData.articleTitle;
    articleObj.subtitle = $scope.formData.TabTitle;
    articleObj.date = $scope.formData.dateSelection;
    articleObj.article = $scope.formData.articleDescription;
    articleObj.authorname = $scope.formData.authorName;
    dataFirebase.addArticle(articleObj);
  }
}]);