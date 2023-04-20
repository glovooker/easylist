var productsTender = [];

function TenderView() {

    this.ViewTenders = "TenderView";
    this.ApiService = "Tender";

    this.InitView = function () {
        console.log("Tender init");

        $("#btnSearch").click(function () {
            var view = new TenderView();
            view.Search();
            //La función Search sera eliminada debido a que el id se extraera del localStorage, por lo correcto seria solamente
            //view.LoadTable(analystId0);
        });
    };

    //La función Search sera eliminada debido a que el id se extraera del localStorage
    this.Search = function () {
        var analystId = document.getElementById('txtAnalystID').value;
        this.txtAnalystID = analystId;
        $('#tblTender').DataTable().destroy();
        $('#tblOffer').DataTable().destroy();
        $('#tblOffer tbody').empty();


        this.LoadTable(this.txtAnalystID);
    };

    this.LoadTable = function (analystId) {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveTendersByAnalystId?id=' + analystId
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
        arrayColumnsData[7] = { 'data': 'deliverLocation' };

        $('#tblTender').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        $('#tblTender tbody').on('click', 'tr', function () {

            $('#tblOffer').DataTable().destroy();

            var tr = $(this).closest('tr');
            var tenderId = tr.find('td:first').text();
            this.OfferView = new OfferView();

            this.LoadTable = function (tenderId) {
                this.OfferView.LoadTable(tenderId);
            };


            this.LoadTable(tenderId);
        });

    };

    this.ReloadTable = () => {
        $('#tblTender').DataTable().ajax.reload();
    };

}

$(document).ready(function () {
    var view = new TenderView();
    view.InitView();
});

var productsOffer = [];

function OfferView() {

    this.ViewOffers = "OfferView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Offer init");
    };

    this.LoadTable = function (tenderId) {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveOffersByTenderId?id=' + tenderId
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

    this.ReloadTable = () => {
        $('#tblOffer').DataTable().ajax.reload();
    };

}

$(document).ready(function () {
    var view = new OfferView();
    view.InitView();
});
