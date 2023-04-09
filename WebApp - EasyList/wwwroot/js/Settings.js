function Settings() {
    this.InitView = function () {

        var ctrlActions = new ControlActions();
        var userPermissions = [];
        this.userId = localStorage.getItem('userId');

        if (this.userId) {
            var urlService = ctrlActions.GetUrlApiService(
                'ManagePermission' + '/getPermissionsById?id=' + this.userId
            );

            $.getJSON(urlService, function (permissions) {
                userPermissions = permissions.map(function (permission) {
                    return permission.permission_id;
                })

                if (!userPermissions.includes(9)) {
                    $('#tendersModule').hide();
                }

                if (!userPermissions.includes(10)) {
                    $('#productsModule').hide();
                }

                if (!userPermissions.includes(7)) {
                    $('#usersModule').hide();
                }

                if (!userPermissions.includes(14)) {
                    $('#membershipsModule').hide();
                }

                if (!userPermissions.includes(11)) {
                    $('#permissionsModule').hide();
                }

                if (!userPermissions.includes(12)) {
                    $('#reportsModule').hide();
                }

                if (!userPermissions.includes(13)) {
                    $('#auditLogModule').hide();
                }
            });

        }
    }
}

$(document).ready(function () {
    var settings = new Settings();
    settings.InitView();
});
