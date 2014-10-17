(function () {

    $(function () {

        // Building views-wrappers for every element with mb-bind
        var views = _.map($('[mb-bind]'), buildView);

        // Calling initial rendering on each view
        _.each(views, invoke('render'));

        // Observing scopes for rendering on each change
        observeScopes(views);

    });

    function buildView(el) {

        var bindings = $(el).attr('mb-bind').split(',');

        var scope = $(el).parents('[mb-scope]').attr('mb-scope');
        if (!scope) error('Binding is outside of scope (mb-scope is missing)');

        return new View($(el), scope, bindings);
    }

    function View($el, scope, bindings) {
        this.$el = $el;
        this.scope = scope;
        this.template = Handlebars.compile($el.html());
        this.bindings = bindings;
    }

    View.prototype.render = function () {

        var keyValue = (function (name) {
            var value = onWindow(this.scope)[name];
            return [name, value];
        }).bind(this);

        var data = _.object(_.map(this.bindings, keyValue));

        this.$el.html(this.template(data));
    };

    function observeScopes(views) {
        var elements = $('[mb-scope]');

        _.each(elements, function (el) {

            var scopeName = $(el).attr('mb-scope');

            var scope = onWindow(scopeName);

            var onScopeChange = function (changes) {
                changes.forEach(function (change) {
                    var viewsToRerender = _.filter(views, function(view) {
                        return (_.contains(view.bindings, change.name) && view.scope == scopeName)
                    });

                    _.each(viewsToRerender, invoke('render'));
                });
            };

            deepObserve(scope, onScopeChange);
        });
    }

    // Helpers
    function invoke(name) {
        return function (x) {
            x[name]();
        }
    }

    function error(msg) {
        throw msg;
    }

    function valueFrom(obj, str) {
        str = str.split(".");
        for (var i = 0; i < str.length; i++)
            obj = obj[str[i]];
        return obj;
    }

    function onWindow(str) {
        return valueFrom(window, str);
    }

})();