angular
    .module("mainApp", [])
	.controller("categoryController", function () {
	    GetCategories();
	});

function GetCategories() {

    $('#categoryList tfoot th').each(function () {
        var title = $('#categoryList tfoot th').eq($(this).index()).text();
        if (title != "")
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    if ($.fn.DataTable.isDataTable('#categoryList')) {

        var table = $('#categoryList').DataTable();
        table.ajax.url(settingsManager.websiteURL + 'api/CategoryAPI/RetrieveCategories').load();

    } else {
        var table = $('#categoryList').DataTable({
            "processing": true,

            "ajax": settingsManager.websiteURL + "api/CategoryAPI/RetrieveCategories",

            "columns": [
                {
                    "className": 'edit-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                { "data": "Name" },
                {
                    "data": "ID",
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

        $('#categoryList tbody').on('click', 'td.edit-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);

            function closeAll() {
                var e = $('#categoryList tbody tr.shown');
                var rows = table.row(e);
                if (tr != e) {
                    e.removeClass('shown');
                    rows.child.hide();
                }
            }

            if (row.child.isShown()) {
                closeAll();
            }
            else {
                closeAll();

                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
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

function format(d) {
    var table = '<table width="60%" class="cell-border" cellpadding="5" cellspacing="3" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;">Category Name:</td>';
    table += '<td><input class="form-control" placeholder="Enter Category Name" id="name" value="' + d.Name + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="display:none">ID:</td>';
    table += '<td style="display:none"><input class="form-control" id="id" value="' + d.ID + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;"></td>';
    table += '<td><button type="button" id="updateBtn" class="btn btn-outline btn-primary" onclick="update();">Update</button></td>';
    table += '</tr>';
    table += '</table>';

    return table;
}

function update() {
    var name = $('#name').val();
    var id = $('#id').val();
    var err = customUserValidation(name);
    if (err != "") {
        displayMessage("error", 'Error encountered: ' + err, "Category Management");
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var data = { ID: id, Name: name };
        $.ajax({
            url: settingsManager.websiteURL + 'api/CategoryAPI/UpdateCategory',
            type: 'PUT',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (response) {
                displayMessage("success", response, "Category Management");
                GetCategories();
                $("#updateBtn").removeAttr("disabled");
            },
            error: function (xhr) {
                displayMessage("error", 'Error experienced: ' + xhr.responseText, "Category Management");
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }
}

function customUserValidation(name) {
    var err = "";
    var validationErr = "";
    var missingFields = "";
    var errCount = 0;
    if (name == "") {
        missingFields += "Category Name";
        errCount++;
    }

    if (missingFields != "" && errCount == 1) {
        err = "The field " + missingFields + " is required. ";
    } else if (missingFields != "" && errCount > 1) {
        err = "The following fields " + missingFields + " are required. ";
    }

    if (validationErr != "" && err == "") {
        err = "Enter a " + validationErr;
    } else if (validationErr != "" && err != "") {
        err += "Also enter a " + validationErr;
    }
    return err;
}