modules.define('obligators', ['PubSub', 'CollectionObligators'], function(provide, PubSub, CollectionObligators) {
    var api = {};
    var obligatorsCollection = null;

    api.setObligationData = function (data) {
        obligatorsCollection = new CollectionObligators(data);

        setTimeout(function () {
            PubSub.trigger('modules:obligators:init', obligatorsCollection);
        }, 5000);
    };

    api.getObligationData = function () {
        return obligatorsCollection;
    };

    provide(api);
});