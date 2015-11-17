
angular.module('myApp.schedule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'schedule/schedule.html',
    controller: 'scheduleCtrl'
  });
}])

    .controller('scheduleCtrl', function($scope, $http) {
        $scope.comingSoon = "Coming Soon!";
    });