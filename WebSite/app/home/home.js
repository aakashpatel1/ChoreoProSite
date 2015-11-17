



angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])


.controller('homeCtrl', function($scope, $http) {
    $http.get("home/home.json")
        .success(function (response) {
            $scope.homePageText = response.homeText;
        });
});