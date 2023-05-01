function OfferView() {

    this.ViewOffers = "OfferView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Tender init");

        this.LoadDataProductsTender(localStorage.getItem('selectedTenderId'));

        $("#btnCreate").click(function () {
            var view = new OfferView();
            view.Create();
        });

        $('#btnBack').click(function () {
            var view = new OfferView();
            view.Back();
        });
    };

    this.Create = function () {
        var productsOffer = [];
        var ctrlActions = new ControlActions();
        var serviceGetProductTender = "controller" + "/retrieveProductTenders?id=" + localStorage.getItem('selectedTenderId');
        ctrlActions.GetToApi(serviceGetProductTender, function (result) {
            productTender = result.response;
            productsOffer = createProductOffer(productTender);

            var offer = {};
            offer.id = parseInt($('#txtOfferID').val()) || 0;
            offer.user_id = localStorage.getItem('userId');
            offer.tender_id = localStorage.getItem('selectedTenderId');
            offer.comment = 'unset';
            offer.totalCost = parseInt($('#txtBudget').val()) || 0;
            offer.dueDate = $("#txtMaxDeliverDate").val();
            offer.productOffers = productsOffer;

            offer.productOffers.forEach(function (productOffer) {
                productOffer.offer_id = offer.id;
                productOffer.verified = false;
            })

            var isValid = true;

            if (offer.dueDate === '') {
                $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
                $("#error-messageMaxDeliverDate").show();
                isValid = false;
            } else {
                $("#error-messageMaxDeliverDate").hide();
            }

            if (offer.totalCost <= 0 || isNaN(offer.totalCost)) {
                $("#error-messageBudget").html("Budget is required");
                $("#error-messageBudget").show();
                isValid = false;
            } else {
                $("#error-messageBudget").hide();
            }
            if (offer.productOffers.length != productTender.length) {
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            var serviceCreate = this.ApiService + "/createOffer";

            var serviceCheck = this.ApiService + '/checkUserOffer';
            var url = `${serviceCheck}?tender=${offer.tender_id}&user=${offer.user_id}`;
            toastr.options = {
                "positionClass": "toast-top-center",
                "showDuration": "100"
            };

            ctrlActions.GetToApi(url, function (result) {

                if (result.status === 400) {
                    toastr.error('The user has already created an offer for this tender', 'Error!');
                } else {
                    ctrlActions.PostToAPIv1(serviceCreate, offer, function () {
                        toastr.success('Offer created', 'Success!');
                    });
                }
            });

            this.CleanForm();
        }.bind(this));
    };

    this.LoadDataProductsTender = function (id) {
        var ctrlActions = new ControlActions();
        var urlService = "Tender" + "/retrieveTenderById?id=" + id;
        ctrlActions.GetToApi(urlService, function (result) {
            tender = result.response;
            loadProductsCards(tender.productTenders);
        });
    }

    this.Back = function () {
        this.CleanForm();
        window.location.href = "/OpenTenders";
    };

    this.CleanForm = function () {
        $("#txtMaxDeliverDate").val("");
        $("#txtBudget").val("");
    };

    var inputBudget = document.getElementById("txtBudget");

    inputBudget.onkeypress = function (event) {
        var key = event.which || event.keyCode;
        var budgetValue = inputBudget.value;

        if (key >= 48 && key <= 57) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    };


}

loadProductsCards = function (products) {
    $("#productsContainer").empty();

    products.forEach(function (productTender) {
        // Fetch the product name from a URL
        fetch("https://localhost:7103/api/Product/getProductById?id=" + productTender.product_id)
            .then(response => response.json())
            .then(product => {
                productTender.name = product.name;

                // Create the product card with the updated name
                var productCard = $(`
                <div class="card w-100 mt-2" id="product${productTender.product_id}">
                    <div class='card-body d-flex flex-row justify-content-around align-items-center'>
                        <h5 class='card-title m-0'>${productTender.name}</h5>
                        <div class ='d-flex flex-row justify-content-around align-items-center w-50'>
                            <input type="number" class="form-control mx-2" id="txtQuantity${productTender.product_id}" placeholder="${productTender.quantity} items" required>
                            <input type="number" class="form-control mx-2" id="txtPrice${productTender.product_id}" placeholder="$${productTender.price}" required>
                        </div>
                    </div>
                </div>
            `);

                $("#productsContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}

createProductOffer = function (product) {
    var listProducts = [];

    var productOffer;

    product.forEach(function (productTender) {
        // Agregar validación de campos vacíos antes de agregar el producto a la lista
        validateFields(productTender);

        if ($("#txtPrice" + productTender.product_id).val().length > 0 && $("#txtQuantity" + productTender.product_id).val().length > 0) {
            productOffer = {};
            productOffer.id = productTender.product_id;
            productOffer.offer_id = $("#txtOfferID").val();
            productOffer.price = $("#txtPrice" + productTender.product_id).val();
            productOffer.quantity = $("#txtQuantity" + productTender.product_id).val();
            productOffer.product_id = productTender.product_id;
            productOffer.verified = false;
            listProducts.push(productOffer);

            $("#txtPrice" + productTender.product_id).val('');
            $("#txtQuantity" + productTender.product_id).val('');
        }
    });
    if (listProducts.length == product.length) {
        console.log(JSON.stringify(listProducts));
        return listProducts;
    }
}

function validateFields(productTender) {
    var quantityInput = $("#txtQuantity" + productTender.product_id);
    var priceInput = $("#txtPrice" + productTender.product_id);

    if (quantityInput.val() === "") {
        quantityInput.addClass("red-border");
    } else {
        quantityInput.removeClass("red-border");
    }

    if (priceInput.val() === "") {
        priceInput.addClass("red-border");
    } else {
        priceInput.removeClass("red-border");
    }
}

$(document).ready(function () {
    var view = new OfferView();
    view.InitView();
});
