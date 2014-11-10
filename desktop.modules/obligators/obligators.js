modules.define('obligators', ['PubSub', 'CollectionObligators'], function(provide, PubSub, CollectionObligators) {
    var api = {};
    var obligatorsCollection = null;

    api.setObligationData = function (data) {
        obligatorsCollection = new CollectionObligators(data);
        PubSub.trigger('modules:obligators:init', obligatorsCollection);
    };

    api.getObligationData = function () {
        return obligatorsCollection;
    };

    provide(api);
});