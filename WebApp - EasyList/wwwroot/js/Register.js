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
        var regex = /^(?!.*(\w)\1{4})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;

        // Llamado al API
        if (user.name === '' || user.firstLastName === '' || user.secondLastName === '' || user.email === '' || user.password === '' || !regex.test(user.password)) {
            if (user.name === '') {
                $("#error-messageName").html("Name is required");
                $("#error-messageName").show();
            } else {
                $("#error-messageName").hide();
            }
            if (user.firstLastName === '') {
                $("#error-messageFirstLastname").html("First Lastname is required");
                $("#error-messageFirstLastname").show();
            } else {
                $("#error-messageFirstLastname").hide();
            }
            if (user.secondLastName === '') {
                $("#error-messageSecondLastname").html("Second Lastname is required");
                $("#error-messageSecondLastname").show();
            } else {
                $("#error-messageSecondLastname").hide();
            }
            if (user.email === '') {
                $("#error-messageEmail").html("Email is required");
                $("#error-messageEmail").show();
            } else {
                $("#error-messageEmail").hide();
            }
            if (user.password === '') {
                $("#error-messagePass").html("Password is required");
                $("#error-messagePass").show();
            } else {
                $("#error-messagePass").hide();
            }
            if (!regex.test(user.password)) {
                $("#error-messagePass").html("Password must have at least 8 characters, including special characters, numbers, uppercase and lowercase letters.");
                $("#error-messagePass").show();
            } else {
                $("#error-messagePass").hide();
            }
        } else {
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
