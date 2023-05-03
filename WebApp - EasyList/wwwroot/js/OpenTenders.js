function OpenTendersView() {

    this.ViewName = "OpenTendersView";
    this.ApiService = "Tender";
    var self = this;



    this.InitView = function () {
        this.OpenTender(localStorage.getItem('selectedTenderId'));

        $('#btnCreate').click(function () {
            var view = new OpenTendersView();
            view.Offer();
        });

    }

    this.OpenTender = function (id) {
        var ctrlActions = new ControlActions();
        var urlService = this.ApiService + "/retrieveTenderById?id=" + id;
        ctrlActions.GetToApi(urlService, function (result) {
            tender = result.response;
            $('#tenderName').html(tender.title);
            $('#tenderId').html(tender.id);
            $('#tenderDescription').html(tender.description);
            $('#tenderDeliverLocation').html(tender.deliverLocation);
            var deliverDate = new Date(tender.maxDeliverDate);
            var formatDeliverDate = deliverDate.getDate() + "/" + (deliverDate.getMonth() + 1) + "/" + deliverDate.getFullYear();
            var offerDate = new Date(tender.maxOfferDate);
            var formatOfferDate = offerDate.getDate() + "/" + (offerDate.getMonth() + 1) + "/" + offerDate.getFullYear();
            $('#tenderDeliverDate').html(formatDeliverDate);
            $('#tenderDeliverOffer').html(formatOfferDate);
            $('#tenderBudget').html("$"+tender.budget);

            loadProducts(tender.productTenders);
        });

    }

    this.Offer = function () {
        window.location.href = "/Offers";
    }

}

function goBack() {
    window.location.href = "/Index";
}
loadProducts = function (products) {
    $("#productsContainer").empty();

    products.forEach(function (productTender) {
        // Fetch the product name from a URL
        fetch("https://jhidalgou-mathapi.azurewebsites.net/api/Product/getProductById?id=" + productTender.product_id)
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

                $("#productsContainer").append(productCard);
            })
            .catch(error => console.error(error));
    });
}



//Instaciamiento inicial de la clase
//se ejecuta siempre al finalizar la carga de la vista
$(document).ready(function () {
    var view = new OpenTendersView();
    view.InitView();
});
