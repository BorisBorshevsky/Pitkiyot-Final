/**
 * unfortunate part that has to know the view
 */

var Pitkiyot;
(function (module) {
    var pageStack = [];

    var LIST_PAGE_ID = "#list-notes-page";
    var EDIT_PAGE_ID = "#edit-note-page";
    var pageChangeHelper = {
        changeToListPage: function () {
            pageStack.push($.mobile.activePage.attr('id'));
            $.mobile.changePage(LIST_PAGE_ID, {
                transition: 'flip'
            });
        },
        changeToEditPage: function () {
            pageStack.push($.mobile.activePage.attr('id'));
            $.mobile.changePage(EDIT_PAGE_ID, {
                transition: 'flip'
            });
        },
        changeTo: function (pageId) {
            pageStack.push($.mobile.activePage.attr('id'));
            $.mobile.changePage(pageId, {
                transition: 'flip'
            });
        },
        changeToLastVisited: function () {
            $.mobile.changePage('#' + pageStack.pop(), {
                transition: 'flip'
            });
        }
    };

    module.pageChangeHelper = pageChangeHelper;

})(Pitkiyot || (Pitkiyot = {}));