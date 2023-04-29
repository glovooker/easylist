var productsOffer = [];

function OfferView() {

    this.ViewOffers = "OfferView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Tender init");
        //$('#formContainer').hide();
        //$('#btnBack').hide();

        $("#btnCreate").click(function () {
            var view = new OfferView();
            view.Create();
        });

        //$("#btnUpdate").click(function () {
        //    var view = new OfferView();
        //    view.Update();
        //});

        //$("#btnDelete").click(function () {
        //    var view = new OfferView();
        //    view.Delete();
        //});

        //$("#btnNew").click(function () {
        //    var view = new OfferView();
        //    view.New();
        //});

        $('#btnBack').click(function () {
            var view = new OfferView();
            view.Back();
        });

        /*this.LoadTable();*/

        loadProductSelect();
    };

    this.Create = function () {

        var offer = {};
        offer.id = parseInt($('#txtOfferID').val()) || 0;
        offer.user_id = localStorage.getItem('userId');
        offer.tender_id = localStorage.getItem('selectedTenderId');
        offer.chosen = false;
        offer.totalCost = parseInt($('#txtBudget').val()) || 0;
        offer.dueDate = $("#txtMaxDeliverDate").val();
        offer.productOffers = productsOffer || [];

        offer.productOffers.forEach(function (productOffer) {
            productOffer.offer_id = offer.id;
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

    //this.Update = function () {
    //    var offer = {};
    //    offer.id = parseInt($('#txtOfferID').val()) || 0;
    //    offer.user_id = 5;
    //    offer.tender_id = parseInt($('#txtTenderID').val()) || 0;
    //    offer.chosen = false;
    //    offer.totalCost = parseInt($('#txtBudget').val()) || 0;
    //    offer.dueDate = $("#txtMaxDeliverDate").val();
    //    offer.productOffers = productsOffer || [];

    //    offer.productOffers.forEach(function (productOffer) {
    //        productOffer.offer_id = offer.id;
    //    })

    //    var isValid = true;

    //    if (offer.maxDeliverDate === '') {
    //        $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
    //        $("#error-messageMaxDeliverDate").show();
    //        isValid = false;
    //    } else {
    //        $("#error-messageMaxDeliverDate").hide();
    //    }

    //    if (offer.budget === '') {
    //        $("#error-messageBudget").html("Budget is required");
    //        $("#error-messageBudget").show();
    //        isValid = false;
    //    } else {
    //        $("#error-messageBudget").hide();
    //    }

    //    if (!isValid) {
    //        return;
    //    }

    //    var ctrlActions = new ControlActions();
    //    var serviceUpdate = this.ApiService + "/updateOffer";

    //    ctrlActions.PutToAPI(serviceUpdate, offer, function () {
    //        toastr.success('Offer updated', 'Success!');
    //        var view = new OfferView();

    //        $('#tblContainer').show();
    //        $('#formContainer').hide();
    //        $('#btnNew').show();
    //        $('#btnBack').hide();
    //        view.ReloadTable();
    //        view.CleanForm();
    //    });
    //};

    //this.Delete = function () {

    //    var offer = {};
    //    offer.id = parseInt($('#txtOfferID').val()) || 0;
    //    offer.user_id = 5;
    //    offer.tender_id = parseInt($('#txtTenderID').val()) || 0;
    //    offer.chosen = false;
    //    offer.totalCost = parseInt($('#txtBudget').val()) || 0;
    //    offer.dueDate = $("#txtMaxDeliverDate").val();
    //    offer.productOffers = productsOffer || [];

    //    offer.productOffers.forEach(function (productOffer) {
    //        productOffer.offer_id = offer.id;
    //    })

    //    var isValid = true;

    //    if (offer.maxDeliverDate === '') {
    //        $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
    //        $("#error-messageMaxDeliverDate").show();
    //        isValid = false;
    //    } else {
    //        $("#error-messageMaxDeliverDate").hide();
    //    }

    //    if (offer.budget === '') {
    //        $("#error-messageBudget").html("Budget is required");
    //        $("#error-messageBudget").show();
    //        isValid = false;
    //    } else {
    //        $("#error-messageBudget").hide();
    //    }

    //    if (!isValid) {
    //        return;
    //    }

    //    var ctrlActions = new ControlActions();
    //    var serviceDelete = this.ApiService + "/deleteOffer";

    //    ctrlActions.DeleteToAPI(serviceDelete, offer, function () {
    //        toastr.success('Offer deleted', 'Success!');
    //        var view = new OfferView();

    //        $('#tblContainer').show();
    //        $('#formContainer').hide();
    //        $('#btnNew').show();
    //        $('#btnBack').hide();
    //        view.ReloadTable();
    //        view.CleanForm();
    //    });
    //};

    //this.LoadTable = function () {
    //    var ctrlActions = new ControlActions();

    //    var urlService = ctrlActions.GetUrlApiService(
    //        this.ApiService + '/retrieveAllOffers'
    //    );

    //    var arrayColumnsData = [];
    //    arrayColumnsData[0] = { 'data': 'id' };
    //    arrayColumnsData[1] = { 'data': 'user_id' };
    //    arrayColumnsData[2] = { 'data': 'tender_id' };
    //    arrayColumnsData[3] = {
    //        'data': 'chosen',
    //        'render': function (data) {
    //            const statusMap = {
    //                false: 'No',
    //                true: 'Yes',
    //            };
    //            return statusMap[data] || data;
    //        },
    //    };
    //    arrayColumnsData[4] = {
    //        'data': 'dueDate',
    //        'render': function (data) {
    //            const isoDate = new Date(data);
    //            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    //            return isoDate.toLocaleDateString('en-GB', options).replace(/\//g, '/');
    //        }, };
    //    arrayColumnsData[5] = {
    //        'data': 'totalCost',
    //        'render': function (data) {
    //            return `$ ${data}`;
    //        },
    //    };

    //    $('#tblOffer').dataTable({
    //        'ajax': {
    //            'url': urlService,
    //            'dataSrc': '',
    //        },
    //        'columns': arrayColumnsData,
    //    });

    //    $('#tblOffer tbody').on('click', 'tr', function () {

    //        var tr = $(this).closest('tr');

    //        var data = $('#tblOffer').DataTable().row(tr).data();

    //        productsOffer = data.productOffers;

    //        var maxDeliverDate = new Date(data.dueDate);
    //        var dateDeliver = maxDeliverDate.toISOString().substring(0, 10);

    //        $('#txtOfferID').val(data.id);
    //        $('#txtTenderID').val(data.id);
    //        $('#txtUserID').val(data.id);
    //        $('#txtTitle').val(data.title);
    //        $('#txtMaxDeliverDate').val(dateDeliver);
    //        $('#txtBudget').val(data.totalCost);

    //        loadProducts(productsOffer);

    //        $('#tblContainer').hide();
    //        $('#formContainer').show();
    //        $('#btnNew').hide();
    //        $('#btnBack').show();
    //        $('#txtTenderID').prop('disabled', true);
    //        $('#txtOfferID').prop('disabled', true);
    //        $('#btnCreate').prop('disabled', true);
    //        $('#btnDelete').prop('disabled', false);
    //        $('#btnUpdate').prop('disabled', false);
    //    });

    //};

    //this.ReloadTable = () => {
    //    $('#tblOffer').DataTable().ajax.reload();
    //};

    //this.New = function () {
    //    $('#tblContainer').hide();
    //    $('#formContainer').show();
    //    $('#btnNew').hide();
    //    $('#btnBack').show();
    //    $('#txtTenderID').prop('disabled', false);
    //    $('#txtOfferID').prop('disabled', false);
    //    $('#btnCreate').prop('disabled', false);
    //    $('#btnDelete').prop('disabled', true);
    //    $('#btnUpdate').prop('disabled', true);

    //    this.CleanForm();
    //};

    this.Back = function () {
        //$('#formContainer').hide();
        //$('#tblContainer').show();
        //$('#btnNew').show();
        //$('#btnBack').hide();
        //$('#btnCreate').prop('disabled', true);
        //$('#btnDelete').prop('disabled', false);
        //$('#btnUpdate').prop('disabled', false);

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

loadProductSelect = () => {
    fetch('https://localhost:7103/api/Product/getAllProducts')
        .then(response => response.json())
        .then(products => {
            const select = document.getElementById('drpProduct');
            products.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.text = product.name;
                    select.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

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


loadProducts = function (products) {
    $("#productsContainer").empty();

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
                            <button type="button" class="btn btn-primary w-25 delete-btn" onclick="deleteProductOffer(${productOffer.id})" style="width:100%"><i class="bi bi-trash-fill text-white"></i></button>
                        </div>
                    </div>
                `);

                $("#productsContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}



$(document).ready(function () {
    var view = new OfferView();
    view.InitView();
});
