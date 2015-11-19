angular.module('myApp.schedule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'schedule/schedule.html',
    controller: 'scheduleCtrl'
  });
  }])

    .controller('scheduleCtrl', ['$scope' , '$location' , function($scope , $location) {
        $scope.formInfo = {};
        $scope.saveData = function() {
        	console.log($scope.formInfo);
        };

        $scope.go = function(path) {
        	$location.path(path);
        };
    

    }])
