//Controla el comportamiento de la página/vista de Users.cshtml

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
        arrayColumnsData[5] = {
            'data': 'phone',
            'render': function (data) {
                const cleanedNumber = ('' + data).replace(/\D/g, '');
                const match = cleanedNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
                if (match) {
                    return `(+${match[1]}) ${match[2]}-${match[3]}`;
                }
                return data;
            },
        };
        arrayColumnsData[6] = {
            'data': 'registrationDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };

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
        $('#btnBack').hide();
        $('#OfferContainer').hide();
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
            {
                'data': 'phone',
                'render': function (data) {
                    const cleanedNumber = ('' + data).replace(/\D/g, '');
                    const match = cleanedNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
                    if (match) {
                        return `(+${match[1]}) ${match[2]}-${match[3]}`;
                    }
                    return data;
                },
            },
            {
                'data': 'registrationDate',
                'render': function (data) {
                    const isoDate = new Date(data);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
                },
            }
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

        $('#btnBack').click(function () {
            var view = new TenderView();
            view.Back();
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
        arrayColumnsData[2] = {
            'data': 'tenderStatus',
            'render': function (data) {
                const statusMap = {
                    0: 'Open',
                    1: 'Closed',
                    2: 'Ongoing',
                    3: 'Finished',
                    4: 'Terminated',
                };
                return statusMap[data] || data;
            },
        };
        arrayColumnsData[3] = {
            'data': 'maxOfferDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };
        arrayColumnsData[4] = {
            'data': 'maxDeliverDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };
        arrayColumnsData[5] = {
            'data': 'budget',
            'render': function (data) {
                return `$ ${data}`;
            },
        };
        arrayColumnsData[6] = {
            'data': 'automatic',
            'render': function (data) {
                const automaticMap = {
                    'true': 'Automatic',
                    'false': 'Manual'
                };
                return automaticMap[data] || data;
            },
        };

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
            {
                'data': 'tenderStatus',
                'render': function (data) {
                    const statusMap = {
                        0: 'Open',
                        1: 'Closed',
                        2: 'Ongoing',
                        3: 'Finished',
                        4: 'Terminated',
                    };
                    return statusMap[data] || data;
                },
            },
            {
                'data': 'maxOfferDate',
                'render': function (data) {
                    const isoDate = new Date(data);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
                },
            },
            {
                'data': 'maxDeliverDate',
                'render': function (data) {
                    const isoDate = new Date(data);
                    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
                },
            },
            {
                'data': 'budget',
                'render': function (data) {
                    return `$ ${data}`;
                },
            },
            {
                'data': 'automatic',
                'render': function (data) {
                    const automaticMap = {
                        'true': 'Automatic',
                        'false': 'Manual'
                    };
                    return automaticMap[data] || data;
                },
            },
        ];

        $('#tblTender').dataTable({
            'columns': arrayColumnsData,
            'deferRender': true,
            'data': [] // cargar la tabla con un arreglo vacío
        });

        this.tableLoaded = true; // actualizar la bandera

        $('#tblTender tbody').off('click').on('click', 'tr', function () {
            var tr = $(this).closest('tr');
            var data = $('#tblTender').DataTable().row(tr).data();
            var tenderID = data.id;
            console.log(tenderID);
            LoadOffersList(tenderID);
            $('#btnBack').show();
            $('#btnClean').hide();
            $('#btnSearch').hide();
            $('#OfferContainer').show();
            $('#reportsContainer').hide();
        });

    };
    function LoadOffersList(tenderID) {
        var ctrlActions = new ControlActions();
        var urlService = ctrlActions.GetUrlApiService(
            "Offer" + '/retrieveOffersByTenderId?id=' + tenderID
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'user_id' };
        arrayColumnsData[2] = { 'data': 'tender_id' };
        arrayColumnsData[3] = {
            'data': 'chosen',
            'render': function (data) {
                const statusMap = {
                    false: 'No',
                    true: 'Yes',
                };
                return statusMap[data] || data;
            },
        };
        arrayColumnsData[4] = {
            'data': 'dueDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };
        arrayColumnsData[5] = {
            'data': 'totalCost',
            'render': function (data) {
                return `$ ${data}`;
            },
        };

        $('#tblOffer').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });
    };

    this.Back = function () {
        $('#btnBack').hide();
        $('#btnClean').show();
        $('#btnSearch').show();
        $('#OfferContainer').hide();
        $('#reportsContainer').show();
        var table = $('#tblOffer').DataTable();
        table.destroy();
    }

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
