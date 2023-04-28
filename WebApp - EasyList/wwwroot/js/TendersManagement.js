var productsTender = [];

function TenderView() {

    this.ViewTenders = "TenderView";
    this.ApiService = "Tender";

    this.InitView = function () {
        console.log("Tender init");

        $("#btnBack").click(function () {
            var view = new TenderView();
            view.Back();
        });

        $('#btnBack').hide();
        $('#tblOfferContainer').hide();
        $('#TenderProductsContainer').hide();
        $('#OfferProductsContainer').hide();

        this.LoadTable();

    };

    this.Back = function () {

        $('#offerTitle').text("View Offers");
        $('#btnAward').show();
        $('#btnSearch').show();
        $('#btnBack').hide();
        $('#TenderProductsContainer').hide();
        $('#tblTenderContainer').show();
        $('#tblOfferContainer').hide();
        $('#OfferProductsContainer').hide();
    };

    this.LoadTable = function () {

        //La variable analystId extraera el Id del usuario utilizando el localStorage

        var awardOffer = [];

        var analystId = 0;

        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveTendersByAnalystId?id=' + analystId
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = {
            'data': 'id',
        };
        arrayColumnsData[1] = { 'data': 'title' };
        arrayColumnsData[2] = {
            'data': 'tenderStatus',
            'render': function (data) {
                const statusMap = {
                    0: 'Open',
                    1: 'Closed',
                    2: 'Award',
                    3: 'Ongoing',
                    4: 'Finished',
                    5: 'Terminated',
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
        arrayColumnsData[7] = {
            'data': 'deliverLocation',
            'render': function (data, type, row) {
                // Aquí se agrega el offerId al vector 'awardOffer' si no está ya presente
                if (type === 'display') {
                    const offerId = row.offerId || 0;
                    if (!awardOffer.includes(offerId)) {
                        awardOffer.push(offerId);
                    }
                }
                return data;
            },
        };

        console.log(awardOffer);

        $('#tblTender').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });


        $('#tblTender tbody').on('click', 'tr', function () {

            $('#btnBack').show();;

            $('#TenderProductsContainer').show();

            $('#tblOfferContainer').show();

            $('#tblTenderContainer').hide();

            $('#tblOffer').DataTable().destroy();

            var tr = $(this).closest('tr');

            var data = $('#tblTender').DataTable().row(tr).data();

            var acofferId = data.offerId || 0;

            productsTender = data.productTenders;

            var maxOfferDate = new Date(data.maxOfferDate);
            var maxDeliverDate = new Date(data.maxDeliverDate);
            var dateOffer = maxOfferDate.toISOString().substring(0, 10);
            var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

            $('#txtID').text(data.id);
            $('#txtTitle').text(data.title);
            $('#txtDescription').text(data.description);
            $('#drpStatus').text(data.tenderStatus);
            $('#txtMaxOfferDate').text(dateOffer);
            $('#txtMaxDeliverDate').text(dateDeliver);
            $('#txtBudget').text(data.budget);
            $('#drpAutomatic').text(Number(data.automatic));
            $('#txtDeliverLocation').text(data.deliverLocation);

            loadTenderProducts(productsTender);

            $('#tblContainer').hide();
            $('#btnNew').hide();
            $('#btnBack').show();

            var tenderId = tr.find('td:first').text();
            this.OfferView = new OfferView();

            this.LoadTable = function (tenderId) {
                this.OfferView.LoadTable(tenderId, acofferId);
            };


            this.LoadTable(tenderId);
        });

    };

    this.ReloadTable = () => {
        $('#tblTender').DataTable().ajax.reload();
    };

}

loadTenderProducts = function (products) {
    $("#productsTenderContainer").empty();

    products.forEach(function (productTender) {
        // Fetch the product name from a URL
        fetch('https://localhost:7103/api/Product/getProductById?id=' + productTender.product_id)
            .then(response => response.json())
            .then(product => {
                productTender.name = product.name;

                // Create the product card with the updated name
                var productCard = $(`
                    <div class='card w-100 mt-2' id="product${productTender.id}">
                        <div class='card-body d-flex flex-row justify-content-around align-items-center'>
                            <h5 class='card-title m-0'>${productTender.name}</h5>
                            <div class='d-flex flex-row justify-content-around align-items-center w-50'>
                                <p class='card-text m-0'>${productTender.quantity} items</p>
                                <p class='card-text m-0'>$${productTender.price}</p>
                            </div>
                        </div>
                    </div>
                `);

                $("#productsTenderContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
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

        $("#btnClose").click(function () {
            var view = new OfferView();
            view.Close();
        });

        $("#btnAward").click(function () {
            var view = new OfferView();
            view.Award();
        });

    };

    this.Award = function () {
        var ctrlActions = new ControlActions();

        var tenderId = $('#Offer_txtTenderID').text();
        var offerId = $('#Offer_txtOfferID').text();

        console.log(tenderId, offerId);

        var tender = {
            id: tenderId,
            offerId: offerId
        };

        var serviceUpdate = 'Tender/awardTendersWithOfferId?tenderId=' + tenderId + '&offerId=' + offerId;

        ctrlActions.PutToAPI(serviceUpdate, tender, function () {
            toastr.success('We will send an email with the information to the bidder.', 'Awarded offer!');
            setTimeout(function () {
                location.reload();
            }, 5000); // espera de 5 segundos antes de refrescar la página
        });
    };

    this.Close = function () {
        $('#OfferProductsContainer').hide();
    };

    this.LoadTable = async function (tenderId, acofferId) {

        var ctrlActions = new ControlActions();

        var urlService;

        if (acofferId && acofferId != 0) {

            console.log(acofferId);

            urlService = this.ApiService + '/retrieveOfferById?id=' + acofferId;

            $('#btnAward').hide();

            $('#offerTitle').text("View Award Offer");

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

            $("#OfferProductsContainer").show();

            var tr = $(this).closest('tr');

            var data = $('#tblOffer').DataTable().row(tr).data();

            productsOffer = data.productOffers;

            //agregar un if para validar si existen datos en la tabla para ejecutar la funcion de mostrar info

            var maxDeliverDate = new Date(data.dueDate);
            var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

            $('#Offer_txtOfferID').text(data.id);
            $('#Offer_txtTenderID').text(data.tender_id);
            $('#Offer_txtUserID').text(data.user_id);
            $('#Offer_txtTitle').text(data.title);
            $('#Offer_txtMaxDeliverDate').text(dateDeliver);
            $('#Offer_txtBudget').text(data.totalCost);

            loadOfferProducts(productsOffer);

        });

    };

    this.ReloadTable = () => {
        $('#tblOffer').DataTable().ajax.reload();
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
    var view = new OfferView();
    view.InitView();
});
