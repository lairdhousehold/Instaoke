"use strict";

app.controller("VideoListCtrl", function($scope, $sce, $location, VideoFactory, AuthFactory, searchTermData) {

  $scope.searchText = searchTermData;
  VideoFactory.getSavedVideos()
  .then((videoCollectionArr)=>{
    console.log("video collection" , videoCollectionArr)
    $scope.data = videoCollectionArr;
    console.log()

  });
  let videoItemPlay= null;
  $scope.getOneVideo =(videoItem) =>{
    VideoFactory.getSingleVideo(videoItem)
    .then((videoItem) =>{
      $scope.data = videoItem
    }).
    then (function(videoItem){
      videoItemPlay = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoItem);
    })
    .then(function(){
      $location.url('/singleVideo')
      console.log(videoItemPlay)
    })
  }

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
