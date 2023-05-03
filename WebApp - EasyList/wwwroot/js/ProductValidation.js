var productsOffer = [];
var productTenders = [];
var idUser;
var comment;
var idTender;

function ProductValdation() {
    this.ViewName = "ProductValdationView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Init Offers List View");

        $('#btnBack').click(function () {
            var view = new ProductValdation();
            view.Back();
        });

        $('#btnSend').click(function () {
            var view = new ProductValdation();
            view.Send();
        });

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const idOffer = urlParams.get('idOffer');
        idTender = urlParams.get('idTender');

        this.LoadProduct(idOffer);


    }

    this.LoadProduct = function (id) {
        var ctrlActions = new ControlActions();
        var urlService = this.ApiService + "/retrieveOfferById?id=" + id;
        ctrlActions.GetToApi(urlService, function (result) {
            offer = result.response;

            var maxDeliverDate = new Date(offer.dueDate);
            var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

            $('#Offer_txtOfferID').text(offer.id);
            $('#Offer_txtTenderID').text(offer.tender_id);
            idUser = offer.user_id;
            $('#Offer_txtTitle').text(offer.title);
            $('#Offer_txtMaxDeliverDate').text(dateDeliver);
            $('#Offer_txtBudget').text(offer.totalCost);

            loadProducts(offer.productOffers);

            productsOffer = offer.productOffers;

            comment = offer.comment;

            if (comment != 'unset') {

                $('#btnSend').hide();
                $('#Offer_txtComment').val(comment).prop('disabled', true).css('resize', 'none');

            }

        });
    }

    function loadProducts(products) {
        var tbody = $('#productsOfferContainer');

        products.forEach(function (productOffer) {
            // Fetch the product name from a URL
            fetch('https://jhidalgou-mathapi.azurewebsites.net/api/Product/getProductById?id=' + productOffer.product_id)
                .then(response => response.json())
                .then(product => {
                    productOffer.name = product.name;
                    var tr = $('<tr>');
                    tr.append($('<td>').text(productOffer.name));
                    tr.append($('<td>').text(productOffer.quantity));
                    tr.append($('<td>').text('$' + productOffer.price));
                    var verifiedCheckbox = $('<input>').addClass('form-check-input').attr({
                        type: 'checkbox',
                        id: 'verifiedCheckbox' + productOffer.id,
                        checked: productOffer.verified
                    });
                    var label = $('<label>').addClass('form-check-label').attr('for', 'verifiedCheckbox' + productOffer.id);
                    var td = $('<td>').append($('<div>').addClass('form-check').append(verifiedCheckbox, label));

                    if (comment != 'unset') {
                        verifiedCheckbox.prop('disabled', true);
                    }

                    tr.append(td);
                    tbody.append(tr);
                })
                .catch(error => console.error(error));
        });
    }

    this.Send = function () {
        var offer = {};
        offer.id = parseInt($('#Offer_txtOfferID').text()) || 0;
        offer.user_id = idUser;
        offer.tender_id = parseInt($('#Offer_txtTenderID').text()) || 0;
        offer.comment = $('#Offer_txtComment').val().trim();
        offer.totalCost = parseInt($('#Offer_txtBudget').text()) || 0;
        offer.dueDate = $("#Offer_txtMaxDeliverDate").text();
        offer.productOffers = productsOffer || [];

        var isValid = true;

        if (offer.comment === '') {
            $("#error-messagecomment").html("Comment is required");
            $("#error-messagecomment").show();
            isValid = false;
        } else {
            $("#error-messagecomment").hide();
        }

        if (!isValid) {
            return;
        }

        for (var i = 0; i < offer.productOffers.length; i++) {
            var oldVerified = offer.productOffers[i].verified;
            var newVerified = $("#verifiedCheckbox" + i).is(":checked");
            if (oldVerified !== newVerified) {
                offer.productOffers[i].verified = newVerified;
            }
        }

        var ctrlActions = new ControlActions();
        var serviceUpdate = this.ApiService + "/updateoffer";

        var self = this;
        ctrlActions.PutToAPI(serviceUpdate, offer, function () {

            toastr.success('Offer validated', 'Success!');
            self.LoadTenderInfo(idTender);
            
        });
    };

    this.LoadTenderInfo = function (idTender) {
        var ctrlActions = new ControlActions();
        var serviceGetById = "Tender/retrieveTenderById?id=" + idTender;

        ctrlActions.GetToApi(serviceGetById, function (response) {
            var allData = response.response;

            var tender = {
                id: idTender,
                title: allData.title,
                description: allData.description,
                tenderStatus: 4,
                maxOfferDate: allData.maxOfferDate,
                maxDeliverDate: allData.maxDeliverDate,
                budget: allData.budget,
                QRcode: allData.qRcode,
                automatic: allData.automatic,
                deliverLocation: allData.deliverLocation,
                productTenders: allData.productTenders || []
            };


            var serviceUpdate = "Tender/updateTender";
            ctrlActions.PutToAPI(serviceUpdate, tender, function () {
                toastr.success('Tender updated', 'Success!');
                setTimeout(function () {
                    window.location.href = "/tenders";
                }, 5000);
            });
        });
    };

    this.Back = function () {
        window.history.back();
    };
}

$(document).ready(function () {
    var view = new ProductValdation();
    view.InitView();
});
