function getHomeText() {
    return 'This is the Home Page! Please Enter Text Here!';
}

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])

.controller('homeCtrl', function($scope) {

    // create a message to display in our view
    $scope.homeText = getHomeText();
});