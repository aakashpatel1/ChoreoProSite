angular.module('myApp.scheduled', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scheduled', {
    templateUrl: 'schedule/scheduled.html',
    controller: 'scheduledCtrl'
  });
}])

    .controller('scheduledCtrl', ['$scope' , function($scope , $http) {

    }])
