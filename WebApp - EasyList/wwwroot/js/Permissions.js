﻿//Controla el comportamiento de la página/vista de Permissions.cshtml

var id_permission;

//Definición de la clase ManagePermissions
function ManagePermissions() {
  this.ViewName = 'ManagePermissions';
    this.ApiService = 'Permission';

  this.InitView = function () {
      console.log('Permission init');

    //Asignación del evento de click del botón
    $('#btnCreate').click(function () {
      var view = new ManagePermissions();
      view.Create();
    });

    //Asignación del evento de click del botón
    $('#btnUpdate').click(function () {
      var view = new ManagePermissions();
      view.Update();
    });

    //Asignación del evento de click del botón
    $('#btnNew').click(function () {
      var view = new ManagePermissions();
      view.New();
    });

    //Asignación del evento de click del botón
    $('#btnDelete').click(function () {
      var view = new ManagePermissions();
      view.Delete();
    });

    //Llamado al evento de cargar la tabla con toda la data de permisos
    this.LoadTable();
  };

  this.Create = function () {
    //Inicialización del DTO de permission
    var permission = {};
    permission.id = 0;
    permission.name = $('#txtName').val();
    permission.description = $('#txtDescription').val();
    permission.usertype = parseInt($('#selecType').val());

      // Llamado al API
      var view = new ManagePermissions();
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/createPermission';

        ctrlActions.PostToAPIv1(serviceCreate, permission, function () {
        toastr.success('Permission created successfully');
        var view = new ManagePermissions();

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

 
      // Llamado al API
      var view = new ManagePermissions();
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/updatePermission';

      ctrlActions.PutToAPI(serviceCreate, permission, function () {
        toastr.success('Permission updated successfully');
        var view = new ManagePermissions();

        view.ReloadTable();
        view.CleanForm();
      });
  };

  this.Delete = function () {
    var permission = {};
    permission.id = id_permission;
    permission.name = $('#txtName').val();
    permission.description = $('#txtDescription').val();

    // Llamado al API
    var ctrlActions = new ControlActions();
    var serviceDelete = this.ApiService + '/deletePermission';

    ctrlActions.DeleteToAPI(serviceDelete, permission, function () {
      toastr.success('Permission deleted successfully');
      var view = new ManagePermissions();

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
    arrayColumnsData[3] = { 'data': 'usertype' };

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

      $('#btnCreate').prop('disabled', true);
      $('#btnDelete').prop('disabled', false);
      $('#btnUpdate').prop('disabled', false);
    });
  };

  this.ReloadTable = () => {
    $('#tblPermission').DataTable().ajax.reload();
  };

  this.New = function () {
    $('#btnCreate').prop('disabled', false);
    $('#btnDelete').prop('disabled', true);
    $('#btnUpdate').prop('disabled', true);

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