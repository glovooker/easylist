
function ManageUsers() {
    this.ViewName = 'UserView';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('User init');
        $('#formContainer').hide();
        $('#btnBack').hide();

        $('#btnCreate').click(function () {
            var view = new ManageUsers();
            view.Create();
        });

        $('#btnUpdate').click(function () {
            var view = new ManageUsers();
            view.Update();
        });

        $('#btnDelete').click(function () {
            var view = new ManageUsers();
            view.Delete();
        });

        $('#btnNew').click(function () {
            var view = new ManageUsers();
            view.New();
        });

        $('#btnBack').click(function () {
            var view = new ManageUsers();
            view.Back();
        });

        this.LoadTable();
    };

    this.Create = function () {

        var user = {};
        user.id = parseInt($('#txtID').val()) || 0;
        user.name = $('#txtName').val();
        user.firstLastName = $('#txtFirstLastname').val();
        user.secondLastName = $('#txtSecondLastname').val();
        user.email = $('#txtEmail').val();
        user.password = '';
        user.phone = $('#txtPhone').val();
        user.registrationDate = new Date().toISOString();
        user.userStatus = parseInt($('#drpStatus').val());


        CaptureImageURL('userPic', function (imageUrl) {
            var view = new ManagePermissions();
            if (imageUrl === undefined) {
                imageUrl = document.getElementById('imgUser').src;
            }
            user.userPicture = imageUrl;

            var ctrlActions = new ControlActions();
            var serviceCreate = view.ApiService + '/createUser';

            ctrlActions.PostToAPIv1(serviceCreate, user, function () {
                toastr.success('User created', 'Success!');
                var view = new ManageUsers();

                $('#tblContainer').show();
                $('#formContainer').hide();
                $('#btnNew').show();
                $('#btnBack').hide();
                view.ReloadTable();
                view.CleanForm();
            });
        });
    };

    this.Update = function () {
        var user = {};
        user.id = parseInt($('#txtID').val());
        user.name = $('#txtName').val();
        user.firstLastName = $('#txtFirstLastname').val();
        user.secondLastName = $('#txtSecondLastname').val();
        user.email = $('#txtEmail').val();
        user.password = '';
        user.phone = $('#txtPhone').val();
        user.registrationDate = new Date().toISOString();
        user.userStatus = parseInt($('#drpStatus').val());

        CaptureImageURL('userPic', function (imageUrl) {
            var view = new ManageUsers();
            if (imageUrl === undefined) {
                imageUrl = document.getElementById('imgUser').src;
            }
            user.userPicture = imageUrl;
            // Llamado al API
            var ctrlActions = new ControlActions();
            var serviceCreate = view.ApiService + '/updateUser';

            ctrlActions.PutToAPI(serviceCreate, user, function () {
                toastr.success('User updated', 'Success!');
                var view = new ManageUsers();

                $('#tblContainer').show();
                $('#formContainer').hide();
                $('#btnNew').show();
                $('#btnBack').hide();
                view.ReloadTable();
                view.CleanForm();
            });
        });
    };

    this.Delete = function () {
        var user = {};
        user.id = $('#txtID').val();
        user.name = $('#txtName').val();
        user.firstLastName = $('#txtFirstLastname').val();
        user.secondLastName = $('#txtSecondLastname').val();
        user.email = $('#txtEmail').val();
        user.password = '';
        user.phone = $('#txtPhone').val();
        user.registrationDate = new Date().toISOString();
        user.userStatus = parseInt($('#drpStatus').val());
        user.userPicture = $('#userPic').val();

        var ctrlActions = new ControlActions();
        var serviceDelete = this.ApiService + '/deleteUser';

        ctrlActions.DeleteToAPI(serviceDelete, user, function () {
            toastr.success('User deleted successfully');
            var view = new ManageUsers();

            $('#tblContainer').show();
            $('#formContainer').hide();
            $('#btnNew').show();
            $('#btnBack').hide();
            view.ReloadTable();
            view.CleanForm();
        });
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

        $('#tblUsers').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        $('#tblUsers tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');

            var data = $('#tblUsers').DataTable().row(tr).data();

            $('#txtID').val(data.id);
            $('#txtName').val(data.name);
            $('#txtFirstLastname').val(data.firstLastName);
            $('#txtSecondLastname').val(data.secondLastName);
            $('#txtEmail').val(data.email);
            $('#txtPhone').val(data.phone);
            $('#drpStatus').val(data.userStatus);
            document.getElementById('imgUser').src = data.userPicture;

            $('#tblContainer').hide();
            $('#formContainer').show();
            $('#btnNew').hide();
            $('#btnBack').show();
            $('#btnCreate').prop('disabled', true);
            $('#btnDelete').prop('disabled', false);
            $('#btnUpdate').prop('disabled', false);
        });
    };

    function CaptureImageURL(fileId, callback) {
        let file = document.getElementById(fileId).files[0];

        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                callback(event.target.result);
            });

            reader.readAsDataURL(file);
        } else {
            callback();
        }
    }

    this.ReloadTable = () => {
        $('#tblUsers').DataTable().ajax.reload();
    };

    this.New = function () {
        $('#tblContainer').hide();
        $('#formContainer').show();
        $('#btnNew').hide();
        $('#btnBack').show();
        $('#btnCreate').prop('disabled', false);
        $('#btnDelete').prop('disabled', true);
        $('#btnUpdate').prop('disabled', true);

        this.CleanForm();
    };

    this.Back = function () {
        $('#formContainer').hide();
        $('#tblContainer').show();
        $('#btnNew').show();
        $('#btnBack').hide();
        $('#btnCreate').prop('disabled', true);
        $('#btnDelete').prop('disabled', false);
        $('#btnUpdate').prop('disabled', false);

        this.CleanForm();
    };

    this.CleanForm = function () {
        $('#txtID').val('');
        $('#txtName').val('');
        $('#txtFirstLastname').val('');
        $('#txtSecondLastname').val('');
        $('#txtEmail').val('');
        $('#txtPhone').val('');
        $('#drpStatus').val('');
        $('#userPic').val('');
        document.getElementById('imgUser').src = '';
    };
}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new ManageUsers();
    view.InitView();
});
