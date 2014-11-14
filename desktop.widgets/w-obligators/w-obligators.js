BEM.DOM.decl('w-obligators', {
    onSetMod: {
        js: function () {
            var widget = this;

            modules.require([ 'PubSub', 'ViewObligators'], function(PubSub, ViewObligators) {

                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    new ViewObligators({
                        bemBlockEl: widget,
                        bemBlockName: 'w-obligators',
                        collection: obligatorsCollection
                    });

                    console.log('w-obligators: create Backbone view with data from module "obligator"');
                });
            });

            console.log('w-obligators: init');
        }
    }
});


