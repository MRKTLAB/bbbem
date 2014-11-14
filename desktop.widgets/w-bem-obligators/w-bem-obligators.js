BEM.DOM.decl('w-bem-obligators', {
    onSetMod: {
        js: function () {
            var widget = this;

            modules.require([ 'PubSub', 'ViewObligators', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function(PubSub, ViewObligators, ViewFormObligatorEdit, ViewFormObligatorCreate) {

                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    new ViewObligators({
                        bemBlockEl: widget,
                        bemBlockName: 'w-bem-obligators',
                        collection: obligatorsCollection
                    });

                    console.log('w-bem-obligators: create Backbone view with data from module "obligator"');
                });
            });

            console.log('w-bem-obligators: init');
        }
    }
});


