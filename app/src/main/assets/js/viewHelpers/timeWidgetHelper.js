var Pitkiyot;
(function (module) {

    var timeWidgetHelper = {
        TIME_WIDGET_ID : 'reminder-date-time',
        setValue : function (time) {
            $('#' + timeWidgetHelper.TIME_WIDGET_ID).val(moment(time).format('DD-MM-YYYY HH:mm'));
        },
        getValue : function () {
            return moment($(id).val() , 'DD-MM-YYYY HH:mm');
        }
    };

    module.timeWidgetHelper = timeWidgetHelper;


})(Pitkiyot || (Pitkiyot = {}));