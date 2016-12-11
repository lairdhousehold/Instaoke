"use strict";

app.factory("VideoFactory", ($q, $http, FirebaseURL, AuthFactory) => {
    let fireUser = firebase.auth().currentUser.uid

let getSavedVideos = (userId) => {
        let items = [];
        return $q((resolve, reject) => {

            $http.get(`${FirebaseURL}/videos.json?orderBy="userId"&equalTo="${fireUser}"`)


            .success((itemObject) => {
                    Object.keys(itemObject).forEach((key) => {
                        itemObject[key].id = key;
                        items.push(itemObject[key]);
                    });

                    resolve(items);
                    console.log(items)
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

function getSavedVideos() {
  if (firebase.auth().currentUser) {
    let userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('videos/' + userId)
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

    let saveVideo = function(video) {
        let newItem = {
            title: video.snippet.title,
            videoId: video.id.videoId,
            userId: firebase.auth().currentUser.uid,
            pic: video.snippet.thumbnails.medium,
            comments: ''
        }
        console.log("save video", newItem);
        return $q(function(resolve, reject) {
            $http.post(`${FirebaseURL}/${fireUser}/videos.json`, JSON.stringify(newItem))
                .success((ObjFromFirebase) => {
                    resolve(ObjFromFirebase); //
                })
                .error((error) => {
                    reject(error);
                    console.log("button clicked")
                });
        });
    };

    let deleteVideo = (itemId) => {
        return $q((resolve, reject) => {
            $http.delete(`${FirebaseURL}/${fireUser}/videos/${itemId}.json`)
                .success((objFromFirebase) => {
                    resolve(objFromFirebase);
                    console.log(objFromFirebase)
                });
        });
    };

    let getSingleVideo = (videoId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/${fireUser}/videos/.json`)
                .success((singleItem) => {
                    resolve(singleItem);
                });
        });
    };


    let editVideo = (videoId, commentedVideo) => {
        return $q((resolve, reject) => {
            $http.patch(`${FirebaseURL}/${fireUser}/${videoId}.json`, JSON.stringify(commentedVideo))
                .success((result) => {
                    resolve(result);

                });
        });
    };


    return { getSingleVideo, editVideo, saveVideo, getSavedVideos, deleteVideo }
});
