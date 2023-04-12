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
        arrayColumnsData[1] = { 'data': 'dateHour' };
        arrayColumnsData[2] = { 'data': 'actionType' };
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
