"use strict";

app.factory("AuthFactory", function($window) {


    let createUser = function(userObj) {
        console.log('userObj ', userObj);
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
            })
    }

    let loginUser = function(userObj) {
        console.log('Login userObj ', userObj);
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
            })
    };

    let isAuthenticated = function() {
        return (firebase.auth().currentUser) ? true : false;

    }

    let logoutUser = function() {
        return firebase.auth().signOut();

    }

    let getUserId = function(user) {
        let userId = null;
        return (firebase.auth().currentUser)

        userId = user.uid
    }

    return { createUser, getUserId, isAuthenticated, loginUser, logoutUser }

});
