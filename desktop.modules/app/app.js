/**
 * Модель записи
 * Коллекция записей
 * Вью записи
 * Вью списка записей и футера
 * Вью счетчика
 */

modules.define('app', [ 'CollectionObligators', 'ViewObligators', 'ViewObligatorsTotal', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function(provide, CollectionObligators, ViewObligators, ViewObligatorsTotal, ViewFormObligatorEdit, ViewFormObligatorCreate) {
    var app = {};
    var obligators = null;

    app.setObligators = function (list) {
        obligators = list;
    };

    app.getObligators = function () {
        return obligators;
    };

    app.init = function () {
        var obligatorsList = new CollectionObligators(app.getObligators());
        new ViewObligators({el: '#js-book', collection: obligatorsList});
        new ViewObligatorsTotal({el: '#js-book-footer', collection: obligatorsList});

        new Backbone.Router({
            routes: {
                'edit/:id': function (id) {
                    new ViewFormObligatorEdit({model: obligatorsList.findWhere({'mid': Number(id)})});
                },

                'add': function () {
                    new ViewFormObligatorCreate();
                }
            }
        });

        Backbone.history.start();
    };

    provide(app);
});