BEM.DOM.decl('w-obligators', {
    onSetMod: {
        js: function () {
            var widget = this;

            modules.require([ 'PubSub', 'ViewObligators', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function(PubSub, ViewObligators, ViewFormObligatorEdit, ViewFormObligatorCreate) {

                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    new ViewObligators({bemEl: widget, collection: obligatorsCollection});
                    console.log('w-obligators: create Backbone view with data from module "obligator"');

                    // Очевидно, что роутеру здесь (в виджете) не место
                    new Backbone.Router({
                        routes: {
                            'edit/:id': function (id) {
                                new ViewFormObligatorEdit({model: obligatorsCollection.findWhere({'mid': Number(id)})});
                            },

                            'add': function () {
                                new ViewFormObligatorCreate();
                            }
                        }
                    });

                    Backbone.history.start();
                });
            });

            console.log('w-obligators: init');
        }
    }
});


