"use strict";

var app = angular.module('homePage', []);

app.controller('homePageCtrl', function($scope, $http) {
    $scope.news = []; // myjson
    $scope.localNews = []; // localStorage
    $scope.allNews = []; // myjson + localStorage
    $scope.post = { // form info
        displayName: null,
        createdAt: null,
        message: null
    };
    $scope.sortColumn = "name";
    $scope.reverseSort = false;

    $scope.getNews = function() {
        $http.get('https://api.myjson.com/bins/zijyf').success(function(response) { // my data inform
            $scope.news = response;
            $scope.localNews = (localStorage.getItem('localNews')) ? JSON.parse(localStorage.getItem('localNews')) : [];
            $scope.allNews = $scope.localNews.concat($scope.news); // news + localNews = allNews (new arry)
        });
    }
    $scope.getNews();

    $scope.sortData = function(column) { // date sort
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;
    }

    $scope.addMessage = function(post) { // submit
        if (!post.displayName || !post.message) {} else {
            // Date inform
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1; // 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            post.createdAt = month + '/' + day + "/" + year;

            $scope.localNews = (localStorage.getItem('localNews')) ? JSON.parse(localStorage.getItem('localNews')) : [];
            $scope.localNews.push(post);
            localStorage.setItem('localNews', JSON.stringify($scope.localNews));
            $scope.getNews(); //add new message in ng-repeat
            $scope.myStyle = { 'display': 'none' }; //close popup
        }
    }
});