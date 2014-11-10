modules.define('ViewObligatorsTotal', ['CollectionObligators'], function(provide, CollectionObligators) {

    var ViewObligatorsTotal = Backbone.View.extend({
        collection: CollectionObligators,

        initialize: function (params) {
            this.bemEl = params.bemEl;
            this.bemTotal = this.bemEl.findBlockInside('b-obligators-total');
            this.listenTo(this.collection, 'add remove change:obligation reset destroy', this.update);
            this.update();
        },

        update: function () {
            this.render(this.collection.length, this.collection.getTotal());
            return this;
        },

        render: function (count, total) {
            this.bemTotal.render(count, total);
            return this;
        }
    });

    provide(ViewObligatorsTotal);
});