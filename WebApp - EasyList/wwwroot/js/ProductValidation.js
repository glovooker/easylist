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
            $('#Offer_txtUserID').text(offer.id);
            $('#Offer_txtTitle').text(offer.title);
            $('#Offer_txtMaxDeliverDate').text(dateDeliver);
            $('#Offer_txtBudget').text(offer.totalCost);

            loadProducts(offer.productOffers);
        });
    }

    function loadProducts(products) {
        $("#productsOfferContainer").empty();

        products.forEach(function (productOffer) {
            // Fetch the product name from a URL
            fetch('https://localhost:7103/api/Product/getProductById?id=' + productOffer.product_id)
                .then(response => response.json())
                .then(product => {
                    productOffer.name = product.name;

                    // Create the product card with the updated name and verified checkbox
                    var productCard = $(`
                    <div class='card w-100 mt-2' id="product${productOffer.id}">
                        <div class='card-body d-flex flex-row justify-content-around align-items-center'>
                            <h5 class='card-title m-0'>${productOffer.name}</h5>
                            <div class='d-flex flex-row justify-content-around align-items-center w-50'>
                                <p class='card-text m-0'>${productOffer.quantity} items</p>
                                <p class='card-text m-0'>$${productOffer.price}</p>
                                <div class='form-check'>
                                    <input class='form-check-input' type='checkbox' value='' id='verifiedCheckbox${productOffer.id}' ${productOffer.verified ? 'checked' : ''}>
                                    <label class='form-check-label' for='verifiedCheckbox${productOffer.id}'>
                                        Verified
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                    $("#productsOfferContainer").append(productCard);
                })
                .catch(error => console.error(error));
        });
    }


    this.Back = function () {
        localStorage.removeItem('selectedTenderId');
        window.history.back();
    };
}

$(document).ready(function () {
    var view = new ProductValdation();
    view.InitView();
});
