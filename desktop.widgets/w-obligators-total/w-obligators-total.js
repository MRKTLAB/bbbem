/**
 * @file
 * @date 10.11.14
 * @author andychups <andychups@yandex-team.ru>
 */

BEM.DOM.decl('w-obligators-total', {
    onSetMod: {
        js: function () {
            var widget = this;

            modules.require([ 'PubSub', 'ViewObligatorsTotal' ], function(PubSub, ViewObligatorsTotal) {
                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    new ViewObligatorsTotal({bemEl: widget, collection: obligatorsCollection});
                    console.log('w-obligators-total: create Backbone view with data from module "obligator"');
                });
            });

            console.log('w-obligators-total: init');
        }
    }
});


