//Controla el comportamiento de la página/vista de Users.cshtml

//Definición de la clase UsersView
function UsersView() {
  this.ViewName = 'UsersView';
  this.ApiService = 'User';

  this.InitView = function () {
    console.log('User init');

    //Asignación del evento de click del botón
    $('#btnCreate').click(function () {
      var view = new UsersView();
      view.Create();
    });

    //Asignación del evento de click del botón
    $('#btnUpdate').click(function () {
      var view = new UsersView();
      view.Update();
    });

    //Asignación del evento de click del botón
    $('#btnNew').click(function () {
      var view = new UsersView();
      view.New();
    });

    //Asignación del evento de click del botón
    $('#btnDelete').click(function () {
      var view = new UsersView();
      view.Delete();
    });

    //Llamado al evento de cargar la tabla con toda la data de usuarios
    this.LoadTable();
  };

  this.Create = function () {
    //Inicialización del DTO de user
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

    // Call CaptureImageURL with a callback function
    CaptureImageURL('userPic', function (imageUrl) {
      var view = new UsersView();
      if (imageUrl === undefined) {
        imageUrl = document.getElementById('imgUser').src;
      }
      user.userPicture = imageUrl;
      // Llamado al API
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/createUser';

      ctrlActions.PostToAPIv1(serviceCreate, user, function () {
        alert('Usuario creado con éxito');
        var view = new UsersView();

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

    // Call CaptureImageURL with a callback function
    CaptureImageURL('userPic', function (imageUrl) {
      var view = new UsersView();
      if (imageUrl === undefined) {
        imageUrl = document.getElementById('imgUser').src;
      }
      user.userPicture = imageUrl;
      // Llamado al API
      var ctrlActions = new ControlActions();
      var serviceCreate = view.ApiService + '/updateUser';

      ctrlActions.PutToAPI(serviceCreate, user, function () {
        alert('Usuario actualizado con éxito');
        var view = new UsersView();

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
      alert('Usuario eliminado con éxito');
      var view = new UsersView();

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
    arrayColumnsData[5] = { 'data': 'phone' };
    arrayColumnsData[6] = { 'data': 'registrationDate' };
    arrayColumnsData[7] = { 'data': 'userStatus' };

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
        callback(event.target.result); // call the callback with the image URL
      });

      reader.readAsDataURL(file);
    } else {
      callback(); // call the callback with no image URL
    }
  }

  this.ReloadTable = () => {
    $('#tblUsers').DataTable().ajax.reload();
  };

  this.New = function () {
    $('#btnCreate').prop('disabled', false);
    $('#btnDelete').prop('disabled', true);
    $('#btnUpdate').prop('disabled', true);

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
  var view = new UsersView();
  view.InitView();
});
