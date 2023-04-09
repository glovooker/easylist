function ForgotPasswordView() {
    this.ViewName = "ForgotPasswordView";
    this.ApiService = "User";

    this.InitView = function () {

        $("#btnSend").click(function () {
            var view = new ForgotPasswordView();
            view.Send();
        });

        $("#btnBack").click(function () {
            window.location.href = "/Login";
        })

    }

    this.SendEmail = function () {

        var email = $("#txtEmail").val();

        //Realizar la logica para enviar los datos al Backend
        var view = new ForgotPasswordView();
        var ctrlActions = new ControlActions();
        var serviceRecover = view.ApiService + '/recoverUser';
        var url = `${serviceRecover}?email=${email}`;
        toastr.options = {
            "positionClass": "toast-top-center",
            "showDuration": "100"
        };

        var data = {
            email: $("#txtEmail").val()
        };

        ctrlActions.PostToAPIv1(url, data, function () {
            toastr.success('Verification successful!', 'A temporary password has been sent to your email');

            // Agregar tiempo de espera antes de redireccionar
            setTimeout(function () {
                window.location.href = "/Login";
            }, 5000);
        });
    }

    this.Send = function () {
        var email = $("#txtEmail").val();

        if (email === '') {
            if (email === '') {
                $("#error-messageEmail").html("Email is required");
                $("#error-messageEmail").show();
            } else {
                $("#error-messageEmail").hide();
            }
        } else {
            //Realizar la logica para enviar los datos al Backend
            var view = new ForgotPasswordView();
            var ctrlActions = new ControlActions();
            var serviceCheck = view.ApiService + '/getUserByEmail';
            var urlchecker = `${serviceCheck}?email=${email}`;
            toastr.options = {
                "positionClass": "toast-top-center",
                "showDuration": "100"
            };

            ctrlActions.GetToApi(urlchecker, function (result) {
                var reschecker = result.status
                console.log(reschecker);
                if (reschecker === 400) {

                    toastr.error('Error', 'There is no registered user with that email address');
                }

                else {
                    view.SendEmail();
                }
            });
            
        }
    }
}

$(document).ready(function () {
    var view = new ForgotPasswordView();
    view.InitView();
})