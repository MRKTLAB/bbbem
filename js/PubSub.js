modules.define('PubSub', function(provide) {
    var PubSub = _.extend({}, Backbone.Events);
    provide(PubSub);
});