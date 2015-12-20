preloadImages([
			'images/butt-bg-hover.gif',
			'images/nav-a-hover.jpg'
])

$(document).ready(function () {
    var options = {
        clearForm: true,
        success: function () {
            var req = $('.request');
            req.fadeIn();
            setTimeout(function () { req.fadeOut() }, 7000)
        }
    };
    $('form,\.contact').ajaxForm(options);

    $('#modalHeaderLightBlue').on('hidden.bs.modal', function (e) {
        $('.flexslider').remove();
    })    
})

$(document).ready(function () {
    $('#carousel').elastislide({
        imageW: 238,
        minItems: 1,
        margin: 46,
        border: 0,
        current: 0
    });
    $('#carousel').elastislide('add');

    getContent();

    displayContent();
});

jQuery(function ($) {
    $(window).load(function () {
        $(".someclass").fadeOut(500);
    });
});


function getContent() {

    if ($.fn.DataTable.isDataTable('#categoryList')) {

        var table = $('#categoryList').DataTable();
        table.ajax.url(settingsManager.websiteURL + 'api/ContentAPI/RetrieveContent').load();

    } else {
        var table = $('#categoryList').DataTable({
            "processing": true,

            "ajax": settingsManager.websiteURL + "api/ContentAPI/RetrieveContent",

            "columns": [
                { "data": "Category.Name" },
                {
                    "className": 'view-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": 'View'
                },
                {
                    "data": "Category.Content",
                    "visible": false
                },
                {
                    "data": "Category.ID",
                    "visible": false
                }
            ],

            "order": [[0, "asc"]]
        });

        $('#categoryList tbody').on('click', 'td.view-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var data = row.data();

            var categoryId = data.Category.ID;
            var categoryType = data.Category.Type;
            var categoryName = data.Category.Name;
            var content = data.Category.Content;

            var category = {};

            category = {
                Id: categoryId,
                Type: categoryType,
                Name: categoryName,
                Content: content
            };

            if (window.localStorage.getItem('programmeDetail') != null) {
                window.sessionStorage.removeItem('programmeDetail');
            }

            window.localStorage.setItem('programmeDetail', JSON.stringify(category));

            displayContent();

            location.href = "#programmedetail";
        });

        $("#categoryList tfoot input").on('keyup change', function () {
            table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    }
};

function displayContent() {

    $('#content').html('');
    $('#image_placeholder').html('');

    var category = JSON.parse(window.localStorage.getItem('programmeDetail'));

    if (category != null) {

        $('#category').html(category.Name.toUpperCase());

        if (_.isEqual(category.Type, 'Text')) {

            $("#showGallery").hide();

            $('#content').html(category.Content);

        } else if (_.isEqual(category.Type, 'Image')) {

            var images = '';

            $.each(category.Content, function (key, value) {
                images += '<img alt="image" src="' + value + '"  style="height:150px;width:150px; border: 2px solid silver; padding: 3px 5px;">';
            });

            $("#showGallery").show();

            $('#image_placeholder').html(images);
        }
    } else {
        location.href = '#programme';
    }
}

$(document).ready(function () {
    $('#dataTables-categoryList').DataTable({
        responsive: true
    });
});

function backToList() {
    location.href = "#programme";
}

$(document).on("click", "#showGallery", function () {
    
    var category = JSON.parse(window.localStorage.getItem('programmeDetail'));

    if (category != null) {

        $('.flexslider-container').append('<div class="flexslider"><ul class="slides"></ul></div>');

        $('.slides').html('');

        $('#categoryTitle').html(category.Name.toUpperCase());

        var images = '';

        $.each(category.Content, function (key, value) {
            images += '<li><img alt="image" src="' + value + '"  style="cursor:pointer; height:350px;width:100%; border: 2px solid silver; padding: 3px 5px;"></li>';
        });

        $('.flexslider ul.slides').html(images);

        $('.flexslider').flexslider({
            animation: "fade",
            easing: "swing",
            controlNav: true,
            slideshowSpeed: 4000
        });
    }
});

