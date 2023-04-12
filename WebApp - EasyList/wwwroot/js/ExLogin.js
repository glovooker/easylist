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

        // Check for stored credentials on page load
        var storedEmail = localStorage.getItem('email');
        var storedPassword = localStorage.getItem('password');
        if (storedEmail && storedPassword) {
            $("#txtEmail").val(storedEmail);
            $("#txtPassword").val(storedPassword);
            this.Login();
        }
    }

    this.Login = function () {
        var email = $("#txtEmail").val();
        var password = $("#txtPassword").val();
        var newpassword = $("#txtNewPassword").val();

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
            if (password === '') {
                $("#error-messageNewPass").html("The New Password is required");
                $("#error-messageNewPass").show();
            } else {
                $("#error-messageNewPass").hide();
            }
        } else {

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

                    view.CreNewPassword();
                    localStorage.setItem('userId', result.response.id);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    toastr.success('Welcome!', 'Login successful');
                    toastr.success('Verification successful!', 'Password has been changed successfully');

                    // Agregar tiempo de espera antes de redireccionar
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 5000);
                    
                }
            });
        }
    }

    this.CreNewPassword = function () {

        var email = $("#txtEmail").val();
        var newpassword = $("#txtNewPassword").val();

        //Realizar la logica para enviar los datos al Backend
        var view = new LoginView();
        var ctrlActions = new ControlActions();
        var serviceRecover = view.ApiService + '/availableUser';
        var url = `${serviceRecover}?email=${email}&newpassword=${newpassword}`;
        toastr.options = {
            "positionClass": "toast-top-center",
            "showDuration": "100"
        };

        var data = {
            email: $("#txtEmail").val(),
            newpassword: $("#txtNewPassword").val()
        };

        ctrlActions.PostToAPIv1(url, data, function () {

        });
    }
}

$(document).ready(function () {
    var view = new LoginView();
    view.InitView();
})
