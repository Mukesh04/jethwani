'use strict';

angular.module('myApp.home', ['ngRoute', 'dataService', 'UserValidation', 'ngMessages', 'ngSanitize'])
.controller('homeCtrl', ['$scope', '$http', '$routeParams', 'dataFirebase', '$rootScope' , function($scope, $http, $routeParams, dataFirebase, $rootScope) {

    function init(){
        $scope.subtitle = dataFirebase.getSubTitiles();
        $scope.articles = dataFirebase.getArticles();
        getArticleBlock();    
    }

    init();

    $rootScope.$on('DATA_RECEIVED', function(scope) {
        init();
    });

    $(function () {
        $('#datetimepicker1, #datetimepicker2').datetimepicker({
        	format: 'DD - MMMM - YYYY   //   dddd'
        });
    }); 

    // connecting Article to Subtitle script starts
    function getArticleBlock(){
      var articleTitleId = !!parseInt($routeParams.articleId) ? parseInt($routeParams.articleId) : 1;
      $scope.articleTitleId = articleTitleId;
      $scope.selectedArticles = _.filter($scope.articles, function(article){
        return article.subId === articleTitleId;
      });
    }  

    $scope.removeArticleBlock = function(){
        confirm("Are You Sure To Delete The Article Block");
    }
}]);


// password validation script starts
angular.module('UserValidation', []).directive('validPasswordC', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue, $scope) {
        var noMatch = viewValue != scope.loginForm.password.$viewValue;
        ctrl.$setValidity('noMatch', !noMatch);
      })
    }
  }
});
// password validation script ends



    // For reference
    // Main Titles
    // dataFirebase.addMainTitle("Hello World Sammy here");

    //Sub Titles
    // dataFirebase.addSubTitle("Welcome Sammy", 1);

    //Artcles
    // let articleObj = {};
    // articleObj.subid = 1;
    // articleObj.title = "sammy";
    // articleObj.subtitle = "ssss";
    // articleObj.date = "thursday, 11 april 2013";
    // articleObj.article = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    // articleObj.authorname = "Ramesh G Jethwani Bangalore.";
    // dataFirebase.addArticle(articleObj);
