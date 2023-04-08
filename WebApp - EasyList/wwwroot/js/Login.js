function LoginView() {
    this.ViewName = "LoginView";
    this.ApiService = "User";

    this.InitView = function () {

        $("#btnLogin").click(function () {
            var view = new LoginView();
            view.Login();
        });

        $("#btnBack").click(function () {
            window.location.href = "/";
        })

    }

    this.Login = function () {
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();

        if (email === '' || password === '') {
            if (email === '') {
                $("#error-messageEmail").html("Email is required");
                $("#error-messageEmail").show();
            } else {
                $("#error-messageEmail").hide();
            }
            if (password === '') {
                $("#error-messagePass").html("Password is required");
                $("#error-messagePass").show();
            } else {
                $("#error-messagePass").hide();
            }
        } else {
            //Realizar la logica para enviar los datos al Backend
            var view = new LoginView();
            var ctrlActions = new ControlActions();
            var serviceLogin = view.ApiService + '/loginUser';
            var url = `${serviceLogin}?email=${email}&password=${password}`;
            toastr.options = {
                "positionClass": "toast-top-center",
                "showDuration": "100"
            };

            ctrlActions.GetToApi(url, function (result) {
                if (result.status === 400) {
                    toastr.error('Error', 'Incorrect email or password');
                } else {
                    localStorage.setItem('userEmail', email);
                    toastr.success('¡Welcome!', 'Login successful');
                    window.location.href = "/";
                }
            });
            

        }

    }
}
$(document).ready(function () {
    var view = new LoginView();
    view.InitView();
})