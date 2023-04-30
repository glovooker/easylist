function ActionLogView() {
    this.ViewName = "ActionLogView";
    this.ApiService = "Binnacle";

    this.InitView = function () {
        console.log("Action log init");

        this.LoadTable();
    }

    this.LoadTable = function () {
        var ctrlActions = new ControlActions();
        var urlService = ctrlActions.GetUrlApiService(
            this.ApiService + '/retrieveAllBinnacles'
        );

        var arrayColumnsData = [];
        arrayColumnsData[0] = { 'data': 'id' };
        arrayColumnsData[1] = {
            'data': 'dateHour',
            'render': function (data) {
                const dateTime = new Date(Date.parse(data.replace(/^(\d{2})\/(\d{2})\/(\d{4})\s(.*)$/, '$3-$2-$1T$4.000Z')));
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                return dateTime.toLocaleDateString('en-GB', options).replace(/\//g, '/').replace(',', '');
            },
        };
        arrayColumnsData[2] = {
            'data': 'actionType',
            'render': function (data) {
                const actionMap = {
                    'RETRIEVE_ALL': 'Retrieve All',
                    'RETRIEVE': 'Retrieve',
                    'CREATE': 'Create',
                    'UPDATE': 'Update',
                    'DELETE': 'Delete',
                    'ONGOING': 'Ongoing',
                };
                return actionMap[data] || data;
            }, };
        arrayColumnsData[3] = { 'data': 'affectedObject_id' };
        arrayColumnsData[4] = { 'data': 'tableAffected' };

        $('#tblLogAction').dataTable({
            'ajax': {
                'url': urlService,
                'dataSrc': '',
            },
            'columns': arrayColumnsData,
        });
    }
}
$(document).ready(function () {
    var view = new ActionLogView();
    view.InitView();
})
