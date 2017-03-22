"use strict";

var app = angular.module('homePage', []);

app.controller('homePageCtrl', function ($scope, $http) {
    $scope.news = [];
    $http.get('https://api.myjson.com/bins/zijyf').success(function (response) {
        $scope.news = response;
    });

    // Date inform
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    $scope.newdate = month + '/' + day + "/" + year;
});