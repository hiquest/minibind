(function (w) {

    var minibind = cachingStore();

    function cachingStore() {
        var store = {};

        return function (name) {
            if (!store[name]) {
                store[name] = {};
            }
            return store[name];
        };
    }

    w.minibind = minibind;

    function error(msg) {
        throw msg;
    }

    function getModel(app, scope, bindedTo) {
        return minibind(app)[scope][bindedTo];
    }

    function bindView(el) {

        var bindedTo = $(el).attr('mb-bind');

        var app = $(el).parents('[mb-app]').attr('mb-app');
        if (!app) error('Binding is outside of app declaration (mb-app is missing)');

        var scope = $(el).parents('[mb-scope]').attr('mb-scope');
        if (!scope) error('Binding is outside of scope (mb-scope is missing)');

        var model = getModel(app, scope, bindedTo);

        var view = new View($(el), $(el).html());

        var renderView = function() {
            var data = {};
            data[bindedTo] = getModel(app, scope, bindedTo);
            view.render(data);
        };

        if (_.isArray(model)) {
            Array.observe(model, renderView)
        } else {
            Object.observe(model, renderView)
        }

        renderView();
        return view;
    }

    function View($el, template) {
        this.$el = $el;
        this.template = template;
    }

    View.prototype.render = function(data) {
        this.$el.html(Handlebars.compile(this.template)(data));
    };

    $(function () {
        var bindings = _.map($('[mb-bind]'), bindView);
    });

})(window);