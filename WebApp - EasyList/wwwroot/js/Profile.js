var currentSuscription = {};
var currentMembership = {};

function ProfileView() {
    this.ViewName = 'ProfileView';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('Profile init');

        $('[data-bs-toggle="tooltip"]').tooltip()

        $('#btnUpdate').click(function () {
            var view = new ProfileView();
            view.Update();
        });

        this.LoadUser();
    };

    this.Update = function () {
        var user = {};
        user.id = localStorage.getItem('userId');
        user.name = $('#txtName').val();
        user.firstLastName = $('#txtFirstLastname').val();
        user.secondLastName = $('#txtSecondLastname').val();
        user.email = $('#txtEmail').val();
        user.password = '';
        user.phone = $('#txtPhone').val();
        user.registrationDate = new Date().toISOString();

        CaptureImageURL('userPic', function (imageUrl) {
            var view = new ProfileView();
            if (imageUrl === undefined) {
                imageUrl = document.getElementById('imgUser').src;
            }
            user.userPicture = imageUrl;
            // Llamado al API
            var ctrlActions = new ControlActions();
            var serviceCreate = view.ApiService + '/updateUser';

            ctrlActions.PutToAPI(serviceCreate, user, function () {
                toastr.success('User updated', 'Success!');
                var view = new ProfileView();

                $('#tblContainer').show();
                $('#formContainer').hide();
                $('#btnNew').show();
                $('#btnBack').hide();
                window.location.pathname = '/Profile';
            });
        });
    };

    this.LoadUser = function () {
        var ctrlActions = new ControlActions();

        var userId = localStorage.getItem('userId');

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/getUserById?id=' + userId
        );

        $.getJSON(urlService, function (data) {

            $('#txtID').val(data.id);
            $('#txtName').val(data.name);
            $('#txtFirstLastname').val(data.firstLastName);
            $('#txtSecondLastname').val(data.secondLastName);
            $('#txtEmail').val(data.email);
            $('#txtPhone').val(data.phone);
            $('#drpStatus').val(data.userStatus);
            $('#imgUser').attr('src', data.userPicture || "/img/avatar.png");

        });

        fetch('https://localhost:7103/api/Suscription/retrieveSuscriptionById?id=' + userId)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to retrieve subscription');
                }
                return response.json();
            })
            .then(data => {
                    fetch('https://localhost:7103/api/Membership/retrieveMembershipById?id=' + data.membershipId).then(response => response.json().then(membership => {
                        currentSuscription = data
                        currentMembership = membership

                        $('#premiumFeatures').empty();
                        var premiumFeatures = `
                            <div class="col-6" id="suscriptionModule" style="max-width: 425px;">
                              <div class="card h-100">
                                <div class="card-body d-flex flex-row justify-content-between align-content-center">
                                  <div>
                                    <h5 class="card-title"><i class="bi bi-star-fill text-primary"></i> ${membership.name}</h5>
                                    <p class="card-text mb-0">${membership.membershipType === 0 ? 'Monthly Payment' : 'Yearly Payment'} </p>
                                    <small class="text-muted fw-light">Next payement: ${new Date(data.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')}</small>
                                  </div>
                                  <div class="d-flex flex-row justify-content-between w-25">
                                      <div class="d-flex align-items-center">
                                        <a href="/Suscriptions" class="btn btn-secondary disabled"><i class="bi bi-check-circle-fill"></i></a>
                                      </div>
                                      <div class="d-flex align-items-center">
                                        <button onclick="cancelSuscription()" class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Cancel suscription"><i class="bi bi-x-circle-fill"></i></button>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-6" id="inventoryModule" style="max-width: 425px;">
                              <div class="card h-100">
                                <div class="card-body d-flex flex-row justify-content-between align-content-center">
                                  <div>
                                    <h5 class="card-title"><i class="bi bi-ui-checks-grid text-primary"></i> Inventory</h5>
                                    <p class="card-text">Add and manage your products</p>
                                  </div>
                                  <div class="d-flex align-items-center">
                                    <a href="/Inventory" id="inventoryAccess" class="btn btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="top" title="This is a premium feature"><i class="bi bi-arrow-right"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          `
                        $('#premiumFeatures').append(premiumFeatures);
                        $('[data-bs-toggle="tooltip"]').tooltip()
                    }))
            })
            .catch(error => {
                console.error(error);
                $('#inventoryAccess').click(function (e) {
                    e.preventDefault()
                })
            });


    };

    function CaptureImageURL(fileId, callback) {
        let file = document.getElementById(fileId).files[0];

        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                callback(event.target.result);
            });

            reader.readAsDataURL(file);
        } else {
            callback();
        }
    }
}

cancelSuscription = function () {
    var suscription = {};

    suscription.id = currentSuscription.id;
    suscription.userId = currentSuscription.userId;
    suscription.startDate = currentSuscription.startDate;
    suscription.endDate = currentMembership.membershipType == 0 ? new Date(new Date().setMonth(new Date().getMonth() + 1)) : new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    suscription.membershipId = currentMembership.id;
    suscription.suscriptionStatus = 2;

    var ctrlActions = new ControlActions();
    var serviceCreate = 'Suscription/updateSuscription';

    ctrlActions.PutToAPI(serviceCreate, suscription, function () {
        toastr.warning('Warning!', 'Account unsuscribed!')
        window.location.href = "/Profile";
    });
};

$(document).ready(function () {
    var view = new ProfileView();
    view.InitView();
});
