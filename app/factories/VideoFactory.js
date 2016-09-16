"use strict";

app.factory("VideoFactory", ($q, $http, $scope, FirebaseURL, AuthFactory) => {

function searchYouTube(title) {

  let data = []
  return $q((reselve, reject)=>{
    $http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCwTRjvjVge51X-ILJ4i22ew&maxResults=10&q=${title}&key=AIzaSyAgzx6fyVGBB_4a4LM9Xv6HBjxY-eqj7Hc`)
    .success((dataObject)=> {
      Object.keys(dataObject).forEach((key) =>{
        dataObject[key].id = key;
        data.push(dataObject[key]);
      })
      resolve(data);
    })
    .error((error) =>{
      reject(error);

    })
  })
};

function saveVideo(currentMovie) {
  let userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('users/' + userId).push(currentVideo);
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
      url: `https://instaoke.firebaseio.com/users/${userId}/${videoId}.json`,
      method: 'PATCH',
      data: JSON.stringify(property),
      dataType: "json"
    }).done(function(movie){
      console.log(video);
      resolve(video);
    }).fail(function(error){
      reject(error);
    });
  });
}
return {searchYouTube, saveVideo, getSavedVideos, deleteVideo, updateVideo}
});
