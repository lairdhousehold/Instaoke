"use strict";

app.controller("PageCtrl", function($scope, $location, $window, AuthFactory) {
    $scope.isLoggedIn = false;
    let userId = null;

    firebase.auth().onAuthStateChanged(function(user) {
        console.log("authAtateChanged", user);
        if (user) {
            userId = user.uid;
            $scope.isLoggedIn = true;
            console.log("Current user logged in?", user.uid, $scope.isLoggedIn)
            $window.location.href = '#/video'
        } else {
            $scope.isLoggedIn = false;
            $window.location.href = '#/login'
        }
        $scope.$apply();
    });
    $scope.getUser = function() {
        console.log("user")
        return userId;
    }


    $scope.logout = function() {
        AuthFactory.logoutUser()
            .then(function(data) {
                console.log('logged out', data)
            })
    }

});
