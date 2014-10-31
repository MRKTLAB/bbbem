BEM.DOM.decl('w-obligator', {
    onSetMod: {
        js: function () {
            var widgetData = this.params;
            var obligatorsData = widgetData.obligators;


            modules.require([ 'CollectionObligators', 'ViewObligators', 'ViewObligatorsTotal', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function(CollectionObligators, ViewObligators, ViewObligatorsTotal, ViewFormObligatorEdit, ViewFormObligatorCreate) {
                var obligatorsList = new CollectionObligators(obligatorsData);

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
            });
        }
    }
});


