"use strict";
var app = angular.module("InstaOkeApp", ["ngRoute"])
.constant('FirebaseURL','https://instaoke.firebaseio.com/');
//Module takes two arguments: name and array of dependencies
//Module has pseudo-global scope
//Controllers (functions) have local/lexical scope

// App/module is an object upon which we are creating properties
// Data in a controller communicates through scope to template view

//ROUTE = URL OF APPLICATION, NOT PATH TO FILES

app.config(function($routeProvider){
    $routeProvider.
      when ('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
        }).
      when ('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
        when("/items/list", { //Here we are creating a URL and equating it with its associated partial
            templateUrl: 'partials/item-list.html', //Note that the grammar here specifies "Url", not all upper-case ("URL")
            controller: "ItemListCtrl"
        }).
        when("/items/new", {
            templateUrl: 'partials/item-form.html',
            controller: "ItemNewCtrl"
        }).
        when('/items/view/:itemId', {
            //The above "/: whatever" syntax is particular to URL's for which we'll be using $routeParams ... $routeParams stands in for (:)?????
            templateUrl: "partials/item-details.html",
            controller: "ItemViewCtrl"
        }).

        when('/items/edit/:itemId', {
        templateUrl: 'partials/edit-task.html',
        controller: 'ItemEditCtrl'
         }).

        otherwise("items/item-list");
        //The above is a safety URL that prevents users from accessing URL's that we don't want them to
});

//what you do right when the app runs
app.run( ($location, FBCreds) => {
        let creds = FBCreds;
        let authConfig = {
            apiKey: creds.key,
            authDomain: creds.authDomain
        };

firebase.initializeApp(authConfig);
});
