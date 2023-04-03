function LoginView() {
    this.ViewName = "LoginView";
    this.ApiService = "";

    this.InitView = function () {

        $("#btnLogin").click(function () {
            var view = new LoginView();
            view.Login();
        });

        $("#btnRegresar").click(function () {
            window.location.href = "/";
        })

    }

    this.Login = function () {
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();

        if (email === '' || password === '') {
            if (email === '') {
                $("#error-messageEmail").html("El correo electrónico es obligatorio");
                $("#error-messageEmail").show();
            } else {
                $("#error-messageEmail").hide();
            }
            if (password === '') {
                $("#error-messagePass").html("La contraseña es obligatoria");
                $("#error-messagePass").show();
            } else {
                $("#error-messagePass").hide();
            }
        } else {
            //Realizar la logica para enviar los datos al Backend
            toastr.success('¡Bienvenido!', 'Inicio de sesión exitoso')

        }

    }
}
$(document).ready(function () {
    var view = new LoginView();
    view.InitView();
})