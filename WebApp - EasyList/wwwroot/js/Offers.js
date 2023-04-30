var productsOffer = [];

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

        var offer = {};
        offer.id = parseInt($('#txtOfferID').val()) || 0;
        offer.user_id = localStorage.getItem('userId');
        offer.tender_id = localStorage.getItem('selectedTenderId');
        offer.comment = 'unset';
        offer.totalCost = parseInt($('#txtBudget').val()) || 0;
        offer.dueDate = $("#txtMaxDeliverDate").val();
        offer.productOffers = productsOffer || [];

        offer.productOffers.forEach(function (productOffer) {
            productOffer.offer_id = offer.id;
            productOffer.verified = false;
        })

        var isValid = true;

        if (offer.maxDeliverDate === '') {
            $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
            $("#error-messageMaxDeliverDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxDeliverDate").hide();
        }

        if (offer.budget === '') {
            $("#error-messageBudget").html("Budget is required");
            $("#error-messageBudget").show();
            isValid = false;
        } else {
            $("#error-messageBudget").hide();
        }

        if (!isValid) {
            return;
        }

        var ctrlActions = new ControlActions();
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
        $("#productsContainer").empty();
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
                            <input type="number" class="form-control mx-2" id="txtQuantity${productTender.product_id}" placeholder="${productTender.quantity} items">
                            <input type="number" class="form-control mx-2" id="txtPrice${productTender.product_id}" placeholder="$${productTender.price}">
                        </div>
                    </div>
                </div>
                `);

                $("#productsContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}

//loadProductSelect = () => {
//    fetch('https://localhost:7103/api/Product/getAllProducts')
//        .then(response => response.json())
//        .then(products => {
//            const select = document.getElementById('drpProduct');
//            products.forEach(product => {
//                    const option = document.createElement('option');
//                    option.value = product.id;
//                    option.text = product.name;
//                    select.appendChild(option);
//            });
//        })
//        .catch(error => console.error(error));
//}

createProductOffer = function () {

    var productOffer = {};

    productOffer.id = $("#drpProduct").val();
    productOffer.offer_id = $("#txtOfferID").val();
    productOffer.name = $("#drpProduct option:selected").text();
    productOffer.price = $("#txtPrice").val();
    productOffer.quantity = $("#txtQuantity").val();
    productOffer.product_id = $("#drpProduct").val();

    productsOffer.push(productOffer);
    loadProducts(productsOffer);

    $('#drpProduct').val('');
    $('#txtQuantity').val('');
    $('#txtPrice').val('');
}

deleteProductOffer = function (id) {
    // Find the index of the product with the matching id
    var index = productsOffer.findIndex(function (product) {
        return product.id == id;
    });

    if (index !== -1) {
        // Remove the product from the array
        var deletedProduct = productsOffer.splice(index, 1)[0];

        // Update the display and select element
        loadProducts(productsOffer);

        // Show the option in the select element
        $('#drpProduct option[value="' + deletedProduct.product_id + '"]').show();
    }
    $('#drpProduct').val('');
    $('#txtQuantity').val('');
    $('#txtPrice').val('');

}


//loadProducts = function (products) {
//    $("#productsContainer").empty();

//    products.forEach(function (productOffer) {
//        // Fetch the product name from a URL
//        fetch('https://localhost:7103/api/Product/getProductById?id=' + productOffer.product_id)
//            .then(response => response.json())
//            .then(product => {
//                productOffer.name = product.name;

//                // Create the product card with the updated name
//                var productCard = $(`
//                    <div class='card w-100 mt-2' id="product${productOffer.id}">
//                        <div class='card-body d-flex flex-row justify-content-around align-items-center'>
//                            <h5 class='card-title m-0'>${productOffer.name}</h5>
//                            <div class='d-flex flex-row justify-content-around align-items-center w-50'>
//                                <p class='card-text m-0'>${productOffer.quantity} items</p>
//                                <p class='card-text m-0'>$${productOffer.price}</p>
//                            </div>
//                            <button type="button" class="btn btn-primary w-25 delete-btn" onclick="deleteProductOffer(${productOffer.id})" style="width:100%"><i class="bi bi-trash-fill text-white"></i></button>
//                        </div>
//                    </div>
//                `);

//                $("#productsContainer").append(productCard);
//            })
//            .catch(error => console.error(error));
//    });
//}



$(document).ready(function () {
    var view = new OfferView();
    view.InitView();
});
