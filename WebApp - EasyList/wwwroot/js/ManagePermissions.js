//Controla el comportamiento de la página/vista de Users.cshtml

var fullName;
var user_id;
var permissionValue = [];
var newPermissions = [];
var actionsPending;

//Definición de la clase ManagePermissions
function ManagePermissions() {
    this.ViewName = 'ManagePermissions';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('User init');

        $('#btnClean').hide();
        $('#btnSave').hide();
        $('#btnViewPermissions').show();
        $('#tblUsersContainer').show();
        $('#tblPermissionsContainer').hide();

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
        arrayColumnsData[5] = {
            'data': 'phone',
            'render': function (data) {
                const cleanedNumber = ('' + data).replace(/\D/g, '');
                const match = cleanedNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
                if (match) {
                    return `(+${match[1]}) ${match[2]}-${match[3]}`;
                }
                return data;
            },
        };
        arrayColumnsData[6] = {
            'data': 'registrationDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };
        arrayColumnsData[7] = {
            'data': 'userStatus',
            'render': function (data) {
                const statusMap = {
                    0: 'Active',
                    1: 'Suspended',
                    2: 'Banned',
                    4: 'Inactive',
                };
                return statusMap[data] || data;
            },
        };

        $('#tblManagePermission').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        $('#tblManagePermission tbody').on('click', 'tr', function () {

            permissionValue = [];

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

        //Asignación del evento de click del botón
        $('#btnSave').click(function () {
            var view = new PermissionsView();
            view.Save();
        });
        //Asignación del evento de click del botón
        $('#btnClean').click(function () {
            var view = new PermissionsView();
            view.Clean();
        });

    };

    this.Clean = function () {

        this.DestroyTable();
        this.LoadTableEmpty();
        permissionValue = [];
        $('#btnClean').hide();
        $('#btnSave').hide();
        $('#btnViewPermissions').show();
        $('#tblUsersContainer').show();
        $('#tblPermissionsContainer').hide();
    };

    this.DestroyTable = function () {
        var table = $('#tblPermission').DataTable();
        table.clear().draw();
        $('#username').text('No user selected yet.');
    };

    this.Save = function () {
        var newPermissions = [];

        $('#tblPermission tbody tr').each(function () {
            var row = $(this);
            var permissionId = row.find('td:eq(0)').text();
            var isChecked = row.find('input[type="checkbox"]').prop('checked');
            newPermissions.push({
                'permissionId': parseInt(permissionId),
                'isChecked': isChecked
            });
        });

        if (typeof permissionValue !== 'undefined' && typeof permissionValue[0].isChecked !== 'undefined') {
            for (var i = 0; i < permissionValue.length; i++) {
                var isMatch = true;
                for (var j = 0; j < newPermissions.length; j++) {
                    if (typeof newPermissions[j] !== 'undefined' && typeof newPermissions[j].isChecked !== 'undefined' && newPermissions[j].permissionId === permissionValue[i].permissionId) {
                        if (newPermissions[j].isChecked !== permissionValue[i].isChecked) {
                            if (newPermissions[j].isChecked) {
                                this.Create(permissionValue[i].permissionId );
                            } else {
                                this.Delete(permissionValue[i].permissionId);
                            }
                        }
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    toastr.success("The record with ID " + permissionValue[i].permissionId + " has not changed its isChecked property.");
                }
            }
        } else {
            toastr.error("The permissionValue object is not defined correctly.");
        }

        var view = new PermissionsView();
        view.Clean();
    };

    this.Create = function (id) {
        //Inicialización del DTO de permission

        var managepermission = {};
        managepermission.id = 0;
        managepermission.user_id = user_id;
        managepermission.permission_id = parseInt(id);

        // Validar si el usuario ya tiene asignado el permiso
        if (permissionValue[parseInt(id) - 1]) {
            console.log('El usuario ya tiene asignado el permiso.');
            return;
        }

        // Asignar el valor de id a permissionId
        var permissionId = id;

        // Llamado al API
        var ctrlActions = new ControlActions();
        var serviceCreate = 'ManagePermission/createPermission';

        ctrlActions.PostToAPIv1(serviceCreate, managepermission, function () {
            //toastr.success('Permission created successfully');
        });
    };


    this.Delete = function (id) {
        var managepermission = {};
        managepermission.id = 0;
        managepermission.user_id = user_id;
        managepermission.permission_id = parseInt(id);

        // Llamado al API
        var ctrlActions = new ControlActions();
        var serviceDelete = 'ManagePermission/DeletePermission';

        ctrlActions.DeleteToAPI(serviceDelete, managepermission, function () {
            //toastr.success('Permission deleted successfully');
        });
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

                // Invertir el orden del vector permissionValue
                permissionValue.reverse();
            }
        });

        $('#btnClean').show();
        $('#btnSave').show();
        $('#btnViewPermissions').hide();
        $('#tblUsersContainer').hide();
        $('#tblPermissionsContainer').show();
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
                    permissionValue.push({
                        'permissionId': permission_id,
                        'isChecked': true
                    }); // Agregar valor a permissionValue
                }
                else {
                    $('#permission-' + permission_id).attr('checked', false);
                    permissionValue.push({
                        'permissionId': permission_id,
                        'isChecked': false
                    }); // Agregar valor a permissionValue
                }
                permissionValue.reverse();

            });

        }
    };

    this.LoadTableEmpty = function () {
        // Destruir la tabla existente si ya ha sido inicializada
        if ($.fn.DataTable.isDataTable('#tblPermission')) {
            $('#tblPermission').DataTable().destroy();
        }

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
    view.InitView();
});

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
