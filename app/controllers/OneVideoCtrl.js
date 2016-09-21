"use strict";

app.controller("OneVideoCtrl", function($scope, $sce, $routeParams, $location, $interpolate, VideoFactory, AuthFactory, searchTermData) {
    console.log("OneVideoCtrl", $routeParams.videoId);

        $scope.currentVideo={};
        $scope.currentPath = "";

        VideoFactory.getSingleVideo($routeParams.videoId)
            .then((response) => {
                $scope.currentVideo = response;


                $scope.currentPath = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + $scope.currentVideo.videoId);
                console.log("one vid", $scope.currentPath)

                // $scope.videos = videoCollectionArr;
                // $scope.selectedVideo = $scope.videos.filter(function(videos) {
                //     return video.id === $routeParams.videoId;
                //     console.log(video.id)
                // })[0];
            });






    $scope.runVideoEdit = function(changedItem) {
        let id = $routeParams.itemId;
        console.log(id)
        ItemStorage.editItem(id, changedItem)
            .then(() =>
                console.log(changedItem)
            )

        //First subsequent function post-editItem-promise: console.log the edited item
        .then(function() {
                $location.url('/video');
            })
            .then(function() {
                console.log(id)
            })
            //Second subsequent function post-editItem-promise: $location changes the url back kick to item/list view:


        //NOTICE THAT TO CHAIN YOUR THENS YOU CAN'T USE A SEMI-COLON UNTIL THE VERY LAST ONE

    };

});
