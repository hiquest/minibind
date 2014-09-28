(function(w) {

    function ifVal(selector) {

        return {
            then: function(thenFn) {
                return {
                    else: function(elseFn) {
                        var val = $(selector).val();
                        val ? thenFn(val) : elseFn();
                    }
                }
            }
        }

    }

    function onChangeDebounced(selector, fn) {
        $(selector).on('input propertychange paste', _.debounce(fn, 700));
    }

    w.ifVal = ifVal;
    w.onChangeDebounced = onChangeDebounced;

})(window);