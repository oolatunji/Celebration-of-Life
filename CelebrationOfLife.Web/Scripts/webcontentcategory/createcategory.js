var mainApp = angular.module("mainApp", []);

mainApp.controller('categoryController', ['$scope', '$http', function ($scope, $http) {

    $scope.category = {};

    $scope.category = {
        Name: ''
    };

    $scope.save = function () {
        if (_.isEmpty($scope.category.Name)) {
            displayMessage("error", 'Category name is required', "Category Management");
        } else {
            factory.colService.saveObject($scope.category, $http, 'api/CategoryAPI/SaveCategory').then(function (response) {
                displayMessage("success", response, "Category Management");
            }, function (err) {
                displayMessage("error", 'Error experienced: ' + err, "Category Management");
            });
        }
    };

    $scope.reset = function () {
        $scope.category = {
            Name: ''
        };
    }

}]);