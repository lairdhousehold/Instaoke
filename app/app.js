"use strict";
var app = angular.module("InstaOkeApp", ["ngRoute"])
    .constant('FirebaseURL', 'https://instaokie-a9d62.firebaseio.com/');
//Module takes two arguments: name and array of dependencies
//Module has pseudo-global scope
//Controllers (functions) have local/lexical scope

// App/module is an object upon which we are creating properties
// Data in a controller communicates through scope to template view

//ROUTE = URL OF APPLICATION, NOT PATH TO FILES

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();
    }
});

app.config(function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    }).
    when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
    }).
    when('/video', { //Here we are creating a URL and equating it with its associated partial
        templateUrl: 'partials/videoList.html', //Note that the grammar here specifies "Url", not all upper-case ("URL")
        controller: 'VideoListCtrl',
        resolve: { isAuth }
    }).
    when("/search", {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl',
        resolve: { isAuth }
    }).
    when('/video/:videoId', {
        templateUrl: 'partials/playVid.html',
        controller: 'OneVideoCtrl',
        resolve: { isAuth }
    }).

    otherwise("/");
    //The above is a safety URL that prevents users from accessing URL's that we don't want them to
});

//what you do right when the app runs
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain
    };

    firebase.initializeApp(authConfig);
});
