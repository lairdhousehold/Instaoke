"use strict";

app.controller("VideoListCtrl", function($scope, $location, VideoFactory, AuthFactory, searchTermData) {

  $scope.searchText = searchTermData;
  VideoFactory.getSavedVideos()
  .then((videoCollectionArr)=>{
    console.log("video collection" , videoCollectionArr)
    $scope.data = videoCollectionArr;
    console.log()

  });

  $scope.deleteVideos = (itemId) => {
    VideoFactory.deleteVideo(itemId)
    .then( (response) => {
      VideoFactory.getSavedVideos()
      .then((videoCollectionArr) => {
           $scope.items = videoCollectionArr;
      });

    });
  };

});
