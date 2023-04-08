function IndexView() {
    this.ViewName = "IndexView";
    this.ApiService = "Tender";

    this.InitView = function () {
        document.getElementById("section-banner").removeAttribute("hidden");
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveAllTenders'
        );

        $.getJSON(urlService, function (tenders) {
            addCardsToContainer(tenders);
        });
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function createCard(tender) {
        return `
            <div class="col-md-3">
            <div class="card mb-4 position-relative">
                <div class="card-body text-start">
                    <h4 class="card-title mb-4">${tender.title}</h4>
                    <div class="mx-4 mb-4">
                        <p class="card-text m-0">Deliver at ${tender.deliverLocation}</p>
                        <p class="card-text m-0">Deadline: ${formatDate(tender.maxDeliverDate)}</p>
                    </div>
                    <a href="/Login" class="btn btn-primary">Sign in to Offer</a>
                </div>
                <div class="position-absolute" style="top: 10px; right: 10px;">
                    <span class="badge badge-pill bg-primary p-2">$${tender.budget}</span>
                </div>
            </div>
        </div>
        `;
    }

    function addCardsToContainer(tenders) {
        const container = document.getElementById('tendersContainer');
        let cardsHtml = '';

        for (const tender of tenders) {
            if (tender.tenderStatus == 0) {
                cardsHtml += createCard(tender);
            }
        }

        container.innerHTML = cardsHtml;
    }
}
$(document).ready(function () {
    var view = new IndexView();
    view.InitView();
});
