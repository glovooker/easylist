function ProductsView() {

    this.ViewName = "ProductsView";
    this.ApiService = "Product";

    var ids = []; 

    var self = this; 

    this.InitView = function () {
        console.log("Product init");
        //Llamado de evento de cargar la tabla con toda la data de usuarios
        $('#btn-cancel').click(function () {
            var view = new ProductsView();
            view.Cancel();
        });
        $('#btn-create').click(function () {
            var view = new ProductsView();
            view.Create();
        });

        this.LoadTable();
    }

    this.Cancel = function () {
        $('#txtName').val('');
    }

    this.Create = function () {
        var product = {};
        product.id = 0;
        product.name = $('#txtName').val().trim();

        if (product.name != ""){ 
            var ctrlActions = new ControlActions();
            var serviceCreate = self.ApiService + '/createProduct';

            ctrlActions.PostToAPIv1(serviceCreate, product, function () {
                $('#tblProducts').DataTable().ajax.reload();
                $('#txtName').val('');
            });
        }
    }


    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var urlService = ctrlActions.GetUrlApiService(this.ApiService + "/getAllProducts");
        


        var arrayColumnsData = [];
        arrayColumnsData[0] = { "data": "id", "visible": false };
        arrayColumnsData[1] = { "data": "name" };
        arrayColumnsData[2] = {
            "data": null,
            "render": function (data, type, row) {
                return '<button type="button" id="btn-delete" class="btn btn-danger" data-id="' + row.id + '">Delete</button>';
            },
            "width": "10%"
        };

       var table= $('#tblProducts').DataTable({
            ajax: {
                url: urlService,
                dataSrc: ""
            },
            columns: arrayColumnsData,
            rowCallback: function (row, data) {
                ids.push(data.id); 

            },
       });




        $('#tblProducts').on('click', '#btn-delete', function () {
            var product = {};
            product.id = $(this).data('id');
            product.name= "string";

            console.log(product);
            
            var ctrlActions = new ControlActions();
            var serviceDelete = self.ApiService + '/deleteProduct';
            ctrlActions.DeleteToAPI(serviceDelete, product, function () {
                $('#tblProducts').DataTable().ajax.reload();
            });
        });

    }
}

$(document).ready(function () {
    var view = new ProductsView();
    view.InitView();
});