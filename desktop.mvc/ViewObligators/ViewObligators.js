modules.define('ViewObligators', ['BemView', 'CollectionObligators', 'ViewObligator'], function(provide, BemView, CollectionObligators, ViewObligator) {

    var ViewObligators = BemView.extend({
        collection: CollectionObligators,

        initBemView: function () {
            this.collection.on('add', this.addOne, this);
            this.bemBlockList = this.bemBlockEl.findBlockInside('w-obligators__list');
            this.render();
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (obligator) {
            var listObligatorsItem = new ViewObligator({
                model: obligator,
                bemBlockName: 'b-obligator'
            });

            BEM.DOM.append(this.bemBlockList.domElem, listObligatorsItem.el);
        }
    });

    provide(ViewObligators);
});