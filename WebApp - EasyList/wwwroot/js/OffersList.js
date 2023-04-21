function OffersListView() {
    this.ViewName = "OffersListView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Init Offers List View");

        $('#btnBack').click(function () {
            var view = new OffersListView();
            view.Back();
        });

        this.LoadTable();

    }

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var tenderId = localStorage.getItem('tenderID');
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

    this.Back = function () {
        localStorage.removeItem('tenderID');
        window.location.href = "/Tenders";
    };


}
$(document).ready(function () {
    var view = new OffersListView();
    view.InitView();
})