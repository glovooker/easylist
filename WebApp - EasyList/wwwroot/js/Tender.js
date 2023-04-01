function TenderView() {

    this.ViewTender = "TenderView";
    this.ApiService = "Tender";

    this.InitView = function () {

        console.log("Tender init");

        $("#btnCreate").click(function () {
            var view = new TenderView();
            view.Create();
        });

        $("#btnUpdate").click(function () {
            var view = new TenderView();
            view.Update();
        });

        $("#btnDelete").click(function () {
            var view = new TenderView();
            view.Delete();
        });

        $("#btnNew").click(function () {
            var view = new TenderView();
            view.New();
        });

        this.LoadTable();

    };

    this.Create = function () {

        var tender = {};
        tender.id = parseInt($('#txtID').val()) || 0;
        tender.title = $("#txtTitle").val();
        tender.description = $("#txtDescription").val();
        tender.tenderStatus = parseInt($("#drpStatus").val());
        tender.maxOfferDate = $("#txtMaxOfferDate").val();
        tender.maxDeliverDate = $("#txtMaxDeliverDate").val();
        tender.budget = $("#txtBudget").val();
        tender.QRcode = "";
        tender.automatic = Boolean(parseInt($("#drpAutomatic").val()));
        
        var ctrlActions = new ControlActions();
        var serviceCreate = this.ApiService + "/createTender";

        ctrlActions.PostToAPI(serviceCreate, tender, function () {

            alert("Tender create!!!");

            var view = new TenderView();

            view.CleanForm();

        });

    };

    this.Update = function () {

        var tender = {};
        tender.id = parseInt($('#txtID').val()) || 0;
        tender.title = $("#txtTitle").val();
        tender.description = $("#txtDescription").val();
        tender.tenderStatus = parseInt($("#drpStatus").val());
        tender.maxOfferDate = $("#txtMaxOfferDate").val();
        tender.maxDeliverDate = $("#txtMaxDeliverDate").val();
        tender.budget = $("#txtBudget").val();
        tender.QRcode = "";
        tender.automatic = Boolean(parseInt($("#drpAutomatic").val()));
        console.log(tender);

        var ctrlActions = new ControlActions();
        var serviceUpdate = this.ApiService + "/updateTender";

        ctrlActions.PutToAPI(serviceUpdate, tender, function () {

            alert("Tender update!!!");

            var view = new TenderView();

            view.CleanForm();

        });

    };

    this.Delete = function () {

        var tender = {};
        tender.id = parseInt($('#txtID').val()) || 0;
        tender.title = $("#txtTitle").val();
        tender.description = $("#txtDescription").val();
        tender.tenderStatus = parseInt($("#drpStatus").val());
        tender.maxOfferDate = $("#txtMaxOfferDate").val();
        tender.maxDeliverDate = $("#txtMaxDeliverDate").val();
        tender.budget = $("#txtBudget").val();
        tender.QRcode = "";
        tender.automatic = Boolean(parseInt($("#drpAutomatic").val()));

        var ctrlActions = new ControlActions();
        var serviceDelete = this.ApiService + "/deleteTender";

        ctrlActions.DeleteToAPI(serviceDelete, tender, function () {

            alert("Tender delete!!!");

            var view = new TenderView();

            view.CleanForm();

        });

    };

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveAllTenders'
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

        $('#tblTender tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');

            var data = $('#tblTender').DataTable().row(tr).data();

            var maxOfferDate = new Date(data.maxOfferDate);
            var maxDeliverDate = new Date(data.maxDeliverDate);
            var dateOffer = maxOfferDate.toISOString().substring(0, 10);
            var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

            $('#txtID').val(data.id);
            $('#txtTitle').val(data.title);
            $('#txtDescription').val(data.description);
            $('#drpStatus').val(data.tenderStatus);
            $('#txtMaxOfferDate').val(dateOffer);
            $('#txtMaxDeliverDate').val(dateDeliver);
            $('#txtBudget').val(data.budget);
            $('#drpAutomatic').val(Number(data.automatic));

            $('#btnCreate').prop('disabled', true);
            $('#btnDelete').prop('disabled', false);
            $('#btnUpdate').prop('disabled', false);
        });

    };

    this.ReloadTable = () => {
        $('#tblTender').DataTable().ajax.reload();
    };

    this.New = function () {
        $('#btnCreate').prop('disabled', false);
        $('#btnDelete').prop('disabled', true);
        $('#btnUpdate').prop('disabled', true);

        this.CleanForm();
    };

    this.CleanForm = function () {
        $('#txtID').val("");
        $("#txtTitle").val("");
        $("#txtDescription").val("");
        $("#drpStatus").val("");
        $("#txtMaxOfferDate").val("");
        $("#txtMaxDeliverDate").val("");
        $("#txtBudget").val("");
        $("#drpAutomatic").val("");
    };

}

$(document).ready(function () {
    var view = new TenderView();
    view.InitView();
});
