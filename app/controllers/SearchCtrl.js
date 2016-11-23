"use strict";


app.controller("SearchCtrl", function($scope, $http, $sce, VideoFactory, AuthFactory, searchTermData, $interpolate, $location) {


    $scope.saveVideos = function(video) {

        VideoFactory.saveVideo(video)
            .then(function() {
                $location.url('/video')
                console.log("clicked")
            });
    };

    $scope.getVideos = function(val) {
        $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: 'AIzaSyAgzx6fyVGBB_4a4LM9Xv6HBjxY-eqj7Hc',
                part: 'snippet',
                // channelId: 'UCwTRjvjVge51X-ILJ4i22ew',
                type: 'video',
                q: val+"karaoke"
            }
        }).success(function(data) {
            $scope.data = data.items;
            $scope.data.forEach(function(video) {
                video.videoID = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + video.id.videoId);
                console.log(video)
            });
            $scope.toggle = function() {
                $scope.myVar = !$scope.myVar;
            };
        });
    };
    // $scope.saveMovie = function(currentMovie) => {
    //   let userId = firebase.auth().currentUser.uid;
    //   return firebase.database().ref('users/' + userId).push(currentVideo);
    // }
});
