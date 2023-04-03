function ValidationAccountView() {

    this.ViewName = "ValidationAccountView";
    //this.ApiService = "";
    //var self = this;


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
        if (countryCode !== '' && phoneNumber !== '') {
            $("#error-messageCountryCode").hide();
            $("#error-messageNumber").hide();

            $("#divNumeroVerificacion").hide();
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
