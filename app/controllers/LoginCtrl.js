"use strict";

app.controller("LoginCtrl", function ($scope, $window, AuthFactory) {
    $scope.account = {
        email: '',
        password: ''
        // userId: ''
    };

    $scope.register = () => {
        console.log("you clicked register");
        AuthFactory.createUser ({
            email: $scope.account.email,
            password: $scope.account.password
        })
        .then( (userData ) => {
        console.log("new User", userData);
        if(userData) {
        $scope.login();
        }
    })
        .catch((error) => {
            console.log(`error creating user: ${error}`);
        })

}
    $scope.login = () => {
        console.log("you clicked login");
        AuthFactory.loginUser($scope.account)
        .then( (userData ) => {
            if (userData) {
                $window.location.href ="#/video"
                console.log(userData)
                // console.log(userData.uid)
            }
            else {
               $window.location.href = "#/login"
            }

            })
        }
});
