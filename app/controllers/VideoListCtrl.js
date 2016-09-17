"use strict";

app.controller("VideoListCtrl", function($scope, $location, VideoFactory, AuthFactory, searchTermData) {
  $scope.searchText = searchTermData;
  VideoFactory.searchYouTube()
  .then((videoCollectionArr)=>{
    console.log("video collection" , videoCollectionArr)
    $scope.data = videoCollectionArr;
    console.log()

  });

  $scope.deleteVideo = (videoId) => {
    VideoFactory.searchYouTube(videoId)
    .then( (response) => {
      VideoFactory.searchYouTube()
      .then((videoCollectionArr) => {
      $scope.items = videoCollectionArr;

      });
    });
  };

});
