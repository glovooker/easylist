function Session() {
    this.InitView = function () {

        var ctrlActions = new ControlActions();
        this.userId = localStorage.getItem('userId');

        if (this.userId) {
            var urlService = ctrlActions.GetUrlApiService(
                'User' + '/getUserById?id=' + this.userId
            );

            $.getJSON(urlService, function (user) {
                var dropdownHtml = `
                    <div class="dropdown">
                      <button class="btn btn-primary bg-white text-primary dropdown-toggle" type="button" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Hi, ${user.name}!  <img src="${user.userPicture ? user.userPicture : `/img/avatar.png`}" class="avatar mx-2 img-thumbnail mb-2 rounded-circle img-fluid" alt="${user.name}">
                      </button>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="/Settings" asp-area="" asp-page="/Settings">Settings</a>
                        <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
                      </div>
                    </div>

                `;
                $('#userDropdownContainer').html(dropdownHtml);

                // Toggle dropdown menu on click
                $('.dropdown-toggle').click(function () {
                    $(this).siblings('.dropdown-menu').toggle();
                });

                // Hide dropdown menu when clicking outside of it
                $(document).click(function (e) {
                    var container = $(".dropdown");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        container.find('.dropdown-menu').hide();
                    }
                });
            });
        } else {
            // Display sign up and sign in buttons
            $('#registerBtn').show();
            $('#loginBtn').show();
        }
    }
}

function logout() {
    // Remove userId from local storage and reload the page
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    window.location.replace('/');
}

$(document).ready(function () {
    var session = new Session();
    session.InitView();
});
