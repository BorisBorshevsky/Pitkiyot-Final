var Pitkiyot;
(function (module) {

    var notificationHelper = {
        setOrCancelNotification: function (task) {
            if (task.reminderEnabled()) {
                notificationHelper.setNotification(task);
            } else {
                notificationHelper.cancelNotification(task);
            }
        },
        cancelNotification: function (task) {
            try{
                Android.cancelNotification(task.title(), task.desc(), task.id());
            } catch (e) {
                console.log("cant find Android ");
                console.log(e.stack);
            }
        },
        setNotification: function (task) {
            var delay = task.reminderTime().toDate().getTime() - new Date().getTime();
            if (delay >= 0) {
                try {
                    Android.createNotification(task.title(), task.desc(), task.id(), delay);
                } catch (e) {
                    console.log("cant find Android ");
                    console.log(e.stack);
                }
            }
        }
    };

    module.notificationHelper = notificationHelper;

})(Pitkiyot || (Pitkiyot = {}));