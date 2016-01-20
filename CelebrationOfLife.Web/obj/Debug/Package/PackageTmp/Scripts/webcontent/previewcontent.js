$(document).ready(function () {
    if (window.sessionStorage.getItem('webContent') == null) {

        location.href = '../Admin/CreateWebContent';

    } else {

        $('#textCategory').hide();
        $('#imageCategory').hide();

        var webContent = JSON.parse(window.sessionStorage.getItem('webContent'));
        console.log(webContent);
        if (webContent.Type === 'Text') {

            $('#textCategory').show();
            $('#categoryHeader').html(webContent.Name);
            $('#webContent').html(webContent.Content);

        } else {

            $('#imageCategory').show();
            $('#imageHeader').html(webContent.Name);

            var divHtml = '<div>';
            $.each(webContent.Content, function (key, image) {
                var src = image;
                var imgHtml = '<img src="' + src + '" style="height:auto;width:auto;max-height:250px;max-width:300px;margin-right:5px;margin-top:10px"/>';
                divHtml += imgHtml;
            });
            divHtml += '</div>';
            $('#potential_images').html(divHtml);
        }
    }
});

function backToList() {
    location.href = '../Admin/ViewWebContent';
}