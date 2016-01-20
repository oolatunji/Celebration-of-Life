$(document).ready(function () {

    if (window.sessionStorage.getItem("loggedInUser") === null) {
        window.sessionStorage.setItem('msg', "Your session has expired. Kindly login again.");
        window.location = '../Admin/';
    } else {
        var user = JSON.parse(window.sessionStorage.getItem("loggedInUser"));
        $('#user').html(user.Username);
    }
});


function logout() {
    window.sessionStorage.removeItem("loggedInUser");
    window.location = ("../Admin/");
}