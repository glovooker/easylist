//Controla el comportamiento de la página/vista de Permissions.cshtml

var id_permission;

//Definición de la clase ManagePermissions
function ManagePermissions() {
  this.ViewName = 'ManagePermissions';
    this.ApiService = 'Permission';

  this.InitView = function () {
      console.log('Permission init');
      $('#formContainer').hide();
      $('#btnBack').hide();

    $('#btnCreate').click(function () {
      var view = new ManagePermissions();
      view.Create();
    });

    $('#btnUpdate').click(function () {
      var view = new ManagePermissions();
      view.Update();
    });

    $('#btnDelete').click(function () {
      var view = new ManagePermissions();
      view.Delete();
    });

      $('#btnNew').click(function () {
          var view = new ManagePermissions();
          view.New();
      });

      $('#btnBack').click(function () {
          var view = new ManagePermissions();
          view.Back();
      });

    this.LoadTable();
  };

  this.Create = function () {
    var permission = {};
    permission.id = 0;
    permission.name = $('#txtName').val();
    permission.description = $('#txtDescription').val();
    permission.usertype = parseInt($('#selecType').val());

      var view = new ManagePermissions();
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/createPermission';

        ctrlActions.PostToAPIv1(serviceCreate, permission, function () {
        toastr.success('Permission created successfully');
        var view = new ManagePermissions();

            $('#tblContainer').show();
            $('#formContainer').hide();
            $('#btnNew').show();
            $('#btnReturn').show();
            $('#btnBack').hide();
        view.ReloadTable();
        view.CleanForm();
      });
  };

  this.Update = function () {
    var permission = {};
    permission.id = id_permission;
    permission.name = $('#txtName').val();
    permission.description = $('#txtDescription').val();
    permission.usertype = parseInt($('#selecType').val());

 
      var view = new ManagePermissions();
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/updatePermission';

      ctrlActions.PutToAPI(serviceCreate, permission, function () {
        toastr.success('Permission updated successfully');
        var view = new ManagePermissions();

          $('#tblContainer').show();
          $('#formContainer').hide();
          $('#btnNew').show();
          $('#btnReturn').show();
          $('#btnBack').hide();
        view.ReloadTable();
        view.CleanForm();
      });
  };

  this.Delete = function () {
    var permission = {};
    permission.id = id_permission;
    permission.name = $('#txtName').val();
    permission.description = $('#txtDescription').val();

    var ctrlActions = new ControlActions();
    var serviceDelete = this.ApiService + '/deletePermission';

    ctrlActions.DeleteToAPI(serviceDelete, permission, function () {
      toastr.success('Permission deleted successfully');
      var view = new ManagePermissions();

        $('#tblContainer').show();
        $('#formContainer').hide();
        $('#btnNew').show();
        $('#btnReturn').show();
        $('#btnBack').hide();
      view.ReloadTable();
      view.CleanForm();
    });
  };

  this.LoadTable = function () {
    var ctrlActions = new ControlActions();

    var urlService = ctrlActions.GetUrlApiService(
      this.ApiService + '/getAllPermissions'
    );

    var arrayColumnsData = [];
    arrayColumnsData[0] = { 'data': 'id' };
    arrayColumnsData[1] = { 'data': 'name' };
    arrayColumnsData[2] = { 'data': 'description' };
      arrayColumnsData[3] = {
          'data': 'usertype',
          'render': function (data) {
              const userTypeMap = {
                  1: 'Provider',
                  2: 'Analyst',
                  3: 'Administrator',
              };
              return userTypeMap[data] || data;
          }, };

    $('#tblPermission').dataTable({
      'ajax': {
        'url': urlService,
        'dataSrc': '',
      },
      'columns': arrayColumnsData,
    });

    $('#tblPermission tbody').on('click', 'tr', function () {
      var tr = $(this).closest('tr');

      var data = $('#tblPermission').DataTable().row(tr).data();

      id_permission = data.id;

      $('#txtName').val(data.name);
      $('#txtDescription').val(data.description);
      $('#selecType').val(data.usertype.toString());

        $('#tblContainer').hide();
        $('#formContainer').show();
        $('#btnNew').hide();
        $('#btnReturn').hide();
        $('#btnBack').show();
      $('#btnCreate').prop('disabled', true);
      $('#btnDelete').prop('disabled', false);
      $('#btnUpdate').prop('disabled', false);
    });
  };

  this.ReloadTable = () => {
    $('#tblPermission').DataTable().ajax.reload();
  };

    this.New = function () {
        $('#tblContainer').hide();
        $('#formContainer').show();
        $('#btnNew').hide();
        $('#btnReturn').hide();
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
        $('#btnReturn').show();
        $('#btnBack').hide();
        $('#btnCreate').prop('disabled', true);
        $('#btnDelete').prop('disabled', false);
        $('#btnUpdate').prop('disabled', false);

        this.CleanForm();
    };

  this.CleanForm = function () {
    $('#txtName').val('');
    $('#txtDescription').val('');
    $('#selecType').val('');
  };
}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
  var view = new ManagePermissions();
  view.InitView();
});
