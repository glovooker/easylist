function BillingView() {
    this.ViewName = "BillingView";
    this.ApiService = "Billing";

    this.InitView = function () {
        console.log("Init Billing");

        $('#btnBack').click(function () {
            var view = new BillingView();
            view.Back();
        });

        this.LoadTable();
    }
    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var userId = localStorage.getItem('userId');
        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveBillingById?id=' + userId
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'suscriptionId' };
        arrayColumnsData[2] = {
            'data': 'billingDate',
            'render': function (data) {
                const isoDate = new Date(data);
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
            },
        };
        arrayColumnsData[3] = {
            'data': 'amount',
            'render': function (data) {
                return `$ ${data}`;
            },
        };

        $('#tblBilling').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
            'fnInitComplete': function () {
                // Comprobar si la tabla tiene datos
                var dataTable = $('#tblBilling').DataTable();
                if (dataTable.data().length === 0) {
                    // Si la tabla está vacía, ocultarla y mostrar el div contenedor
                    $('#tblContainer').hide();
                    $('#noBillingContainer').removeClass('d-none');
                }
            },
        });
    }

    this.Back = function () {
        window.location.href = "/Index";
    };

}
$(document).ready(function () {
    var view = new BillingView();
    view.InitView();
})