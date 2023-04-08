function MembershipsView() {
    this.ViewName = "MembershipsView";
    this.ApiService = "Membership";

    this.InitView = function () {
        console.log("Membership init");
        $('#btnCreate').click(function () {
            var view = new MembershipsView();
            view.Create();
        });

        $('#btnUpdate').click(function () {
            var view = new MembershipsView();
            view.Update();
        });

        $('#btnNew').click(function () {
            var view = new MembershipsView();
            view.New();
        });

        $('#btnDelete').click(function () {
            var view = new MembershipsView();
            view.Delete();
        });

        this.LoadTable();
    };

    this.Create = function () {

        var membership = {};
        membership.name = $('#txtName').val();
        membership.description = $('#txtDescription').val();
        membership.membershipType = parseInt($('#drpType').val());
        membership.cost = parseFloat($('#txtCost').val());
        if (membership.name === '' || membership.description === '' || (membership.membershipType !== 0 && membership.membershipType !== 1) || isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
            if (membership.name === '') {
                $("#error-messageName").html("Name is required");
                $("#error-messageName").show();
            } else {
                $("#error-messageName").hide();
            }
            if (membership.membershipType !== 0 || membership.membershipType !== 1) {
                $("#error-messageType").html("Invalid type selected");
                $("#error-messageType").show();
            } else {
                $("#error-messageType").hide();
            }
            if (membership.description === '') {
                $("#error-messageDescription").html("Description is required");
                $("#error-messageDescription").show();
            } else {
                $("#error-messageDescription").hide();
            }
            if (isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
                $("#error-messageCost").html("Cost must be a positive number");
                $("#error-messageCost").show();
            } else {
                $("#error-messageCost").hide();
            }
        } else {
            var view = new MembershipsView();
            var ctrlActions = new ControlActions();
            var serviceCreate = view.ApiService + '/createMembership';

            ctrlActions.PostToAPIv1(serviceCreate, membership, function () {
                toastr.success('Success!', 'Membership created successfully')
                var view = new MembershipsView();

                view.ReloadTable();
                view.CleanForm();
            })

        }

    }

    this.Update = function () {
        var membership = {}
        membership.Id = parseInt($('#txtID').val());
        membership.name = $('#txtName').val();
        membership.description = $('#txtDescription').val();
        membership.membershipType = parseInt($('#drpType').val());
        membership.cost = parseFloat($('#txtCost').val());
        if (membership.name === '' || membership.description === '' || (membership.membershipType !== 0 && membership.membershipType !== 1) || isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
            if (membership.name === '') {
                $("#error-messageName").html("Name is required");
                $("#error-messageName").show();
            } else {
                $("#error-messageName").hide();
            }
            if (membership.membershipType !== 0 && membership.membershipType !== 1) {
                $("#error-messageType").html("Invalid type selected");
                $("#error-messageType").show();
            } else {
                $("#error-messageType").hide();
            }
            if (membership.description === '') {
                $("#error-messageDescription").html("Description is required");
                $("#error-messageDescription").show();
            } else {
                $("#error-messageDescription").hide();
            }
            if (isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
                $("#error-messageCost").html("Cost must be a positive number");
                $("#error-messageCost").show();
            } else {
                $("#error-messageCost").hide();
            }
        } else {
            var view = new MembershipsView();
            var ctrlActions = new ControlActions();
            var serviceUpdate = view.ApiService + '/updateMembership';

            ctrlActions.PutToAPI(serviceUpdate, membership, function () {
                toastr.success('Success!', 'Membership updated successfully')

                var view = new MembershipsView();

                view.ReloadTable();
                view.CleanForm();
            });

        }

    }

    this.Delete = function () {
        var membership = {}
        membership.Id = parseInt($('#txtID').val());
        membership.name = $('#txtName').val();
        membership.description = $('#txtDescription').val();
        membership.membershipType = parseInt($('#drpType').val());
        membership.cost = parseFloat($('#txtCost').val());
        if (membership.name === '' || membership.description === '' || membership.membershipType === '' || isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
            if (membership.name === '') {
                $("#error-messageName").html("Name is required");
                $("#error-messageName").show();
            } else {
                $("#error-messageName").hide();
            }
            if (membership.membershipType === '') {
                $("#error-messageType").html("Type is required");
                $("#error-messageType").show();
            } else {
                $("#error-messageType").hide();
            }
            if (membership.description === '') {
                $("#error-messageDescription").html("Description is required");
                $("#error-messageDescription").show();
            } else {
                $("#error-messageDescription").hide();
            }
            if (isNaN(membership.cost) || membership.cost <= 0 || membership.cost.toString().toLowerCase().includes("e")) {
                $("#error-messageCost").html("Cost must be a positive number");
                $("#error-messageCost").show();
            } else {
                $("#error-messageCost").hide();
            }
        } else {
            var view = new MembershipsView();
            var ctrlActions = new ControlActions();
            var serviceDelete = view.ApiService + '/deleteMembership';

            ctrlActions.DeleteToAPI(serviceDelete, membership, function () {
                toastr.success('Success!', 'Membership deleted successfully')

                var view = new MembershipsView();

                view.ReloadTable();
                view.CleanForm();
            });

        }
    }


    this.LoadTable = function () {
        var ctrlActions = new ControlActions();

        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveAllMembership'
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = { 'data': 'name' };
        arrayColumnsData[2] = { 'data': 'description' };
        arrayColumnsData[3] = { 'data': 'membershipType' };
        arrayColumnsData[4] = { 'data': 'cost' };

        $('#tblMemberships').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });

        $('#tblMemberships tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');

            var data = $('#tblMemberships').DataTable().row(tr).data();
            $('#txtID').val(data.id);
            $('#txtName').val(data.name);
            $('#txtDescription').val(data.description);
            $('#drpType').val(data.membershipType);
            $('#txtCost').val(data.cost);

            $('#btnCreate').prop('disabled', true);
            $('#btnDelete').prop('disabled', false);
            $('#btnUpdate').prop('disabled', false);
        });

    }

    this.ReloadTable = () => {
        $('#tblMemberships').DataTable().ajax.reload();
    }

    this.CleanForm = function () {
        $('#txtID').val('');
        $('#txtName').val('');
        $('#txtDescription').val('');
        $('#drpType').val('');
        $('#txtCost').val('');
    }

    this.New = function () {
        $('#btnCreate').prop('disabled', false);
        $('#btnDelete').prop('disabled', true);
        $('#btnUpdate').prop('disabled', true);

        this.CleanForm();
        location.reload()
    }



}

$(document).ready(function () {
    var view = new MembershipsView();
    view.InitView();
});
