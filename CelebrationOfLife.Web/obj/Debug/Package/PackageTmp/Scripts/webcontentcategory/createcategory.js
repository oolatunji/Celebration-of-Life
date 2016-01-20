var mainApp = angular.module("mainApp", []);

mainApp.controller('categoryController', ['$scope', '$http', function ($scope, $http) {

    $scope.category = {};

    $scope.selectedCategory = '';

    $scope.category = {
        Name: '',
        Type: ''
    };

    $scope.categorytype = [
            { name: 'Text', id: 'Text' },
            { name: 'Image', id: 'Image' }
    ];

    $scope.save = function () {
        $scope.category.Type = $scope.selectedCategory.id;
        if (_.isEmpty($scope.category.Name) || _.isEmpty($scope.category.Type)) {
            displayMessage("error", 'Category name and type are required', "Category Management");
        } else {
            factory.colService.saveObject($scope.category, $http, 'api/CategoryAPI/SaveCategory').then(function (response) {
                displayMessage("success", response, "Category Management");
            }, function (err) {
                displayMessage("error", 'Error experienced: ' + err, "Category Management");
            });
        }
    };

    $scope.reset = function () {

        $scope.selectedCategory = '';

        $scope.category = {
            Name: '',
            Type: ''
        };
    }

}]);