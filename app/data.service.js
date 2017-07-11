'use strict';
  angular.module('dataService', ['firebase'])
  .service('dataFirebase', ['$firebaseArray', '$rootScope', function($firebaseArray, $rootScope) {

    let vm = this;

    let fbRef = firebase.database().ref();

    this.mainTitles = [];
    this.subTitles = [];
    this.articles = [];
    this.dataFlag = false;
    this.selectedMainId = 0;

    this.getSelectedMainId = function(){
      return this.selectedMainId;
    }

    this.setSelectedMainId = function(id){
     this.selectedMainId = id;
    }    

    this.getMainTitles = function(){
      return this.mainTitles;
    }

    this.getSubTitiles = function(){
      return this.subTitles
    }

    this.getArticles = function(){
      return this.articles;
    }

    this.mapData = function(datum, mapper){
      let vm = this;
      vm[mapper] = [];
      _.each(datum, function(data){
        if(data && data.id > 0){
          vm[mapper].push(data);
        }
      });
    };

    this.initailizeData = function(){
      let vm = this;
      fbRef.on("value", function(snapshot) {
        vm.mapData(snapshot.val()["main-titles"], "mainTitles");
        vm.mapData(snapshot.val()["sub-titles"], "subTitles");
        vm.mapData(snapshot.val()["articles"], "articles");
        $rootScope.$broadcast('DATA_RECEIVED');
      }, function (error) {
         console.log("Error: " + error.code);
      });
    }
    
    this.addMainTitle = function(title){
      let vm = this;
      fbRef.child('mainCounter').transaction(function(currentValue) {
        return (currentValue||0) + 1
      }, function(err, committed, ss){
        if( err ) {
          console.log(err);
        }
        else if(committed) {
          let reqObj = {};
          reqObj.title = title;
          reqObj.id = ss.val();
          fbRef.child('main-titles').child(reqObj.id).set(reqObj , function(err) {
            if(!err){
              vm.mainTitles.push(reqObj);
            }else{
              console.log(err);  
            }
          });
        }
      });
    }

    this.addSubTitle = function(subTitleObj){
      fbRef.child('subCounter').transaction(function(currentValue) {
        return (currentValue||0) + 1
      }, function(err, committed, ss){
        if( err ) {
          console.log(err);
        }
        else if(committed) {
          let reqObj = subTitleObj;
          reqObj.id = ss.val();
          fbRef.child('sub-titles').child(reqObj.id).set(reqObj , function(err) {
            if(!err){
              vm.mainTitles.push(reqObj);
            }else{
              console.log(err);  
            }
          });
        }
      });
    }

    this.addArticle = function(articleObj){
      fbRef.child('articleCounter').transaction(function(currentValue) {
        return (currentValue||0) + 1
      }, function(err, committed, ss){
        if( err ) {
          console.log(err);
        }
        else if(committed) {
          let reqObj = articleObj;
          reqObj.id = ss.val();
          fbRef.child('articles').child(reqObj.id).set(reqObj , function(err) {
            if(!err){
              vm.mainTitles.push(reqObj);
            }else{
              console.log(err);  
            }
          });
        }
      });
    }

    this.init = function(){
      let vm = this;
      if(!vm.dataFlag){
        vm.dataFlag = true;
        vm.initailizeData();
      }
    }

    vm.init();

}]);