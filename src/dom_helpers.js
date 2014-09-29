(function(w) {

    function onChangeDebounced(selector, fn) {
        $(selector).on('input propertychange paste', _.debounce(fn, 700));
    }

    w.onChangeDebounced = onChangeDebounced;

})(window);