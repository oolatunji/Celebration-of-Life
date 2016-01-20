angular
    .module("signinapp", [])
	.controller("signInController", ['$scope', '$http', function ($scope, $http) {

	    if (window.sessionStorage.getItem('msg') != null) {
	        displayMessage("success", window.sessionStorage.getItem('msg'), "Login Management");
	        window.sessionStorage.removeItem('msg');
	    }

	    $scope.username = "";
	    $scope.password = "";
	    $scope.disableButton = false;
	    $scope.functions = [];
	    $scope.save = function () {
	        var err = customLoginValidation($scope.username, $scope.password);
	        if (err != "") {
	            displayMessage("error", err, "Login Management");
	        } else {
	            $scope.disableButton = true;
	            var data = { Username: $scope.username, Password: $scope.password };
	            $http.post(settingsManager.websiteURL + "api/UserAPI/AuthenticateUser", data).
                    success(function (data, status, headers) {

                        //Remove local storages if they exist before adding new ones
                        if (window.sessionStorage.removeItem("loggedInUser") != null)
                            window.sessionStorage.removeItem("loggedInUser");

                        //Add new local storages
                        window.sessionStorage.setItem("loggedInUser", JSON.stringify(data));

                        window.location = ("../Admin/Dashboard");
                        $scope.disableButton = false;
                    }).
                    error(function (data, status, headers) {
                        displayMessage("error", 'An error occurred while signing you in. ' + data, "Login Management");
                        console.log(data);
                        $scope.disableButton = false;
                    });
	        }
	    }
	}]);

function customLoginValidation(username, password) {
    var err = "";
    var missingFields = "";
    var errCount = 0;
    if (username == "") {
        missingFields += "Username";
        errCount++;
    }
    if (password == "") {
        missingFields += missingFields == "" ? "Password" : ", Password";
        errCount++;
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required.";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required.";
    }
    return err;
}