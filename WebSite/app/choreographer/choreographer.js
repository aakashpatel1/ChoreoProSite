angular.module('myApp.choreographer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choreographer', {
    templateUrl: 'choreographer/choreographer.html',
    controller: 'choreographerCtrl'
  });
}])

    .controller('choreographerCtrl', function($scope, $http) {
        $http.get("choreographer/choreographer.json")
            .success(function (response) {
                $scope.choreographers = response.choreographers;
            });
    });