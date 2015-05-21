

var Pitkiyot;
(function (module) {

    var TASKS_KEY = 'myTasks';
    var COUNTER_KEY = 'counter';

    var storageHelper = {
        getCounter: function () {
            return window.localStorage.getItem(COUNTER_KEY) || 1;
        },
        setCounter: function (counter) {
            window.localStorage.setItem(COUNTER_KEY, counter);
            return counter;
        },
        updateTasks: function (tasks) {
            var arr = [];
            tasks.forEach(function (task) {
                arr.push(task.toJsonObject());
            });
            window.localStorage.setItem(TASKS_KEY, JSON.stringify(arr));
        },
        getAllTasks: function () {
            var result = [];
            var arr = JSON.parse(window.localStorage.getItem(TASKS_KEY)) || [];
            arr.forEach(function (task) {
                result.push(new module.TaskModel(task.id, task.title, task.desc, task.reminderTime, task.reminderEnabled));
            });
            return result;
        }
    };

    module.storageHelper = storageHelper;

})(Pitkiyot || (Pitkiyot = {}));