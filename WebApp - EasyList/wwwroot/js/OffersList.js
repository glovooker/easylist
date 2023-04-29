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

        $('#btnAward').click(function () {
            var view = new OffersListView();
            view.Award();
        });

        $('#btnValidate').click(function () {
            var view = new OffersListView();
            view.Validate();
        });

        $('#btnValidate').hide();

        $('#offerAward').hide();

        this.LoadTable();

    }

    this.LoadTable = async function () {

        var ctrlActions = new ControlActions();
        var tenderId = localStorage.getItem('selectedTenderId');
        var acofferId = localStorage.getItem('awardOfferId');

        var urlService;

        if (acofferId && acofferId != 0) {

            console.log(acofferId);

            urlService = this.ApiService + '/retrieveOfferById?id=' + acofferId;

            $('#btnAward').hide();

            $('#btnValidate').show();

            $('#offerTitle').text("Award Offer");

        } else {
            urlService = this.ApiService + '/retrieveOffersByTenderId?id=' + tenderId;
        }

        var finalUrlService = ctrlActions.GetUrlApiService(urlService);

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

        var result = await $.ajax({
            url: finalUrlService,
            type: 'GET',
            data: '',
        });

        if (acofferId && acofferId != 0) {
            result = [result];
        }

        $('#tblOffer').dataTable({
            'data': result,
            'columns': arrayColumnsData
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

    this.Award = function () {
        var ctrlActions = new ControlActions();

        var tenderId = $('#Offer_txtTenderID').text();
        var offerId = $('#Offer_txtOfferID').text();

        console.log(tenderId, offerId);

        var tender = {
            id: tenderId,
            offerId: offerId,
            CODIGOQR: ""
        };

        var serviceUpdate = 'Tender/awardTendersWithOfferId?tenderId=' + tenderId + '&offerId=' + offerId;

        ctrlActions.PutToAPI(serviceUpdate, tender, function () {
            toastr.success('We will send an email with the information to the bidder.', 'Awarded offer!');
            setTimeout(function () {
                location.reload();
            }, 5000); // espera de 5 segundos antes de refrescar la página
        });
    };

    this.Validate = function () {

        var tenderId = $('#Offer_txtTenderID').text();
        var offerId = $('#Offer_txtOfferID').text();

        window.location.href = '/ProductValidation/?idTender=' + tenderId + '&idOffer=' + offerId;
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