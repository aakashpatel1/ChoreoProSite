

angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact/contact.html',
            controller: 'contactCtrl'
        });
    }])

    .controller('contactCtrl', function($scope, $http) {
        $http.get("http://192.168.0.132:8080/attributesByPage/1",  {
            headers: {  'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .success(function (response) {
                for (var x = 0; x < response.length; ++x) {
                    if (response[x].AttributeName == "Email")
                        $scope.email = response[x].AttributeText;
                    if (response[x].AttributeName == "Phone")
                        $scope.phone = response[x].AttributeText;
                    if (response[x].AttributeName == "Address")
                        $scope.address = response[x].AttributeText;
                }
            });
    });
