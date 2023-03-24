function ValidationAccountView() {

    this.ViewName = "ValidationAccountView";
    //this.ApiService = "";
    //var self = this;


    this.InitView = function () {
        console.log("Validation Account init");

        //Asignacion del evento de clic
        $("#btnValidaOTP").click(function () {
            var view = new ValidationAccountView();
            view.ValidaOTP();
        });
    }
    this.ValidaOTP = function () {
        // Cambia el contenido del <p>
        document.getElementById('pValidaOTP').innerText = 'Digita el código que recibiste por SMS o correo electrónico.';

    }
    this.CleanForm = function () {

    }
}

//Instaciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista
$(document).ready(function () {
    var view = new ValidationAccountView();
    view.InitView();
});
