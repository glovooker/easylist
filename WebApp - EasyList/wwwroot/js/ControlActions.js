function ControlActions() {

    this.URL_API = "https://jhidalgou-mathapi.azurewebsites.net/api/";

    this.GetUrlApiService = function (service) {
        return this.URL_API + service;
    }

    this.GetTableColumsDataName = function (tableId) {
        var val = $('#' + tableId).attr("ColumnsDataName");

        return val;
    }

    this.FillTable = function (service, tableId, refresh) {

        if (!refresh) {
            columns = this.GetTableColumsDataName(tableId).split(',');
            var arrayColumnsData = [];


            $.each(columns, function (index, value) {
                var obj = {};
                obj.data = value;
                arrayColumnsData.push(obj);
            });
            //Esto es la inicializacion de la tabla de data tables segun la documentacion de 
            // datatables.net, carga la data usando un request async al API
            $('#' + tableId).DataTable({
                "processing": true,
                "ajax": {
                    "url": this.GetUrlApiService(service),
                    dataSrc: 'Data'
                },
                "columns": arrayColumnsData
            });
        } else {
            //RECARGA LA TABLA
            $('#' + tableId).DataTable().ajax.reload();
        }

    }

    this.GetSelectedRow = function () {
        var data = sessionStorage.getItem(tableId + '_selected');

        return data;
    };

    this.BindFields = function (formId, data) {
        console.log(data);
        $('#' + formId + ' *').filter(':input').each(function (input) {
            var columnDataName = $(this).attr("ColumnDataName");
            this.value = data[columnDataName];
        });
    }

    this.GetDataForm = function (formId) {
        var data = {};

        $('#' + formId + ' *').filter(':input').each(function (input) {
            var columnDataName = $(this).attr("ColumnDataName");
            data[columnDataName] = this.value;
        });

        console.log(data);
        return data;
    }

    this.ShowMessage = function (type, message) {
        if (type == 'E') {
            $("#alert_container").removeClass("alert alert-success alert-dismissable")
            $("#alert_container").addClass("alert alert-danger alert-dismissable");
            $("#alert_message").text(message);
        } else if (type == 'I') {
            $("#alert_container").removeClass("alert alert-danger alert-dismissable")
            $("#alert_container").addClass("alert alert-success alert-dismissable");
            $("#alert_message").text(message);
        }
        $('.alert').show();
    };

    /* ACCIONES VIA AJAX, O ACCIONES ASINCRONAS*/
    this.PostToAPIv1 = function (service, data, callBackFunction) {
        var jqxhr = $.post(
            this.GetUrlApiService(service),
            data,
            function (response) {
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('I', response?.Message ?? "");

                if (callBackFunction) {
                    callBackFunction(response?.Data ?? response);
                }
            }
        ).fail(function (response) {
            var data = response.responseJSON;
            var ctrlActions = new ControlActions();
            if (data) {
                ctrlActions.ShowMessage('E', data.ExceptionMessage);
                console.log(data);
            } else {
                ctrlActions.ShowMessage('E', 'An error occurred');
            }
        });
    };


    this.PutToAPI = function (service, data, callBackFunction) {
        var jqxhr = $.put(this.GetUrlApiService(service), data, function (response) {
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('I', response.Message);
            if (callBackFunction) {
                callBackFunction(response.Data);
            }

        })
            .fail(function (response) {
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);
                console.log(data);
            })
    };

    this.DeleteToAPI = function (service, data, callBackFunction) {
        var jqxhr = $.delete(this.GetUrlApiService(service), data, function (response) {
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('I', response.Message);
            if (callBackFunction) {
                callBackFunction(response.Data);
            }
        })
            .fail(function (response) {
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);
                console.log(data);
            })
    };

    this.GetToApi = function (service, callBackFunction) {
        var jqxhr = $.get(this.GetUrlApiService(service), function (response) {
            console.log("Response " + response);
            if (callBackFunction) {
                callBackFunction({ status: jqxhr.status, response: response });
            }
        })
            .fail(function (response) {
                console.log("Error " + response.status + ": " + response.statusText);
                if (callBackFunction) {
                    callBackFunction({ status: response.status, response: null });
                }
            });
    }
}

//Custom jquery actions
$.post = function (url, data, callback) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'POST',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}
$.put = function (url, data, callback) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}

$.delete = function (url, data, callback) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}
$.get = function (url, data, callback) {
    if ($.isFunction(data)) {
        callback = data;
        data = {};
    }
    return $.ajax({
        url: url,
        type: 'GET',
        success: callback,
        data: data,
        contentType: 'application/json'
    });
};

