var productsTender = [];

function TenderView() {

    this.ViewTenders = "TenderView";
    this.ApiService = "Tender";

    this.InitView = function () {
        console.log("Tender init");
        $('#formContainer').hide();
        $('#btnBack').hide();

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

        $('#btnBack').click(function () {
            var view = new TenderView();
            view.Back();
        });

        $('#btnOffers').click(function () {
            var view = new TenderView();
            view.Offers();
        });

        this.LoadTable();

        loadProductSelect();
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
        tender.deliverLocation = $("#txtDeliverLocation").val();
        tender.productTenders = productsTender || [];

        tender.productTenders.forEach(function (productTender) {
            productTender.tender_id = tender.id;
        })

        var isValid = true;

        if (tender.title === '') {
            $("#error-messageTitle").html("Title is required");
            $("#error-messageTitle").show();
            isValid = false;
        } else {
            $("#error-messageTitle").hide();
        }

        if (tender.description === '') {
            $("#error-messageDescription").html("Description is required");
            $("#error-messageDescription").show();
            isValid = false;
        } else {
            $("#error-messageDescription").hide();
        }

        if (tender.deliverLocation === '') {
            $("#error-messageDeliverLocation").html("Deliver Location is required");
            $("#error-messageDeliverLocation").show();
            isValid = false;
        } else {
            $("#error-messageDeliverLocation").hide();
        }

        if (tender.maxDeliverDate === '') {
            $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
            $("#error-messageMaxDeliverDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxDeliverDate").hide();
        }

        if (tender.maxOfferDate === '') {
            $("#error-messageMaxOfferDate").html("MaxOfferDate is required");
            $("#error-messageMaxOfferDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxOfferDate").hide();
        }

        if (tender.budget === '') {
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
        var serviceCreate = this.ApiService + "/createTender";

        ctrlActions.PostToAPIv1(serviceCreate, tender, function () {
            toastr.success('Tender created', 'Success!')
            var view = new TenderView();

            $('#tblContainer').show();
            $('#formContainer').hide();
            $('#btnNew').show();
            $('#btnBack').hide();
            $('#btnOffers').hide();
            view.ReloadTable();
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
        tender.deliverLocation = $("#txtDeliverLocation").val();
        tender.productTenders = productsTender || [];

        var isValid = true;

        if (tender.title === '') {
            $("#error-messageTitle").html("Title is required");
            $("#error-messageTitle").show();
            isValid = false;
        } else {
            $("#error-messageTitle").hide();
        }

        if (tender.description === '') {
            $("#error-messageDescription").html("Description is required");
            $("#error-messageDescription").show();
            isValid = false;
        } else {
            $("#error-messageDescription").hide();
        }

        if (tender.deliverLocation === '') {
            $("#error-messageDeliverLocation").html("Deliver Location is required");
            $("#error-messageDeliverLocation").show();
            isValid = false;
        } else {
            $("#error-messageDeliverLocation").hide();
        }

        if (tender.maxDeliverDate === '') {
            $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
            $("#error-messageMaxDeliverDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxDeliverDate").hide();
        }

        if (tender.maxOfferDate === '') {
            $("#error-messageMaxOfferDate").html("MaxOfferDate is required");
            $("#error-messageMaxOfferDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxOfferDate").hide();
        }

        if (tender.budget === '') {
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
        var serviceUpdate = this.ApiService + "/updateTender";

        ctrlActions.PutToAPI(serviceUpdate, tender, function () {
            toastr.success('Tender updated', 'Success!');
            var view = new TenderView();

            $('#tblContainer').show();
            $('#formContainer').hide();
            $('#btnNew').show();
            $('#btnBack').hide();
            $('#btnOffers').hide();
            view.ReloadTable();
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
        tender.deliverLocation = $("#txtDeliverLocation").val();
        tender.productTenders = productsTender || [];

        var isValid = true;

        if (tender.title === '') {
            $("#error-messageTitle").html("Title is required");
            $("#error-messageTitle").show();
            isValid = false;
        } else {
            $("#error-messageTitle").hide();
        }

        if (tender.description === '') {
            $("#error-messageDescription").html("Description is required");
            $("#error-messageDescription").show();
            isValid = false;
        } else {
            $("#error-messageDescription").hide();
        }

        if (tender.deliverLocation === '') {
            $("#error-messageDeliverLocation").html("Deliver Location is required");
            $("#error-messageDeliverLocation").show();
            isValid = false;
        } else {
            $("#error-messageDeliverLocation").hide();
        }

        if (tender.maxDeliverDate === '') {
            $("#error-messageMaxDeliverDate").html("MaxDeliverDate is required");
            $("#error-messageMaxDeliverDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxDeliverDate").hide();
        }

        if (tender.maxOfferDate === '') {
            $("#error-messageMaxOfferDate").html("MaxOfferDate is required");
            $("#error-messageMaxOfferDate").show();
            isValid = false;
        } else {
            $("#error-messageMaxOfferDate").hide();
        }

        if (tender.budget === '') {
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
        var serviceDelete = this.ApiService + "/deleteTender";

        ctrlActions.DeleteToAPI(serviceDelete, tender, function () {
            toastr.success('Tender deleted', 'Success!');
            var view = new TenderView();

            $('#tblContainer').show();
            $('#formContainer').hide();
            $('#btnNew').show();
            $('#btnBack').hide();
            $('#btnOffers').hide();
            view.ReloadTable();
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
        arrayColumnsData[2] = {
            'data': 'tenderStatus',
            'render': function (data) {
                const statusMap = {
                    0: 'Open',
                    1: 'Closed',
                    2: 'Ongoing',
                    3: 'Finished',
                    4: 'Terminated',
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
        arrayColumnsData[7] = { 'data': 'deliverLocation' };

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

            productsTender = data.productTenders;

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
            $('#txtDeliverLocation').val(data.deliverLocation);

            loadProducts(productsTender);

            $('#tblContainer').hide();
            $('#formContainer').show();
            $('#btnNew').hide();
            $('#btnBack').show();
            $('#btnOffers').show();
            $('#btnCreate').prop('disabled', true);
            $('#btnDelete').prop('disabled', false);
            $('#btnUpdate').prop('disabled', false);
        });

    };

    this.ReloadTable = () => {
        $('#tblTender').DataTable().ajax.reload();
    };

    this.New = function () {
        $('#tblContainer').hide();
        $('#formContainer').show();
        $('#btnNew').hide();
        $('#btnOffers').hide();
        $('#btnBack').show();
        $('#btnCreate').prop('disabled', false);
        $('#btnDelete').prop('disabled', true);
        $('#btnUpdate').prop('disabled', true);

        this.CleanForm();
    };

    this.Back = function () {
        $('#formContainer').hide();
        $('#tblContainer').show();
        $('#btnNew').show();
        $('#btnBack').hide();
        $('#btnOffers').hide();
        $('#btnCreate').prop('disabled', true);
        $('#btnDelete').prop('disabled', false);
        $('#btnUpdate').prop('disabled', false);

        this.CleanForm();
    };

    this.CleanForm = function () {
        $('#txtID').val("");
        $("#txtTitle").val("");
        $("#txtDescription").val("");
        $("#drpStatus").val("0");
        $("#txtMaxOfferDate").val("");
        $("#txtMaxDeliverDate").val("");
        $("#txtBudget").val("");
        $("#drpAutomatic").val("0");
        $("#txtDeliverLocation").val("");
        $("#productsContainer").empty();
    };

    this.Offers = function () {
        var tenderId = parseInt($('#txtID').val()) || 0;
        localStorage.setItem('selectedTenderId', tenderId);
        window.location.href = "/OffersList";


    }

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

createProductTender = function () {

    var productTender = {};

    productTender.id = $("#drpProduct").val();
    productTender.tender_id = $("#txtID").val();
    productTender.name = $("#drpProduct option:selected").text();
    productTender.price = $("#txtPrice").val();
    productTender.quantity = $("#txtQuantity").val();
    productTender.product_id = $("#drpProduct").val();

    productsTender.push(productTender);
    loadProducts(productsTender);

    $('#drpProduct option:selected').hide()
    $('#drpProduct').val('');
    $('#txtQuantity').val('');
    $('#txtPrice').val('');
}

deleteProductTender = function (id) {
    // Find the index of the product with the matching id
    var index = productsTender.findIndex(function (product) {
        return product.id == id;
    });

    if (index !== -1) {
        // Remove the product from the array
        var deletedProduct = productsTender.splice(index, 1)[0];

        // Update the display and select element
        loadProducts(productsTender);

        // Show the option in the select element
        $('#drpProduct option[value="' + deletedProduct.product_id + '"]').show();
    }
    $('#drpProduct').val('');
    $('#txtQuantity').val('');
    $('#txtPrice').val('');

}


loadProducts = function (products) {
    $("#productsContainer").empty();

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
                            <button type="button" class="btn btn-primary w-25 delete-btn" onclick="deleteProductTender(${productTender.id})" style="width:100%"><i class="bi bi-trash-fill text-white"></i></button>
                        </div>
                    </div>
                `);

                $("#productsContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}



$(document).ready(function () {
    var view = new TenderView();
    view.InitView();
});
