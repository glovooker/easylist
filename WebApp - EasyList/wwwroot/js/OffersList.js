function OffersListView() {
    this.ViewName = "OffersListView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Init Offers List View");

        $('#btnBack').click(function () {
            var view = new OffersListView();
            view.Back();
        });

        $('#btnBack2').click(function () {
            var view = new OffersListView();
            view.Back2();
        });

        $('#offerAward').hide();

        this.LoadTable();

    }

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var tenderId = localStorage.getItem('selectedTenderId');
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

        $('#tblOffer tbody').on('click', 'tr', function () {

            var table = $('#tblOffer').DataTable();
            var data = table.row($(this)).data();

            if (!data) {
                // Mostrar advertencia si no hay datos
                toastr.warning('There are not offers associated with this tender.');
                return;
            }

            $("#offerAward").show();
            var tr = $(this).closest('tr');
            productsOffer = data.productOffers;

            var maxDeliverDate = new Date(data.dueDate);
            var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

            $('#Offer_txtOfferID').text(data.id);
            $('#Offer_txtTenderID').text(data.tender_id);
            $('#Offer_txtUserID').text(data.id);
            $('#Offer_txtTitle').text(data.title);
            $('#Offer_txtMaxDeliverDate').text(dateDeliver);
            $('#Offer_txtBudget').text(data.totalCost);

            loadOfferProducts(productsOffer);
            $("#offersList").hide();

        });

    };

    this.Back = function () {
        localStorage.removeItem('selectedTenderId');
        window.location.href = "/Tenders";
    };

    this.Back2 = function () {
        $("#offerAward").hide();
        $("#offersList").show();
    };
}

loadOfferProducts = function (products) {
    $("#productsOfferContainer").empty();

    products.forEach(function (productOffer) {
        // Fetch the product name from a URL
        fetch('https://localhost:7103/api/Product/getProductById?id=' + productOffer.product_id)
            .then(response => response.json())
            .then(product => {
                productOffer.name = product.name;

                // Create the product card with the updated name
                var productCard = $(`
                    <div class='card w-100 mt-2' id="product${productOffer.id}">
                        <div class='card-body d-flex flex-row justify-content-around align-items-center'>
                            <h5 class='card-title m-0'>${productOffer.name}</h5>
                            <div class='d-flex flex-row justify-content-around align-items-center w-50'>
                                <p class='card-text m-0'>${productOffer.quantity} items</p>
                                <p class='card-text m-0'>$${productOffer.price}</p>
                            </div>
                        </div>
                    </div>
                `);

                $("#productsOfferContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}
$(document).ready(function () {
    var view = new OffersListView();
    view.InitView();
})