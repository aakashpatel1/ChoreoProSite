angular.module('myApp.choreographer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choreographer', {
    templateUrl: 'choreographer/choreographer.html',
    controller: 'choreographerCtrl'
  });
}])
.factory('choreographerService', function($resource) {
    return $resource('http://localhost:5000/choreographer/api/v1.0/choreographers');
})
.controller('choreographerCtrl', function($scope, choreographerService) {
        var choreographers = choreographerService.query(function() {
            console.log(choreographers);
        }); //query() returns all the entries
    });



