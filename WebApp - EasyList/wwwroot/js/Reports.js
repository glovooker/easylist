﻿//Controla el comportamiento de la página/vista de Users.cshtml

//Definición de la clase ManagePermissions
function ManagePermissions() {
    this.ViewName = 'UserView';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('User init');

        //Asignación del evento de click del botón
        $('#btnSearch').click(function () {
            var view = new ManagePermissions();
            view.Search();
        });
        //Asignación del evento de click del botón
        $('#btnClean').click(function () {
            var view = new ManagePermissions();
            view.Clean();
        });

        //Llamado al evento de cargar la tabla con toda la data de usuarios
        this.LoadTableEmpty();
    };

    this.LoadTable = function (startDate, endDate) {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/getUsersByDate?startDate=' + startDate + '&endDate=' + endDate
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'name' };
        arrayColumnsData[2] = { 'data': 'firstLastName' };
        arrayColumnsData[3] = { 'data': 'secondLastName' };
        arrayColumnsData[4] = { 'data': 'email' };
        arrayColumnsData[5] = { 'data': 'phone' };
        arrayColumnsData[6] = { 'data': 'registrationDate' };

        $('#tblPermission').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': function (data) {
                    var filteredData = data.filter(function (row) {
                        return row.userStatus === 0;
                    });

                    var transformedData = filteredData.map(function (row) {
                        if (row.userStatus !== 0) {
                            delete row.userStatus;
                        }
                        return row;
                    });

                    return transformedData;
                }
            },
            'columns': arrayColumnsData
        });
    };

    this.ReloadTable = () => {
        $('#tblPermission').DataTable().ajax.reload();
    };

    this.LoadTableEmpty = function () {
        // Destruir la tabla existente si ya ha sido inicializada
        if ($.fn.DataTable.isDataTable('#tblPermission')) {
            $('#tblPermission').DataTable().destroy();
        }

        var arrayColumnsData = [
            { 'data': 'id' },
            { 'data': 'name' },
            { 'data': 'firstLastName' },
            { 'data': 'secondLastName' },
            { 'data': 'email' },
            { 'data': 'phone' },
            { 'data': 'registrationDate' }
        ];

        $('#tblPermission').dataTable({
            'columns': arrayColumnsData,
            'deferRender': true,
            'data': [] // cargar la tabla con un arreglo vacío
        });

        this.tableLoaded = true; // actualizar la bandera
    };

    this.Clean = function () {
        // Limpiar los inputs endDate y startDate
        $('#endDate').val('');
        $('#startDate').val('');

        // Destruir la tabla existente si ya ha sido inicializada
        this.DestroyTable();

        // Cargar la tabla sin contenido
        this.LoadTableEmpty();
    };


    this.DestroyTable = function () {
        var table = $('#tblPermission').DataTable();
        table.destroy();
    };

    this.Search = function () {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

        if (startDate && endDate) {
            startDate = new Date(startDate).toISOString().slice(0, -5);
            endDate = new Date(endDate).toISOString().slice(0, -5);
            this.DestroyTable();
            this.LoadTable(startDate, endDate);

            toastr.success('Query Successful!', 'Showing data related to the date range.');
        } else {
            toastr.error('Error!', 'The date filters cannot be null.');
        }
    };
}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new ManagePermissions();
    view.InitView();
});

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new ManagePermissions();
    view.LoadTableEmpty();

    // Agregar una función para verificar si la tabla ya se cargó
    setInterval(function () {
        if (!view.tableLoaded) {
            view.LoadTableEmpty();
        }
    }, 1000); // tiempo en milisegundos para verificar la bandera
});

function TenderView() {

    this.ViewTenders = "TenderView";
    this.ApiService = "Tender";

    this.InitView = function () {

        console.log("Tender init");

        //Asignación del evento de click del botón
        $('#btnSearch').click(function () {
            var view = new TenderView();
            view.Search();
        });
        //Asignación del evento de click del botón
        $('#btnClean').click(function () {
            var view = new TenderView();
            view.Clean();
        });

        //Llamado al evento de cargar la tabla con toda la data de usuarios
        this.LoadTableEmpty();

    };

    this.LoadTable = function (startDate, endDate) {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/getTendersByDate?startDate=' + startDate + '&endDate=' + endDate
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'title' };
        arrayColumnsData[2] = { 'data': 'description' };
        arrayColumnsData[3] = { 'data': 'tenderStatus' };
        arrayColumnsData[4] = { 'data': 'maxOfferDate' };
        arrayColumnsData[5] = { 'data': 'maxDeliverDate' };
        arrayColumnsData[6] = { 'data': 'budget' };
        arrayColumnsData[7] = { 'data': 'automatic' };

        $('#tblTender').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        this.ReloadTable = () => {
            $('#tblTender').DataTable().ajax.reload();
        };
    }

    this.LoadTableEmpty = function () {
        // Destruir la tabla existente si ya ha sido inicializada
        if ($.fn.DataTable.isDataTable('#tblTender')) {
            $('#tblTender').DataTable().destroy();
        }

        var arrayColumnsData = [
            { 'data': 'id' },
            { 'data': 'title' },
            { 'data': 'description' },
            { 'data': 'tenderStatus' },
            { 'data': 'maxOfferDate' },
            { 'data': 'maxDeliverDate' },
            { 'data': 'budget' },
            { 'data': 'automatic' },
        ];

        $('#tblTender').dataTable({
            'columns': arrayColumnsData,
            'deferRender': true,
            'data': [] // cargar la tabla con un arreglo vacío
        });

        this.tableLoaded = true; // actualizar la bandera
    };

    this.Clean = function () {
        // Limpiar los inputs endDate y startDate
        $('#endDate').val('');
        $('#startDate').val('');

        // Destruir la tabla existente si ya ha sido inicializada
        this.DestroyTable();

        // Cargar la tabla sin contenido
        this.LoadTableEmpty();
    };


    this.DestroyTable = function () {
        var table = $('#tblTender').DataTable();
        table.destroy();
    };

    this.Search = function () {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

        if (startDate && endDate) {
            startDate = new Date(startDate).toISOString().slice(0, -5);
            endDate = new Date(endDate).toISOString().slice(0, -5);
            this.DestroyTable();
            this.LoadTable(startDate, endDate);

            
        } else {
            
        }
    };

}

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new TenderView();
    view.InitView();
});

//Instanciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista.
$(document).ready(function () {
    var view = new TenderView();
    view.LoadTableEmpty();

    // Agregar una función para verificar si la tabla ya se cargó
    setInterval(function () {
        if (!view.tableLoaded) {
            view.LoadTableEmpty();
        }
    }, 1000); // tiempo en milisegundos para verificar la bandera
});