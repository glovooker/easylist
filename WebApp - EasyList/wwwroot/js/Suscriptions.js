function SuscriptionView() {
    this.ViewName = "SuscriptionView";
    this.ApiService = "Suscription";

    this.InitView = function () {
        console.log("Suscription init");

        $('#btnBack').click(function () {
            var view = new SuscriptionView();
            view.Back();
        });

        loadMemberships();
    };

    this.Back = function () {
        window.location.href = "/Profile";
    };

    loadMemberships = function () {

        fetch('https://jhidalgou-mathapi.azurewebsites.net/api/Membership/retrieveAllMembership')
            .then(response => response.json()
                .then(memberships => {
                memberships.forEach(function (membership) {
                    var membershipCard = `
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <div class="card-header">
                                    <h4 class="my-0 fw-normal">${membership.name}</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">${membership.cost}<small class="text-muted fw-light">/ ${membership.membershipType == 0 ? 'month' : 'year'}</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                        ${membership.description.split('.').map((item) => `<li>${item.trim()}</li>`).join('')}
                                    </ul>
                                    <a href="/Payment?id=${membership.id}" class="w-100 btn btn-lg btn-secondary">Upgrade</a>
                                </div>
                            </div>
                        </div>
                    `;
                    $("#memberhipsContainer").append(membershipCard);
                })
            })
        )
    }
}

$(document).ready(function () {
    var view = new SuscriptionView();
    view.InitView();
});
