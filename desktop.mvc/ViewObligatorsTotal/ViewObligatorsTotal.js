modules.define('ViewObligatorsTotal', ['BemView', 'CollectionObligators'], function(provide, BemView, CollectionObligators) {

    var ViewObligatorsTotal = BemView.extend({
        collection: CollectionObligators,

        initBemView: function () {
            this.bemBlockTotal = this.bemBlockEl.findBlockInside('b-obligators-total');
            this.listenTo(this.collection, 'add remove change:obligation reset destroy', this.update);
            this.update();
        },

        update: function () {
            this.render(this.collection.length, this.collection.getTotal());
            return this;
        },

        render: function (count, total) {
            this.bemBlockTotal.render(count, total);
            return this;
        }
    });

    provide(ViewObligatorsTotal);
});