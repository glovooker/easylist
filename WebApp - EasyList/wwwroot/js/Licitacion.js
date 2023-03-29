
//Definicion de la clase LicitacionView
function LicitacionView() {

    this.ViewLicitacion = "LicitacionView";
    this.ApiService = "Licitacion";

    this.InitView = function () {

        console.log("Licitacion init");

        //Asignacion del evento del clic del boton
        $("#btnCreate").click(function () {
            var view = new LicitacionView();
            view.Create();
        });

    };

    this.Create = function () {

        //Inicializacion del DTO de licitacion
        var licitacion = {
            titulo: $("#txtTitulo").val(),
            descripcion: $("#txtDescripcion").val(),
            estado: parseInt($("#drpEstado").val()),
            fechaMaxEntrega: $("#txtFechaMaxEntrega").val(),
            fechaMaxOferta: $("#txtFechaMaxOferta").val(),
            presupuesto: $("#txtPresupuesto").val(),
            codigoQr: "",
            automatica: Boolean($("#drpAutomatica").val())
        }

        console.log("Licitacion  " + JSON.stringify(licitacion));

        //Llamando al API
        var ctrlActions = new ControlActions();
        var serviceCreate = this.ApiService + "/Create";

        ctrlActions.PostToAPI(serviceCreate, licitacion, function () {

            alert("Licitacion creada!!!");

            var view = new LicitacionView();

            //Limpiar el formualrio
            view.CleanForm();

        });

    };

    this.CleanForm = function () {
        $("#txtTitulo").val();
        $("#txtDescripcion").val();
        $("#drpEstado").val();
        $("#txtFechaMaxEntrega").val();
        $("#txtFechaMaxOferta").val();
        $("#txtPresupuesto").val();
        $("#drpAutomatica").val();
    };

}

$(document).ready(function () {
    var view = new LicitacionView();
    view.InitView();
});
