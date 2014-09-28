(function(w) {

    w.deepObserve = deepObserve;

    function deepObserve(observable, onChange) {

        innerObserve(observable, observable, onChange);

        function innerObserve(obj, initial, callback) {
            if (!_.isArray(obj) && !_.isObject(obj)) return;

            var nativeObserve = _.isArray(obj) ? Array.observe : Object.observe;

//          todo: when adding new attrs we should observe them as well
//            observe(obj, function(changes) {
//                _.chain(changes).filter(by('type', 'add')).each(function(change) {
//                    deepObserve(obj[change.name], onChange());
//                })
//            });
            nativeObserve(obj, callback);

            var nestedKeys = Object.keys(obj);

            _.each(nestedKeys, function(field) {
                innerObserve(obj[field], observable, callback);
            });
        }

    }

    // Helpers
    function by(name, value) {
        return function(x) {
            return x[name] === value;
        }
    }

})(window);