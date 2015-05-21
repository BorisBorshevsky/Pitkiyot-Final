(function() {
    var viewModel = new Pitkiyot.IntegratedViewModel();

    var LIST_PAGE_ID = "#list-notes-page";
    var EDIT_PAGE_ID = "#edit-note-page";

    $(document).on({
        "pageinit": function () {
            ko.applyBindings(viewModel.listNotesPage(), this);
            $("ul", this).attr("data-role", "listview").listview().listview("refresh");
        }
    }, LIST_PAGE_ID);

    $(document).on({
        "pageinit": function () {
            ko.applyBindings(viewModel.editNotePage(), this);
            $("#dtBox").DateTimePicker(); // init clockPicker
        }
    }, EDIT_PAGE_ID);

//
//Android.createNotification("this is title1", "this is desc", 1, 4000);
//Android.createNotification("this is title2", "this is desc", 2, 4000);
//Android.createNotification("this is title3", "this is desc", 3, 4000);
//Android.createNotification("this is title4", "this is desc", 4, 4000);
//Android.createNotification("this is title5", "this is desc", 5, 4000);
//Android.cancelNotification(3);

})();