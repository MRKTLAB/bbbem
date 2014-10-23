modules.define('ViewObligatorsTotal', ['CollectionObligators'], function(provide, CollectionObligators) {

    var ViewObligatorsTotal = Backbone.View.extend({
        collection: CollectionObligators,

        initialize: function () {
            this.bemEl = this.$el.bem('obligators-total');
            this.listenTo(this.collection, 'add remove change:obligation reset destroy', this.update);
            this.update();
        },

        update: function () {
            this.render(this.collection.length, this.collection.getTotal());
            return this;
        },

        render: function (count, total) {
            this.bemEl.render(count, total);
            return this;
        }
    });

    provide(ViewObligatorsTotal);
});