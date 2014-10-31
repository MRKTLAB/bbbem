BEM.DOM.decl('w-obligators', {
    onSetMod: {
        js: function () {
            var widget = this;
            var widgetEl = widget.domElem;
            var widgetData = widget.params;
            var obligatorsData = widgetData.obligators;

            modules.require([ 'CollectionObligators', 'ViewObligators', 'ViewObligatorsTotal', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function(CollectionObligators, ViewObligators, ViewObligatorsTotal, ViewFormObligatorEdit, ViewFormObligatorCreate) {
                var obligatorsList = new CollectionObligators(obligatorsData);

                new ViewObligators({el: widgetEl, collection: obligatorsList});
                new ViewObligatorsTotal({el: widgetEl.find('.b-obligators-total'), collection: obligatorsList});

                // Очевидно, что роутеру здесь (в виджете) не место
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

            console.log('w-obligators: init');
        }
    }
});


