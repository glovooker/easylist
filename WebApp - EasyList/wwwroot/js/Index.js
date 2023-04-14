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
        const day = date.getDate();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }


    function createCard(tender) {
        return `
    <div class="col-md-4 col-sm-6">
      <div class="card mb-4 position-relative">
        <div class="card-body text-start">
          <h5 class="card-title mb-4 w-75">${tender.title}</h5>
          <div class="mx-4 mb-4">
            <p class="card-text m-0 small">Deliver at <strong>${tender.deliverLocation}</strong></p>
            <p class="card-text m-0 small">before <strong>${formatDate(tender.maxDeliverDate)}</strong></p>
          </div>
          ${localStorage.getItem('userId') ? `<button class="btn btn-secondary" value="${tender.id}">View</button>` : `<a href="/Login" class="btn btn-secondary">Sign in to Offer</a>`}
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

        const viewButtons = document.querySelectorAll('button[value]');
        viewButtons.forEach(button => {
            button.addEventListener('click', function () {
                const tenderId = this.value;
                localStorage.setItem('selectedTenderId', tenderId);
            });
        });
    }
}

$(document).ready(function () {
    var view = new IndexView();
    view.InitView();
});
