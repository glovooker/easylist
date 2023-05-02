var membershipToPay = {};

function PaymentView() {
    this.ViewName = "PaymentView";
    this.ApiService = "Suscription";

    this.InitView = function () {
        console.log("Payment init");

        $('#btnBack').click(function () {
            var view = new PaymentView();
            view.Back();
        });
    };

    this.Back = function () {
        window.location.href = "/Suscriptions";
    };

    Pay();

}

this.Pay = async function () {


    const searchParams = new URLSearchParams(window.location.search);
    const membershipId = searchParams.get('id');

    membershipToPay = await fetch('https://localhost:7103/api/Membership/retrieveMembershipById?id=' + membershipId).then(response => response.json().then(membership => {
        return membership;
    }))

    var paypalConfig = {
        env: 'sandbox',
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: (membershipToPay.cost).toString(),
                        },
                    },
                ],
            });
        },
        onApprove: async function (data, actions) {
            await createSuscription();
            toastr.success('Success!', 'Account upgraded!')
            window.location.href = "/Profile";
        },
    };


    paypal.Buttons(paypalConfig).render('#paypal-button');
}

createSuscription = async function () {
    var suscription = {};
    suscription.id = 0;
    suscription.userId = localStorage.getItem('userId');
    suscription.startDate = new Date();
    suscription.endDate = membershipToPay.membershipType == 0 ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    suscription.membershipId = membershipToPay.id;
    suscription.suscriptionStatus = 0;

    var view = new PaymentView();
    var ctrlActions = new ControlActions();
    var serviceCreate = view.ApiService + '/createSuscription';

    ctrlActions.PostToAPIv1(serviceCreate, suscription, function () {
        toastr.success('Success!', 'Account upgraded!')
    });
}

$(document).ready(function () {
    var view = new PaymentView();
    view.InitView();
});
