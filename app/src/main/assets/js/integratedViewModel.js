var Pitkiyot;
(function (module) {
    /**
     * Create the main view model
     * @constructor
     */
    var IntegratedViewModel = function () {
        var self = this;

        self.editNotePage = ko.observable();
        self.listNotesPage = ko.observable();

        self.isNewTask = ko.observable(false);
        self.currentTask = ko.observable();
        self.taskForRevert = ko.observable();  //observable in order to simplify the code

        self.tasks = ko.observableArray([]);

        self.updateTasksInStorage = function () {
            module.storageHelper.updateTasks(self.tasks());
        };

        self.loadData = function () {
            self.editNotePage(new EditTaskModel(self));
            self.listNotesPage(new ListNotesModel(self));
            self.idCounter = module.storageHelper.getCounter(); //get id from local storage
            self.tasks(module.storageHelper.getAllTasks()); //get all tasks from local storage
        };

        self.incrementIdCounter = function () {
            return module.storageHelper.setCounter(++self.idCounter); //returns the counter
        };

        self.loadData()
    };

    /**
     * Model for edit tasks page
     * @param parent MainModel  - Integrated view model
     * @constructor
     */
    var EditTaskModel = function (parent) {
        var self = this;

        self.parent = ko.observable(parent);
        self.currentTask = ko.computed(function () {
            return self.parent().currentTask();
        });

        self.backOnClicked = function () {
            console.log('back clicked');

            module.pageChangeHelper.changeToLastVisited();
            if (self.parent().isNewTask()) return;
            var taskForRevert = self.parent().taskForRevert();
            self.currentTask().title(taskForRevert.title());
            self.currentTask().desc(taskForRevert.desc());
            self.currentTask().reminderTime(moment(taskForRevert.reminderTime.toDate()()));
            self.currentTask().reminderEnabled(taskForRevert.reminderEnabled());
        };

        self.saveOnClicked = function (data, e) {
            console.log('save clicked');
            e.preventDefault();

            if (self.parent().isNewTask()) {
                self.parent().isNewTask(false);
                self.parent().tasks.push(self.currentTask());
                self.parent().incrementIdCounter();
            }

            self.parent().updateTasksInStorage();
            // unfortunate use because of bad widget
            //self.currentTask().reminderTime(moment($('#reminder-date-time').val() || new moment().format('DD-MM-YYYY HH:mm'), 'DD-MM-YYYY HH:mm'));
            //self.currentTask().reminderTime(moment($('#reminder-date-time').val() , 'DD-MM-YYYY HH:mm'));
            self.currentTask().reminderTime(timeWidgetHelper.getValue());

            module.notificationHelper.setOrCancelNotification(self.currentTask());
            module.pageChangeHelper.changeToListPage();

        };

    };

    /**
     * Model for List Notes Page
     * @param parent
     * @constructor
     */
    var ListNotesModel = function (parent) {
        var self = this;
        self.pageId = '#list-notes-page';

        self.parent = ko.observable(parent);

        self.pageTitle = ko.observable();

        self.onTaskClick = function (data, e) {
            console.log('selected', this);
            e.preventDefault();
            self.parent().currentTask(this);
            self.parent().taskForRevert(this.clone());
            self.parent().isNewTask(false);


            timeWidgetHelper.setValue(self.parent().currentTask().reminderTime());
            //$('#reminder-date-time').val(self.parent().currentTask().reminderTime().format('DD-MM-YYYY HH:mm'));


            module.pageChangeHelper.changeToEditPage()

        };

        self.openSettings = function(){
            Pitkiyot.settingsHelper.openPreferencesScreen();
        }

        self.onTapHold = function () {
            console.log('tapHold', this);

            // unfortunate use because of JQM
            $('#popupDialog').popup('open');
            self.parent().currentTask(this);
        };

        self.deleteCurrentTask = function () {
            console.log('delete clicked');
            module.notificationHelper.cancelNotification(self.parent().currentTask());
            self.parent().tasks.remove(function (e) {
                return e.id() == self.parent().currentTask().id();
            });

            // unfortunate use because of JQM
            $('#popupDialog').popup('close');
            self.parent().updateTasksInStorage();
        };

        self.onNewTaskClick = function (data, e) {
            console.log('selected', this);
            e.preventDefault();
            self.parent().isNewTask(true);
            self.parent().currentTask(new TaskModel(self.parent().idCounter));

            timeWidgetHelper.setValue(self.parent().currentTask().reminderTime());

            module.pageChangeHelper.changeToEditPage();
        };

    };


    var TaskModel = function (id, title, desc, reminderTime, reminderEnabled) {
        var self = this;
        self.id = ko.observable(id);
        self.title = ko.observable(title || 'New Task #' + self.id());
        self.desc = ko.observable(desc || '');

        self.reminderEnabled = ko.observable(reminderEnabled);

        self.reminderTime = ko.observable(moment(reminderTime) || new moment());

        self.dueDateString = ko.computed(function () {
            if (self.reminderEnabled()) {
                return TaskUtils.timeToPrintableString(self.reminderTime());
            }
            return 'None';
        });
    };

    /**
     * create a clone of the task including the ko bindings
     */
    TaskModel.prototype.clone = function () {
        return ko.mapping.fromJS(ko.mapping.toJS(this));
    };

    TaskModel.prototype.toJsonObject = function () {
        return {
            id: this.id(),
            title: this.title(),
            desc: this.desc(),
            reminderEnabled: this.reminderEnabled(),
            reminderTime: this.reminderTime().toDate().getTime()
        }
    };

    var TaskUtils = {
        timeToPrintableString: function (time) {
            var date = new Date(time);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
        }
    };

    var id = '#reminder-date-time';
    var timeWidgetHelper = {
        setValue : function (time) {
          $(id).val(moment(time).format('DD-MM-YYYY HH:mm'));
        },
        getValue : function () {
            return moment($(id).val() , 'DD-MM-YYYY HH:mm');
        }
    };


    // the only public elements.
    module.IntegratedViewModel = IntegratedViewModel;
    module.TaskModel = TaskModel;

})(Pitkiyot || (Pitkiyot = {}));

