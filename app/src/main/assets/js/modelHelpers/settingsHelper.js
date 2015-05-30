
var Pitkiyot;
(function (module) {

    var settingsHelper = {
        openPreferencesScreen: function () {
            try {
                Android.openPreferences();
            } catch (e) {
                console.log("cant find Android");
                console.log(e.stack);
            }
        }
    };

    module.settingsHelper = settingsHelper;

})(Pitkiyot || (Pitkiyot = {}));