"use strict";

app.controller("VideoListCtrl", function($scope, $sce, $location, VideoFactory, AuthFactory, searchTermData) {

    $scope.searchText = searchTermData;
    VideoFactory.getSavedVideos()
        .then((videoCollectionArr) => {
            console.log("video collection", videoCollectionArr)
            $scope.data = videoCollectionArr;

        });

    $scope.go = function(path) {
        $location.path(path);
    };

    $scope.deleteVideos = (itemId) => {
        VideoFactory.deleteVideo(itemId)
            .then((response) => {
                VideoFactory.getSavedVideos()
                    .then((videoCollectionArr) => {
                        $scope.data = videoCollectionArr;
                    });

            });
    };

});
// .success(function(data){
//       $scope.data = data.items;
//       $scope.data.forEach(function(video){
//         video.videoID = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + video.id.videoId);
//       });
//     });
