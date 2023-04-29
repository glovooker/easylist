function MyOffersView() {
    this.ViewName = "MyOffersView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Init My Offers View");

        $('#btnBack').click(function () {
            var view = new MyOffersView();
            view.Back();
        });

        this.LoadTable();
    }
    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var offererId = localStorage.getItem('userId');
        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveOffersByOffererId?id=' + offererId
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
            'fnInitComplete': function () {
                // Comprobar si la tabla tiene datos
                var dataTable = $('#tblOffer').DataTable();
                if (dataTable.data().length === 0) {
                    // Si la tabla está vacía, ocultarla y mostrar el div contenedor
                    $('#tblContainer').hide();
                    $('#noOffersContainer').removeClass('d-none');
                }
            },
        });
    }

    this.Back = function () {
        window.location.href = "/Index";
    };

}
$(document).ready(function () {
    var view = new MyOffersView();
    view.InitView();
})