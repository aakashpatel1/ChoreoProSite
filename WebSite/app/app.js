'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
<<<<<<< HEAD
  'ngRoute',
  'myApp.home',
  'myApp.contact',
  'myApp.choreographer',
  'myApp.schedule',
  'myApp.schedule2',
  'myApp.scheduled',
  'myApp.version',
=======
    'ngRoute',
    'ngResource',
    'myApp.home',
    'myApp.contact',
    'myApp.choreographer',
    'myApp.schedule',
    'myApp.version',
>>>>>>> origin/dev
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]).
config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
