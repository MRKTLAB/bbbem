modules.define('CollectionObligators', ['ModelObligator', 'PubSub'], function(provide, ModelObligator, PubSub) {

    var CollectionObligators = Backbone.Collection.extend({
        model: ModelObligator,

        initialize: function () {
            var _this = this;

            PubSub.on('obligator:created', function (obligator) {
                _this.add(obligator);
            });
        },

        getTotal: function () {
            var total = 0;

            this.models.forEach(function (obligator) {
                total += Number(obligator.get('obligation'))
            });

            return total;
        }
    });

    provide(CollectionObligators);
});