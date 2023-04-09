function ValidationAccountView() {

    this.ViewName = "ValidationAccountView";
    this.ApiService = "Validation";
    var self = this;


    this.InitView = function () {
        console.log("Validation Account init");

        $("#divCodeOTP").hide();
        $("#divVerificationCompleted").hide();

        //Asignacion del evento de clic
        $("#btnValidateOTP").click(function () {
            var view = new ValidationAccountView();
            view.ValidaOTP();
        });
        //Asignacion del evento de clic
        $("#btnValidateAccount").click(function () {
            var view = new ValidationAccountView();
            view.ValidaCuenta();
        });
        $("#btnGoSignIn").click(function () {
            var view = new ValidationAccountView();
            view.GoSingIn();
        });
    }
    this.GoSingIn = function () {
        window.location.href = "/Login";
        }


    this.ValidaCuenta = function () {
        var codigoIngresado = $("#OTP-code").val().trim();
        if (codigoIngresado !== "") {

            var ctrlActions = new ControlActions();
            var service = self.ApiService + "/getValidationByUserId&Status";
            var url = service + "?userId=" + localStorage.getItem('userEmail');
            ctrlActions.GetToApi(url, function (result) {
                var validation = result.response[0];
                if (validation.validationCode === codigoIngresado) {
                    $("#error-OTPCode").hide();
                    var serviceUpdate = self.ApiService + "/updateValidation";
                    validation.validationStatus = 1;
                    ctrlActions.PutToAPI(serviceUpdate, validation, function () {
                        var serviceGetUserByEmail = "User/getUserByEmail";
                        var url = serviceGetUserByEmail + "?email=" + localStorage.getItem('userEmail');
                        ctrlActions.GetToApi(url, function (result) {
                            var user = result.response;
                            user.userStatus = 0;
                            user.password = '';
                            var serviceUpdateUser = "User/updateUser";
                            ctrlActions.PutToAPI(serviceUpdateUser, user, function () {
                                toastr.success('Your account has been verified', 'Verification Successful');
                                $("#divCodeOTP").hide();
                                $("#divVerificationCompleted").show();

                            });
                        });
                    });
                }
                else {
                    var serviceUpdate = self.ApiService + "/updateValidation";
                    var count=validation.validationCount;
                    if (count < 3) {
                        validation.validationCount += 1;
                        ctrlActions.PutToAPI(serviceUpdate, validation, function () {
                            $("#error-OTPCode").html("The OTP code is incorrect. You have made " + validation.validationCount + " attempts out of 3.");
                            $("#error-OTPCode").show();
                        })
                    }
                    else {
                        validation.validationStatus = 2
                        ctrlActions.PutToAPI(serviceUpdate, validation, function () {
                            $("#error-OTPCode").html("You must request the code again."); 
                            $("#error-OTPCode").show();
                        })
                    }
                }
            });

        }
        else {
            $("#error-messageOTP").html("You must request the code again.");
            $("#error-messageOTP").show();
        }
    }
    this.ValidaOTP = function () {
        countryCode = $("#country-code").val().trim()
        phoneNumber = $("#phone-number").val().trim()
        checkBoxEmail = $("#email-validation-checkbox");

        if (countryCode === '') {
            $("#error-messageCountryCode").html("The country code is required.");
            $("#error-messageCountryCode").show();
        } else {
            $("#error-messageCountryCode").hide();
        }
        if (phoneNumber === '') {
            $("#error-messageNumber").html("The phone number is required.");
            $("#error-messageNumber").show();
        } else {
            $("#error-messageNumber").hide();
        }
        if ((countryCode !== '' && phoneNumber !== '') || checkBoxEmail.is(":checked")) {
            $("#error-messageCountryCode").hide();
            $("#error-messageNumber").hide();
            $("#divNumberVerification").hide();

            toastr.options = {
                "positionClass": "toast-top-center",
                "showDuration": "100"
            };

            var ctrlActions = new ControlActions();
            var serviceUpdate = this.ApiService + "/updatePhoneUser";
            var user = {};
            user.id = 0;
            user.name = '';
            user.firstLastName = '';
            user.secondLastName = '';
            user.email =  localStorage.getItem('userEmail');
            user.password = '';
            user.phone = countryCode + phoneNumber; 
            user.registrationDate = new Date()
            user.userStatus = 0;
            user.userPicture = '';
            if (user.phone != '') {
                ctrlActions.PutToAPI(serviceUpdate, user, function () {

                    var service = self.ApiService + "/createValidation";

                    var validation = {};

                    validation.id = 0;
                    validation.userId = localStorage.getItem('userEmail');

                    if ((countryCode !== '' && phoneNumber !== '') && !checkBoxEmail.is(":checked")) {
                        validation.validationType = 1;
                        var mensaje = "It was sent to your phone number.";
                    }
                    else if (checkBoxEmail.is(":checked") && (countryCode === '' && phoneNumber === '')) {
                        validation.validationType = 0;
                        var mensaje = "It was sent to your email.";
                    }
                    else if ((countryCode !== '' && phoneNumber !== '') && checkBoxEmail.is(":checked")) {
                        validation.validationType = 2;
                        var mensaje = "It was sent to your phone number and your email.";
                    }
                    validation.validationStatus = 0;
                    validation.validationCode = "";
                    validation.validationDateCreation = new Date();
                    validation.validationDateExpired = new Date();
                    validation.validationCount = 0;

                    ctrlActions.PostToAPIv1(service, validation, function () {
                        toastr.success(mensaje, 'The OTP code.');
                        $("#divCodeOTP").show();
                    });
                });
            }
        }
    }
    
}

//Instaciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista
$(document).ready(function () {
    var view = new ValidationAccountView();
    view.InitView();
});
