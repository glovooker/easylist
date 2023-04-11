
function ProfileView() {
    this.ViewName = 'ProfileView';
    this.ApiService = 'User';

    this.InitView = function () {
        console.log('Profile init');

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
            $('#imgUser').attr('src', data.userPicture);
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

$(document).ready(function () {
    var view = new ProfileView();
    view.InitView();
});
