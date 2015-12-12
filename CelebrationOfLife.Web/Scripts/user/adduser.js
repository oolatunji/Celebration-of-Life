var mainApp = angular.module("mainApp", []);

mainApp.controller('userController', ['$scope', '$http', function ($scope, $http) {

    $scope.user = {};

    $scope.user = {
        Lastname: '',
        Othernames: '',
        Email: '',
        Username: ''
    };

    $scope.save = function () {
        if (_.isEmpty($scope.user.Lastname) || _.isEmpty($scope.user.Othernames) || _.isEmpty($scope.user.Email) || _.isEmpty($scope.user.Username)) {
            displayMessage("error", 'All fields are required', "User Management");
        } else {
            factory.colService.saveObject($scope.user, $http, 'api/UserAPI/SaveUser').then(function (response) {
                displayMessage("success", response, "User Management");
            }, function (err) {
                displayMessage("error", 'Error experienced: ' + err, "User Management");
            });
        }
    };

    $scope.reset = function () {
        $scope.user = {
            Lastname: '',
            Othernames: '',
            Email: '',
            Username: ''
        };
    }

}]);