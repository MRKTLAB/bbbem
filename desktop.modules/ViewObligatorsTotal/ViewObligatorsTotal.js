modules.define('ViewObligatorsTotal', ['CollectionObligators'], function(provide, CollectionObligators) {

    var ViewObligatorsTotal = Backbone.View.extend({
        collection: CollectionObligators,

        initialize: function () {
            this.listenTo(this.collection, 'add remove change:obligation reset destroy', this.update);
            this.update();
        },

        update: function () {
            this.render(this.collection.length);
        },

        render: function (count) {
            this.$el.text('Total obligators: '+count+', $'+this.collection.getTotal());
            return this;
        }
    });

    provide(ViewObligatorsTotal);
});