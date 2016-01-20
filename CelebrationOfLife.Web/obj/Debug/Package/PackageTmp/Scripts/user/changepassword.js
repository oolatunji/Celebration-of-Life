angular
    .module("changepasswordapp", [])
	.controller("changePasswordController", ['$scope', '$http', function ($scope, $http) {
	    $scope.newpassword = "";
	    $scope.confirmnewpassword = "";
	    $scope.username = "";
	    $scope.disableButton = false;
	    $scope.save = function () {
	        $scope.user = window.sessionStorage.getItem("loggedInUser");
	        if ($scope.user === null || $scope.user == "") {
	            window.sessionStorage.setItem('msg', "Your session has expired. Kindly login again.");
	            window.location = "../Admin/";
	        } else {
	            var err = customValidation($scope.newpassword, $scope.confirmnewpassword);
	            if (err != "") {
	                displayMessage("error", err, "Password Management");
	            } else {
	                $scope.disableButton = true;

	                var data = { Username: JSON.parse($scope.user).Username, Password: $scope.newpassword };
	                $http.put(settingsManager.websiteURL + "api/UserAPI/ChangePassword", data).
                        success(function (data, status, headers) {
                            //Remove local storages before redirecting to the login page
                            window.sessionStorage.removeItem("loggedInUser");

                            window.sessionStorage.setItem('msg', "Password was changed successfully. You will be redirected shorthly to login with your new password.");

                            window.location.href = "../Admin/";

                            $scope.disableButton = false;
                        }).
                        error(function (data, status, headers) {
                            displayMessage("error", "An error occurred: " + data, "Password Management");
                            $scope.disableButton = false;
                        });
	            }
	        }
	    }
	}]);

function customValidation(newpassword, confirmnewpassword) {
    var err = "";
    var missingFields = "";
    var errCount = 0;
    if (newpassword == "") {
        missingFields += "New Password";
        errCount++;
    }
    if (confirmnewpassword == "") {
        missingFields += missingFields == "" ? "Confirm New Password" : ", Confirm New Password";
        errCount++;
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required.";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required.";
    } else if (missingFields == "" && (confirmnewpassword != newpassword)) {
        err = "Ensure that the two password fields are the same";
    }
    return err;
}