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
        // Cambia el contenido del <p>
        if ($("#country-code").val() != "" && $("#phone-number").val() != "") {
           // document.getElementById('pValidaOTP').innerText = 'Digita el código que recibiste por SMS o correo electrónico.';
            $("#divNumeroVerificacion").hide();
            $("#divCodigoOTP").show();
            
        }
        else {
            console.log("No se ha ingresado el número de teléfono");
        }
    }
}

//Instaciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista
$(document).ready(function () {
    var view = new ValidationAccountView();
    view.InitView();
});
