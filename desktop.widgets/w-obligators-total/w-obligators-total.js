/**
 * @file
 * @date 10.11.14
 * @author andychups <andychups@yandex-team.ru>
 */

BEM.DOM.decl({block:'w-obligators-total'}, {
    onSetMod: {
        js: function () {
            var widget = this;
            var widgetEl = widget.domElem;
            var widgetData = widget.params;
            var obligatorsData = widgetData.obligators;

            modules.require([ 'CollectionObligators', 'ViewObligatorsTotal' ], function(CollectionObligators, ViewObligatorsTotal) {
                var obligatorsList = new CollectionObligators(obligatorsData);

                new ViewObligatorsTotal({bemEl: widget, collection: obligatorsList});
            });

            console.log('w-obligators-total: init');
        }
    }
});


