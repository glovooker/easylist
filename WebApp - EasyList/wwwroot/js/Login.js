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
                        localStorage.setItem('userId', result.response.id);
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('email', email);
                        localStorage.setItem('password', password);

                        toastr.success('Welcome!', 'Login successful');
                        window.location.href = "/";
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
                        toastr.error('Error', 'Your account is inactive');
                        setTimeout(function () {
                            window.location.href = "/ValidationAccount";
                            }, 3000);                     
                    }
                }
            });
        }
    }
}

$(document).ready(function () {
    var view = new LoginView();
    view.InitView();
})
