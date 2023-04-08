function ValidationAccountView() {

    this.ViewName = "ValidationAccountView";
    this.ApiService = "Validation";
    var self = this;


    this.InitView = function () {
        console.log("Validation Account init");

        $("#divCodigoOTP").hide();
        $("#divVerificacionTerminada").hide();

        //Asignacion del evento de clic
        $("#btnValidaOTP").click(function () {
            var view = new ValidationAccountView();
            view.ValidaOTP();
        });
        //Asignacion del evento de clic
        $("#btnValidaCuenta").click(function () {
            var view = new ValidationAccountView();
            view.ValidaCuenta();
        });
    }
    this.ValidaCuenta = function () {
        if ($("#OTP-code").val() != "") {
            $("#divCodigoOTP").hide();
            $("#divVerificacionTerminada").show();

        }
        else {
            console.log("No se ha ingresado el número de teléfono");
        }
    }
    this.ValidaOTP = function () {
        countryCode = $("#country-code").val().trim()
        phoneNumber = $("#phone-number").val().trim()
        checkBoxEmail = $("#email-validation-checkbox");

        if (countryCode === '') {
            $("#error-messageCountryCode").html("El codigo de país es obligatorio");
            $("#error-messageCountryCode").show();
        } else {
            $("#error-messageCountryCode").hide();
        }
        if (phoneNumber === '') {
            $("#error-messageNumber").html("El numero es obligatorio");
            $("#error-messageNumber").show();
        } else {
            $("#error-messageNumber").hide();
        }
        if ((countryCode !== '' && phoneNumber !== '') || checkBoxEmail.is(":checked")) {
            $("#error-messageCountryCode").hide();
            $("#error-messageNumber").hide();
            $("#divNumeroVerificacion").hide();

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
            ctrlActions.PutToAPI(serviceUpdate, user, function () {

                var ctrlActions = new ControlActions();
                var service = self.ApiService + "/createValidation";

                var validation ={};

                validation.id = 0;
                validation.userId = localStorage.getItem('userEmail');

                if ((countryCode !== '' && phoneNumber !== '') && !checkBoxEmail.is(":checked")){
                    validation.validationType = 1;
                }
                else if (checkBoxEmail.is(":checked") && (countryCode === '' && phoneNumber === '')) {
                    validation.validationType = 0;
                }
                else if ((countryCode !== '' && phoneNumber !== '') && checkBoxEmail.is(":checked")) {
                    validation.validationType = 2;
                }
                validation.validationStatus = 0;
                validation.validationCode = "";
                validation.validationDateCreation = new Date();
                validation.validationDateExpired = new Date();
                validation.validationCount = 0;

                ctrlActions.PostToAPIv1(service, validation, function () {
                    console.log("Se ha creado el registro de validación");

                });
            });
            $("#divCodigoOTP").show();
        }
    }
    
}

//Instaciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista
$(document).ready(function () {
    var view = new ValidationAccountView();
    view.InitView();
});
