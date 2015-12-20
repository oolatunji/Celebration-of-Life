var categories = {};
var names = [];

$(document).ready(function () {

    $("#txtEditor").Editor();
    $("#textCategory").hide();
    $("#imageCategory").hide();
    $("#buttons").hide();

    $('#contentCategory').html('<option>Loading Content Categories...</option>');
    $('#contentCategory').prop('disabled', 'disabled');

    getCategories().then(function (response) {
        categories = response.data;
        displayCatergories();
    }, function (err) {
        displayMessage("error", 'Error experienced: ' + err.responseText, "Category Management");
    });
});

function getCategories() {
    //Get Categories
    return new Promise(function (fulfill, reject) {
        $.ajax({
            url: settingsManager.websiteURL + 'api/CategoryAPI/RetrieveCategories',
            type: 'GET',
            async: true,
            cache: false,
            success: function (response) {
                fulfill(response);
            },
            error: function (xhr) {
                reject(xhr);
            }
        });
    });
}

function displayCatergories() {

    $('#contentCategory').html('');
    $('#contentCategory').prop('disabled', false);
    $('#contentCategory').append('<option value="">Select Content Category</option>');

    var html = '';
    $.each(categories, function (key, value) {
        $('#contentCategory').append('<option value="' + value.ID + '">' + value.Name + '</option>');
    });
}

function loadTypePanel(value) {

    if (!_.isEmpty(value)) {
        var categoryId = _.parseInt(value);
        var categoryType = _.result(_.findWhere(categories, { 'ID': categoryId }), 'Type');
        var categoryName = _.result(_.findWhere(categories, { 'ID': categoryId }), 'Name');

        if (_.isEqual(categoryType, 'Text')) {

            $("#textCategory").show();
            $("#imageCategory").hide();

            $('#categoryHeader').html(categoryName);
            $('#categoryFooter').html(categoryName);

        } else if (_.isEqual(categoryType, 'Image')) {

            $("#textCategory").hide();
            $("#imageCategory").show();

            $('#imageHeader').html(categoryName);
            $('#imageFooter').html(categoryName);

        }
        $("#buttons").show();
    } else {
        $("#textCategory").hide();
        $("#imageCategory").hide();
        $("#buttons").hide();
    }
}

