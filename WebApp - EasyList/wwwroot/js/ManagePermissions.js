//Controla el comportamiento de la página/vista de Users.cshtml

var fullName;
var user_id;

//Definición de la clase ManagePermissions
function ManagePermissions() {
    this.ViewName = 'ManagePermissions';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('User init');

        //Llamado al evento de cargar la tabla con toda la data de usuarios
        this.LoadTable();
    };

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/getAllUsers'
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'name' };
        arrayColumnsData[2] = { 'data': 'firstLastName' };
        arrayColumnsData[3] = { 'data': 'secondLastName' };
        arrayColumnsData[4] = { 'data': 'email' };
        arrayColumnsData[5] = { 'data': 'phone' };
        arrayColumnsData[6] = { 'data': 'registrationDate' };
        arrayColumnsData[7] = { 'data': 'userStatus' };

        $('#tblManagePermission').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        $('#tblManagePermission tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');

            var data = $('#tblManagePermission').DataTable().row(tr).data();

            user_id = data.id;

            fullName = data.name + " " + data.firstLastName + " " + data.secondLastName;

            $('#username').text(fullName);

            this.permissionsView = new PermissionsView();

            this.LoadTable = function () {
                $('#tblPermission').DataTable().destroy();
                this.permissionsView.LoadTable();
            };

            this.LoadTable();

        });

    };

    this.ReloadTable = () => {
        $('#tblManagePermission').DataTable().ajax.reload();
    };

}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new ManagePermissions();
    view.InitView();
});

//Definición de la clase PermissionsView
function PermissionsView() {
    this.ViewName = 'PermissionsView';
    this.ApiService = 'Permission';
    this.tableLoaded = false; // agregar la bandera

    this.InitView = function () {
        console.log('Permission init');

        //Llamado al evento de cargar la tabla con toda la data de permisos
        this.LoadTable();
    };

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var urlService = ctrlActions.GetUrlApiService(this.ApiService + '/getAllPermissions');
        var arrayColumnsData = [
            { 'data': 'id' },
            { 'data': 'name' },
            { 'data': 'description' },
            {
                'data': null,
                'render': function (data, type, full, meta) {
                    return '<input type="checkbox" class="form-check-input" value="false" id="permission-' + full.id + '">';
                }
            }
        ];

        var table = $('#tblPermission').DataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': ''
            },
            'columns': arrayColumnsData,
            'initComplete': function () {
                var rows = table.rows().data();
                for (var i = 0; i < rows.length; i++) {
                    checkPermission(rows[i].id);
                }
            }
        });
    };

    function checkPermission(id) {
        var checkpermission = {
            id: 0,
            user_id: user_id,
            permission_id: 0
        };

        var user_check = checkpermission.user_id;

        // Obtener el valor numérico de permission_id a partir del id del elemento HTML
        var permission_element = document.querySelector("#permission-" + id);
        var permission_id = permission_element ? parseInt(permission_element.id.split("-")[1]) : null;

        if (user_check && permission_id) {
            checkpermission.permission_id = permission_id;

            // llamado a la API para iniciar sesión
            var ctrlActions = new ControlActions();
            var serviceCreate = "ManagePermission/checkPermission";
            ctrlActions.PostToAPIv1(serviceCreate, checkpermission, function (data) {  
                if (data) {
                    $('#permission-' + permission_id).attr('checked', true);
                }
                else {
                    $('#permission-' + permission_id).attr('checked', false);
                }
            });

        }
    };

    this.LoadTableEmpty = function () {
        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'name' };
        arrayColumnsData[2] = { 'data': 'description' };
        arrayColumnsData[3] = {
            'data': null,
        };

        $('#tblPermission').dataTable({
            'columns': arrayColumnsData,
            'deferRender': true
        });

        this.tableLoaded = true; // actualizar la bandera
    };
}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new PermissionsView();
    view.LoadTableEmpty();


    // Agregar una función para verificar si la tabla ya se cargó
    setInterval(function () {
        if (!view.tableLoaded) {
            view.LoadTableEmpty();
        }
    }, 1000); // tiempo en milisegundos para verificar la bandera
});
