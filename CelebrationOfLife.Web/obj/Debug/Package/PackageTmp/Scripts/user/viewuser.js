angular
    .module("mainApp", [])
	.controller("userController", function () {
	    GetUsers();
	});

function GetUsers() {

    $('#userList tfoot th').each(function () {
        var title = $('#userList tfoot th').eq($(this).index()).text();
        if (title != "")
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });

    if ($.fn.DataTable.isDataTable('#userList')) {

        var table = $('#userList').DataTable();
        table.ajax.url(settingsManager.websiteURL + 'api/UserAPI/RetrieveUsers').load();

    } else {
        var table = $('#userList').DataTable({
            "processing": true,

            "ajax": settingsManager.websiteURL + "api/UserAPI/RetrieveUsers",

            "columns": [
                {
                    "className": 'edit-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                },
                { "data": "Lastname" },
                { "data": "Othernames" },
                { "data": "Username" },
                { "data": "Email" },
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

        $('#userList tbody').on('click', 'td.edit-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);

            function closeAll() {
                var e = $('#userList tbody tr.shown');
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

        $("#userList tfoot input").on('keyup change', function () {
            table
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    }
};

$(document).ready(function () {
    $('#dataTables-userList').DataTable({
        responsive: true
    });
});

function format(d) {
    var table = '<table width="60%" class="cell-border" cellpadding="5" cellspacing="3" border="2" style="padding-left:50px;">';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;">Lastname:</td>';
    table += '<td><input class="form-control" placeholder="Enter Lastname" id="lastname" value="' + d.Lastname + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;">Othernames:</td>';
    table += '<td><input class="form-control" placeholder="Enter Othernames" id="othernames" value="' + d.Othernames + '"/></td>';
    table += '</tr>';
    table += '<tr>';
    table += '<td style="color:navy;width:30%;font-family:Calibri;">Email:</td>';
    table += '<td><input class="form-control" placeholder="Enter Email" id="email" value="' + d.Email + '"/></td>';
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
    var lastname = $('#lastname').val();
    var othernames = $('#othernames').val();
    var email = $('#email').val();
    var id = $('#id').val();
    var err = customUserValidation(lastname, othernames, email);
    if (err != "") {
        displayMessage("error", 'Error encountered: ' + err, "User Management");
    } else {
        $("#updateBtn").attr("disabled", "disabled");
        var data = { ID: id, Lastname: lastname, Othernames: othernames, Email: email};
        $.ajax({
            url: settingsManager.websiteURL + 'api/UserAPI/UpdateUser',
            type: 'PUT',
            data: data,
            processData: true,
            async: true,
            cache: false,
            success: function (response) {
                displayMessage("success", response, "User Management");
                GetUsers();
                $("#updateBtn").removeAttr("disabled");
            },
            error: function (xhr) {
                displayMessage("error", 'Error experienced: ' + xhr.responseText, "User Management");
                $("#updateBtn").removeAttr("disabled");
            }
        });
    }
}

function customUserValidation(lastname, othernames, email) {
    var err = "";
    var validationErr = "";
    var missingFields = "";
    var errCount = 0;
    if (lastname == "") {
        missingFields += "Lastname";
        errCount++;
    }
    if (othernames == "") {
        missingFields += missingFields == "" ? "Othernames" : ", Othernames";
        errCount++;
    }
    if (email == "") {
        missingFields += missingFields == "" ? "Email" : ", Email";
        errCount++;
    }
    if (!validEmail(email) && email != "") {
        validationErr += "valid email";
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

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}