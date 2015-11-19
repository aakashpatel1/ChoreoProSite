angular.module('myApp.schedule2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule2', {
    templateUrl: 'schedule/schedule2.html',
    controller: 'schedule2Ctrl'
  });
}])

    .controller('schedule2Ctrl', ['$scope' , '$location' , function($scope , $location) {
        $scope.formInfo = {};
        $scope.saveData = function() {
            console.log($scope.formInfo);
        };

        $scope.goBack = function(path) {
            $location.path(path);
        };

        $scope.goForward = function(path) {
            $location.path(path);
        };

    }])

    //make form validation for both schediling pages