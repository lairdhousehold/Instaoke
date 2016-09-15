"use strict";

app.controller("PageCtrl", function ($scope, $location, $window, AuthFactory){
    $scope.isLoggedIn = false;

    firebase.auth().onAuthStateChanged(function(user){
        if (user){
            $scope.isLoggedIn = true;
            console.log("Current user logged in?", user.uid)
            $scope.$apply();
        } else {
            $scope.isLoggedIn = false;
            $window.location.href = '#/login'
        }
    });

    $scope.logout = function (){
        AuthFactory.logoutUser()
        .then(function(data){
            console.log('logged out', data)
        })
    }

});
