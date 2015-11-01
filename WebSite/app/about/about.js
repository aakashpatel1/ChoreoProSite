function getAboutText() {
    return "This is the about page. Please enter about info here.";
}

angular.module('myApp.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'aboutCtrl'
        });
    }])

.controller('aboutCtrl', function($scope) {

    // create a message to display in our view
    $scope.aboutText = getAboutText();
});

