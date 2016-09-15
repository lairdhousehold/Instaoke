"use strict";

app.controller("VideoListController", function($scope, $location, VideoFactory, Authfactory, searchTermData){
  $scope.searchText = searchTermData;
  VideoFactory.searchYouTube()
  .then((videoCollectionArr)=>{
    $scope.data.items = videoCollectionArr;
    console.log("video collection" , videoCollectionArr)
  });

})
