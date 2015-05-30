
ko.bindingHandlers.jqmFlip = {
    init: function (element, valueAccessor) {
        var result = ko.bindingHandlers.value.init.apply(this, arguments);
        try {
            $(element).slider("refresh");
        } catch (x) {}
        return result;
    },
    update: function (element, valueAccessor) {
        ko.bindingHandlers.value.update.apply(this, arguments);
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        try {
            $(element).slider("refresh");
        } catch (x) {}
    }
};



ko.bindingHandlers.jqmChecked = {
    init: ko.bindingHandlers.checked.init,
    update: function (element, valueAccessor) {
        //KO v3 and previous versions of KO handle this differently
        //KO v3 does not use 'update' for 'checked' binding
        if (ko.bindingHandlers.checked.update)
            ko.bindingHandlers.checked.update.apply(this, arguments); //for KO < v3, delegate the call
        else
            ko.utils.unwrapObservable(valueAccessor()); //for KO v3, force a subscription to get further updates

        if ($(element).data("mobile-checkboxradio")) //calling 'refresh' only if already enhanced by JQM
            $(element).checkboxradio('refresh');
    }
};


ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).datepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker("destroy");
        });
    }
};

ko.bindingHandlers.timepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //handle the field changing
        ko.utils.registerEventHandler(element, "time-change", function (event, time) {
            var observable = valueAccessor(),
                current = ko.utils.unwrapObservable(observable);

            if (current - time !== 0) {
                observable(time);
            }
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).timepicker("destroy");
        });
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
        // calling timepicker() on an element already initialized will
        // return a TimePicker object
            instance = $(element).timepicker();

        if (value - instance.getTime() !== 0) {
            instance.setTime(value);
        }
    }
};
