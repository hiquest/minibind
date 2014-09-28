(function (w) {

    // TODO: watch only scope, not individual objects
    // TODO: choose template engine

    // building a caching storage for apps;
    w.minibind = _.memoize(function () {
        return {};
    });

    $(function () {
        var views = _.map($('[mb-bind]'), bindView);
        _.each(views, invoke('render'));
        observeScopes(views);
    });

    function bindView(el) {

        var bindings = $(el).attr('mb-bind').split(',');

        var app = $(el).parents('[mb-app]').attr('mb-app');
        if (!app) error('Binding is outside of app declaration (mb-app is missing)');

        var scope = $(el).parents('[mb-scope]').attr('mb-scope');
        if (!scope) error('Binding is outside of scope (mb-scope is missing)');

        return new View($(el), app, scope, bindings);
    }

    function View($el, app, scope, bindings) {
        this.$el = $el;
        this.app = app;
        this.scope = scope;
        this.template = Handlebars.compile($el.html());
        this.bindings = bindings;
    }

    View.prototype.render = function () {

        var bindingKeyValue = (function (name) {
            var value = minibind(this.app)[this.scope][name];
            return [name, value];
        }).bind(this);

        var data = _.object(_.map(this.bindings, bindingKeyValue));

        this.$el.html(this.template(data));
    };

    function observeScopes(views) {
        var elements = $('[mb-scope]');

        _.each(elements, function (el) {

            var scopeName = $(el).attr('mb-scope');

            var app = $(el).parents('[mb-app]').attr('mb-app');
            if (!app) error('Scope is outside of app declaration (mb-app is missing)');

            var scope = minibind(app)[scopeName];


            var onScopeChange = function (changes) {
                changes.forEach(function (change) {

                    _.chain(views).filter(views, function (view) {
                        return (view.bindings.contains(change.name) && view.scope == scopeName && view.app == app)
                    }).each(invoke('render'));

                });
            };

            Object.observe(scope, onScopeChange);

        });
    }

    // Helpers
    function invoke(name) {
        return function (x) {
            x[name]();
        }
    }

    function by(name, value) {
        return function(x) {
            return x[name] === value;
        }
    }

    function error(msg) {
        throw msg;
    }

})(window);