function loadImageFileAsURL() {

    var filesSelected = document.getElementById("image_to_load").files;

    var potential_property_images = document.getElementById("potential_images");

    var nameExist = false;

    if (filesSelected.length > 0) {

        var fileToLoad = filesSelected[0];

        if (fileToLoad.type.match("image.*")) {

            var maxFileSize = settingsManager.fileSize;

            var fileSize = fileToLoad.size;

            if (fileSize <= maxFileSize) {

                $('#images').show();

                var filename = fileToLoad.name.replace(/\s/g, "");

                $.each(names, function (key, name) {
                    if (name == filename) {
                        nameExist = true;
                    }
                });

                if (!nameExist) {
                    names.push(filename);

                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var div = document.createElement("div");
                        div.id = filename;
                        div.style.display = "block";
                        div.style.height = "250px";
                        div.style.width = "280";
                        div.style.marginRight = "5px";
                        div.style.marginTop = "10px";
                        div.style.cssFloat = "left";

                        var imageLoaded = document.createElement("img");
                        imageLoaded.src = fileLoadedEvent.target.result;
                        imageLoaded.style.height = 'auto';
                        imageLoaded.style.width = 'auto';
                        imageLoaded.style.maxHeight = '250px';
                        imageLoaded.style.maxWidth = '280';
                        imageLoaded.name = "gallery_images";
                        div.appendChild(imageLoaded);

                        var removeImageLoadedIcon = document.createElement("img");
                        removeImageLoadedIcon.src = "../images/details_close.png";
                        removeImageLoadedIcon.onclick = function () {
                            var divToRemove = document.getElementById(filename);
                            div.parentNode.removeChild(div);
                            names.splice(names.indexOf(filename), 1);
                        };

                        div.appendChild(removeImageLoadedIcon);

                        potential_property_images.appendChild(div);
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
                else
                    displayMessage("error", 'Selected Image has been uploaded already. Select another image to continue.', "Web Content Management");
            }
            else {
                displayMessage("error", 'Image size is too big. Maximum image size allowed per upload is 500KB. Compress the file and re-upload.', "Web Content Management");
            }
        } else {
            displayMessage("error", 'Image Selected. Kindly choose a valid image.', "Web Content Management");
        }
    } else {
        displayMessage("error", 'Select a valid image to upload.', "Web Content Management");
    }
}

function publishContent() {

    var catID = $("#contentCategory").val();

    if (_.isEmpty(catID)) {

        displayMessage("error", 'Web content category is required.', "Web Content Management");

    } else {

        var categoryId = _.parseInt(catID);
        var categoryType = _.result(_.findWhere(categories, { 'ID': categoryId }), 'Type');

        var category = {
            Id: categoryId,
            Type: categoryType,
        };

        if (_.isEqual(categoryType, 'Text')) {

            var webContentCount = $('#txtEditor').Editor("getWordCount");

            if (_.parseInt(webContentCount) > 185) {

                displayMessage("error", 'Maximum content word count allowed is 185. Kindly modify accordingly', "Web Content Management");

            } else {

                var webContentText = $('#txtEditor').Editor("getText");

                if (_.isEmpty(webContentText)) {

                    displayMessage("error", 'Content is required.', "Web Content Management");

                } else {

                    var webContent = {
                        Category: category,
                        CategoryText: webContentText
                    }

                    $('#publishBtn').html('<i class="fa fa-spinner fa-spin"></i> Publishing Content...');
                    $("#publishBtn").attr("disabled", "disabled");

                    $.ajax({
                        url: settingsManager.websiteURL + 'api/ContentAPI/SaveContent',
                        type: 'POST',
                        data: webContent,
                        processData: true,
                        async: true,
                        cache: false,
                        success: function (response) {
                            displayMessage("success", response, "Web Content Management");

                            $('#contentCategory').val('');
                            $("#txtEditor").Editor('setText', "");
                            $("#textCategory").hide();
                            $("#buttons").hide();

                            if (window.sessionStorage.getItem('webContent') != null) {
                                window.sessionStorage.removeItem('webContent');
                            }

                            $("#publishBtn").removeAttr("disabled");
                            $('#publishBtn').html('<i class="fa fa-video-camera"></i> Publish Content');
                        },
                        error: function (xhr) {
                            displayMessage("error", 'Error experienced: ' + xhr.responseText, "Web Content Management");
                            $("#publishBtn").removeAttr("disabled");
                            $('#publishBtn').html('<i class="fa fa-video-camera"></i> Publish Content');
                        }
                    });
                }
            }

        } else {

            var images = document.getElementsByName("gallery_images");

            var gallery_images = [];

            $.each(images, function (key, image) {
                gallery_images.push(image.src.split(',')[1]);
            });

            if (_.size(gallery_images) <= 0) {

                displayMessage("error", 'Images are required.', "Web Content Management");

            } else {

                var webContent = {
                    Category: category,
                    Images: gallery_images
                }

                $('#publishBtn').html('<i class="fa fa-spinner fa-spin"></i> Publishing Content...');
                $("#publishBtn").attr("disabled", "disabled");

                $.ajax({
                    url: settingsManager.websiteURL + 'api/ContentAPI/SaveContent',
                    type: 'POST',
                    data: webContent,
                    processData: true,
                    async: true,
                    cache: false,
                    success: function (response) {
                        displayMessage("success", response, "Web Content Management");

                        $('#contentCategory').val('');
                        $('#potential_images').html('');
                        $("#imageCategory").hide();
                        $("#buttons").hide();

                        names = [];

                        if (window.sessionStorage.getItem('webContent') != null) {
                            window.sessionStorage.removeItem('webContent');
                        }

                        $("#publishBtn").removeAttr("disabled");
                        $('#publishBtn').html('<i class="fa fa-video-camera"></i> Publish Content');
                    },
                    error: function (xhr) {
                        displayMessage("error", 'Error experienced: ' + xhr.responseText, "Web Content Management");
                        $("#publishBtn").removeAttr("disabled");
                        $('#publishBtn').html('<i class="fa fa-video-camera"></i> Publish Content');
                    }
                });
            }
        }
    }
}