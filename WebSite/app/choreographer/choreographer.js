angular.module('myApp.choreographer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choreographer', {
    templateUrl: 'choreographer/choreographer.html',
    controller: 'choreographerCtrl'

  });
}])
.controller('choreographerCtrl', function($scope, $http) {
    $http.get("http://192.168.0.132:8080/choreographers",  {
        headers: {  'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Origin': '*'
                 }
    })
        .success(function (response) {
            $scope.choreographers = response;
            console.log(response);
        });
});

