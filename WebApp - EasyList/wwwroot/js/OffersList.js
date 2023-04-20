function OffersListView() {
    this.ViewName = "OffersListView";
    this.ApiService = "Offer";

    this.InitView = function () {
        console.log("Init Offers List View");

        $('#btnBack').click(function () {
            var view = new OffersListView();
            view.Back();
        });

    }

    this.Back = function () {
        localStorage.removeItem('tenderID');
        window.location.href = "/Tenders";
    };


}
$(document).ready(function () {
    var view = new OffersListView();
    view.InitView();
})