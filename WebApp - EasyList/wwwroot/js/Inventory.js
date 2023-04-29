var productsInventory = [];

function InventoryView() {

    this.ViewInventory = "InventoryView";
    this.ApiService = "Inventory";

    this.InitView = function () {

        console.log("Inventory init");

        $("#btnCreate").click(function () {
            var view = new InventoryView();
            view.Create();
        });

        loadProductSelect();

    }

    this.Create = async function () {

        var inventory = {};

        productsInventory.forEach(function (productInventory) {
            inventory.user_id = productInventory.user_id;
            inventory.product_id = productInventory.product_id;
            inventory.quantity = productInventory.quantity;
            inventory.price = productInventory.price;

            var ctrlActions = new ControlActions();
            var view = new InventoryView();
            var serviceCreate = view.ApiService + "/createInventory";

            ctrlActions.PostToAPIv1(serviceCreate, inventory, function () {

                toastr.success("Inventory updated", "Success!")
                var view = new InventoryView();

                view.CleanForm();

            });

        })

    };

    createProductInventory = function () {

        var ID_User = (localStorage.getItem('userId'));

        var productInventory = {};

        productInventory.user_id = ID_User;
        productInventory.product_id = $("#drpProduct").val();
        productInventory.quantity = $("#txtQuantity").val();
        productInventory.price = $("#txtPrice").val();

        productsInventory.push(productInventory);
        loadProducts(productsInventory);

        $('#drpProduct option:selected').hide()
        $('#drpProduct').val('');
        $('#txtQuantity').val('');
        $('#txtPrice').val('');
    }

    deleteProductInventory = function (id) {
        var ctrlActions = new ControlActions();
        var view = new InventoryView();
        var serviceDelete = view.ApiService + "/deleteInventory";

        // Find the index of the product with the matching id
        var index = productsInventory.findIndex(function (product) {
            return product.id == id;
        });

        if (index !== -1) {
            // Remove the product from the array
            var deletedProduct = productsInventory.splice(index, 1)[0];

            // Set the properties of the inventory object
            var inventory = {};
            inventory.user_id = parseInt(localStorage.getItem('userId'));
            inventory.product_id = deletedProduct.product_id;
            inventory.quantity = deletedProduct.quantity;
            inventory.price = deletedProduct.price;

            // Call the delete API to remove the product from the database
            ctrlActions.DeleteToAPI(serviceDelete, inventory, function () {

                // Update the display and select element
                loadProducts(productsInventory);

                // Show the option in the select element
                $('#drpProduct option[value="' + deletedProduct.product_id + '"]').show();
            });
        }

        // Clear the form fields
        $('#drpProduct').val('');
        $('#txtQuantity').val('');
        $('#txtPrice').val('');
    }

    loadProducts = function (products) {
        $("#productsContainer").empty();

        products.forEach(function (productInventory) {
            // Fetch the product name from a URL
            fetch('https://localhost:7103/api/Product/getProductById?id=' + productInventory.product_id)
                .then(response => response.json())
                .then(product => {
                    productInventory.name = product.name;

                    // Create the product card with the updated name
                    var productCard = $(`
                    <div class='card w-100 mt-2' id="product${productInventory.product_id}">
                        <div class='card-body d-flex flex-row justify-content-around align-items-center'>
                            <h5 class='card-title m-0'>${productInventory.name}</h5>
                            <div class='d-flex flex-row justify-content-around align-items-center w-50'>
                                <p class='card-text m-0'>${productInventory.quantity} items</p>
                                <p class='card-text m-0'>$${productInventory.price}</p>
                            </div>
                            <button type="button" class="btn btn-primary w-25 delete-btn" onclick="deleteProductInventory(${productInventory.id})" style="width:100%"><i class="bi bi-trash-fill text-white"></i></button>
                        </div>
                    </div>
                `);

                    $("#productsContainer").append(productCard);
                })
                .catch(error => console.error(error));
        });
    }

    this.CleanForm = function () {
        $("#drpProduct").val("0");
        $("#txtQuantity").val("");
        $("#txtPrice").val("");
    };

    var inputBudget = document.getElementById("txtQuantity");

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

    var inputBudget = document.getElementById("txtPrice");

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

}

$(document).ready(function () {
    var view = new InventoryView();
    view.InitView();
});