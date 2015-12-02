angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
    }])


.controller('homeCtrl', function($scope, $http) {
        $http.get("http://192.168.0.132:8080/pageElements/2",  {
            headers: {  'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .success(function (response) {
                for (var x = 0; x < response.length; ++x) {
                    if (response[x].AttributeName == "Title")
                        $scope.title = response[x].AttributeText;
                    if (response[x].AttributeName == "Text")
                        $scope.text = response[x].AttributeText;
                    if (response[x].AttributeName == "imageSource")
                        $scope.imageSource = response[x].AttributeText;
                    if (response[x].AttributeName == "TestimonialOne")
                        $scope.testimonialOne = response[x].AttributeText;
                    if (response[x].AttributeName == "TestimonialTwo")
                        $scope.testimonialTwo = response[x].AttributeText;
                    if (response[x].AttributeName == "TestimonialThree")
                        $scope.testimonialThree = response[x].AttributeText;
                }
            });
});
