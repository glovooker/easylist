function RegisterView() {
    this.ViewName = 'RegisterView';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('Register init');

        $('#btnRegister').click(function () {
            var view = new RegisterView();
            view.Register();
        });
        $("#btnBack").click(function () {
            window.location.href = "/";
        })
    };

    this.Register = function () {
        //Inicialización del DTO de user
        var user = {};
        user.id = 0;
        user.name = $('#txtName').val();
        user.firstLastName = $('#txtFirstLastname').val();
        user.secondLastName = $('#txtSecondLastname').val();
        user.email = $('#txtEmail').val();
        user.password = $('#txtPassword').val();
        user.phone = '';
        user.registrationDate = new Date().toISOString();
        user.userStatus = 4;
        user.userPicture = '';

        //Llamado al API
        var view = new RegisterView();
        var ctrlActions = new ControlActions();
        var serviceCreate = view.ApiService + '/registerUser';

        ctrlActions.PostToAPIv1(serviceCreate, user, function () {
            alert('Usuario registrado con éxito');
            var view = new RegisterView();
            view.InitView();
            localStorage.setItem('userEmail', user.email);
            window.location.href = "/ValidationAccount";  

        });
    };
}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new RegisterView();
    view.InitView();
});
