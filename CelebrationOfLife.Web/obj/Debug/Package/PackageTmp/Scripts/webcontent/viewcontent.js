angular
    .module("mainApp", [])
	.controller("categoryController", function () {
	    GetCategories();
	    if (window.sessionStorage.getItem('msg') != null) {
	        displayMessage("success", window.sessionStorage.getItem('msg'), "Web Content Management");
	        window.sessionStorage.removeItem('msg');
	    }
	});

function GetCategories() {

    $('#categoryList tfoot th').each(function () {
        var title = $('#categoryList tfoot th').eq($(this).index()).text();
        if (title != "")
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    if ($.fn.DataTable.isDataTable('#categoryList')) {

        var table = $('#categoryList').DataTable();
        table.ajax.url(settingsManager.websiteURL + 'api/ContentAPI/RetrieveContent').load();

    } else {
        var table = $('#categoryList').DataTable({
            "processing": true,

            "ajax": settingsManager.websiteURL + "api/ContentAPI/RetrieveContent",

            "columns": [
                {
                    "className": 'view-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": 'View'
                },
                {
                    "className": 'modify-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": 'Edit'
                },
                { "data": "Category.Name" },
                { "data": "Category.Type" },
                {
                    "data": "Category.Content",
                    "visible": false
                },
                {
                    "data": "Category.ID",
                    "visible": false
                }
            ],

            "order": [[2, "asc"]],

            "sDom": 'T<"clear">lrtip',

            "oTableTools": {
                "sSwfPath": settingsManager.websiteURL + "images/copy_csv_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "copy",
                        "sButtonText": "Copy to Clipboard",
                        "oSelectorOpts": { filter: 'applied', order: 'current' },
                        "mColumns": "visible"
                    },
                    {
                        "sExtends": "csv",
                        "sButtonText": "Save to CSV",
                        "oSelectorOpts": { filter: 'applied', order: 'current' },
                        "mColumns": "visible"
                    },
                    {
                        "sExtends": "xls",
                        "sButtonText": "Save for Excel",
                        "oSelectorOpts": { filter: 'applied', order: 'current' },
                        "mColumns": "visible"
                    }
                ]
            }
        });

        $('#categoryList tbody').on('click', 'td.view-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var data = row.data();

            var categoryId = data.Category.ID;
            var categoryType = data.Category.Type;
            var categoryName = data.Category.Name;
            var content = data.Category.Content;

            var category = {
                Id: categoryId,
                Type: categoryType,
                Name: categoryName,
                Content: content
            };

            if (window.sessionStorage.getItem('webContent') != null) {
                window.sessionStorage.removeItem('webContent');
            }

            window.sessionStorage.setItem('webContent', JSON.stringify(category));
            location.href = "../Admin/PreviewWebContent";
        });

        $('#categoryList tbody').on('click', 'td.modify-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            var data = row.data();

            var categoryId = data.Category.ID;
            var categoryType = data.Category.Type;
            var categoryName = data.Category.Name;
            var content = data.Category.Content;

            var category = {
                Id: categoryId,
                Type: categoryType,
                Name: categoryName,
                Content: content
            };

            if (window.sessionStorage.getItem('webContent') != null) {
                window.sessionStorage.removeItem('webContent');
            }

            window.sessionStorage.setItem('webContent', JSON.stringify(category));
            location.href = "../Admin/UpdateWebContent";
        });

        $("#categoryList tfoot input").on('keyup change', function () {
            table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    }
};

$(document).ready(function () {
    $('#dataTables-categoryList').DataTable({
        responsive: true
    });
});