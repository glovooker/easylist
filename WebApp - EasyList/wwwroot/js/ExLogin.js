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

        if (email === '' || password === '' || newpassword === '') {
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
            if (newpassword === '') {
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
                    if (result.response.userStatus === 0) {
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
                    else if (result.response.userStatus === 1) {
                        toastr.error('Error', 'Your account is suspended');
                    }
                    else if (result.response.userStatus === 2) {
                        toastr.error('Error', 'Your account is banned');
                    }
                    else if (result.response.userStatus === 3) {
                        toastr.error('Error', 'Your account is deleted');
                    }
                    else if (result.response.userStatus === 4) {
                        var creNewPassword = view.CreNewPassword();
                        if (creNewPassword !== 1) {
                            $("#error-messageNewPass").hide();
                            localStorage.setItem('userId', result.response.id);
                            localStorage.setItem('userEmail', email);
                            localStorage.setItem('email', email);
                            localStorage.setItem('password', password);
                            toastr.success('Welcome!', 'Login successful');
                            toastr.success('Verification successful!', 'Password has been changed successfully');

                            toastr.error('Error', 'Your account is inactive');
                            setTimeout(function () {
                                window.location.href = "/ValidationAccount";
                            }, 3000);
                        }
                    }           
                }
            });
        }
    }

    this.CreNewPassword = function () {

        var email = $("#txtEmail").val();
        var newpassword = $("#txtNewPassword").val();
        var regex = /^(?!.*(\w)\1{4})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.*+-¿?!¡])(?!.*\s).{8,}$/;


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
        if (!regex.test(newpassword)) {
            $("#error-messageNewPass").html("Password must have at least 8 characters, including special characters, numbers, uppercase and lowercase letters.");
            $("#error-messageNewPass").show();
            return 1;
        } else {
            $("#error-messagePass").hide();
            ctrlActions.PostToAPIv1(url, data, function () {

            });
        }
    }
}

$(document).ready(function () {
    var view = new LoginView();
    view.InitView();
})
