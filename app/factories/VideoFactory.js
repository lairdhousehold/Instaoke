"use strict";

app.factory("VideoFactory", ($q, $http, FirebaseURL, AuthFactory) => {
    let fireUser = firebase.auth().currentUser.uid
    let searchYouTube = () => {

        let data = []
        return $q((resolve, reject) => {
            $http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCwTRjvjVge51X-ILJ4i22ew&maxResults=10&q=me+too&key=AIzaSyAgzx6fyVGBB_4a4LM9Xv6HBjxY-eqj7Hc`)
                .success((dataObject) => {
                    Object.keys(dataObject).forEach((key) => {
                        dataObject[key] = key;
                        data.push(dataObject[key]);
                    })
                    resolve(data);
                })
                .error((error) => {
                    reject(error);

                })
        })
    };

    let getSavedVideos = (userId) => {
        // console.log(firebase.auth().currentUser);
        let items = [];
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/videos.json?orderBy="userId"&equalTo="${fireUser}"`)

            .success((itemObject) => { //Receive an object from Firebase, object contains each item list inside
                    Object.keys(itemObject).forEach((key) => { //Takes every key in an object passed in and makes an array of each key. So we create an array of each FB item--doable because there's only one key in each object w/in larger/single Firebase object, and that's the object ID (aka name)
                        itemObject[key].id = key; //Here we are setting a property on each object called id and making it synonymous with the object's name/sole key in larger Firebase object; SET A PROPERTY ON EACH ITEM OBJECT, AS IDENTIFIED BY ITS KEY, SYNONYMOUS WITH THAT KEY
                        items.push(itemObject[key]); //Here we are pushing each each object into array
                    });

                    resolve(items); //Here we resolve: we officially have itemObject
                    console.log(items)
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

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
            $http.post(`${FirebaseURL}/videos.json`, JSON.stringify(newItem))
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
            $http.delete(`${FirebaseURL}/videos/${itemId}.json`)
                .success((objFromFirebase) => {
                    resolve(objFromFirebase);
                });
        });
    };

    let getSingleVideo = (videoId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/videos/${videoId}.json`)
                .success((singleItem) => {
                    resolve(singleItem);
                });
        });
    };

    let rateVideo = (itemId, editedItem) => {
        return $q((resolve, reject) => {
            $http.patch(`${FirebaseURL}/videos/${itemId}.json`, JSON.stringify(editedItem))
                .success((result) => {
                    resolve(result);

                });
        });
    };
    let editVideo = (videoId, editedItem) => {
        return $q ( (resolve, reject) => {
            $http.patch(`${FirebaseURL}/items/${itemId}.json`, JSON.stringify(editedItem))
            .success( (result) => {
               resolve(result);

        });
    });
};


    return { searchYouTube, getSingleVideo, saveVideo, getSavedVideos, deleteVideo, rateVideo }
});
