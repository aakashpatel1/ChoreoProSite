function getChoreographerInfo() {
var choreographers = [
                        {
                          'firstName':'Johny',
                          'lastName':'Boy',
                          'bio':'I don\'t dance well, but I can spell like hell.'
                        },
                        {
                          'firstName':'Jessica Simpson',
                          'lastName':'Doe',
                          'bio':'Eye danz reel wel butt don no hoe to spel'
                        },
                        {
                          'firstName':'Donald',
                          'lastName':'Trump',
                          'bio':'i cant danse ore spell 4 meye lyfe'
                        },
                     ];
  return choreographers;
};

angular.module('myApp.choreographer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/choreographer', {
    templateUrl: 'choreographer/choreographer.html',
    controller: 'choreographerCtrl'
  });
}])

.controller('choreographerCtrl', function($scope) {

  // create a message to display in our view
  $scope.choreographers = getChoreographerInfo();
});