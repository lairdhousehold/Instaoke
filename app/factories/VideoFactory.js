"use strict";

app.factory("VideoFactory", ($q, $http, $scope, FirebaseURL, AuthFactory) => {

function searchYouTube(title) {
  let vidSearch = $scope.videoSearch
  let data = []
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCwTRjvjVge51X-ILJ4i22ew&maxResults=10&q=${vidSearch}&key=AIzaSyAgzx6fyVGBB_4a4LM9Xv6HBjxY-eqj7Hc`,
      method: 'GET'
    }).done(function(data){
      console.log('this is the data', data);
      console.log('yo',data.items[2].id.videoId)
      let pic = data.items.snippet.thumbnails.default
      let videoId = data.items.id.videoId
      let videoTitle = data.items.snippet.title

      resolve(data);
    }).fail(function(error){
      reject(error);
    });
  });
}
function saveVideo(currentMovie) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId).push(currentMovie);
}

function getSavedVideos() {
  if (firebase.auth().currentUser) {
    let userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('users/' + userId)
      .once('value')
      .then(function(snapshot) {
      var data = snapshot.val();
      return data;
    });
  } else {
    return new Promise(function(resolve,reject) {
      resolve();
    })
  }
}

function deleteVideo(key) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId + "/" + key).remove();
}

function updateVideo (movieId, property){
  let userId = firebase.auth().currentUser.uid;
  return new Promise(function(resolve,reject){
    $.ajax({
      url: `https://movie-history-7fd8a.firebaseio.com//users/${userId}/${movieId}.json`,
      method: 'PATCH',
      data: JSON.stringify(property),
      dataType: "json"
    }).done(function(movie){
      console.log(movie);
      resolve(movie);
    }).fail(function(error){
      reject(error);
    });
  });
}
return {searchYouTube, saveVideo, getSavedVideos, deleteVideo, updateVideo}
});
