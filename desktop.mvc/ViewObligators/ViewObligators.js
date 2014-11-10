modules.define('ViewObligators', ['BemView', 'CollectionObligators', 'ViewObligator'], function(provide, BemView, CollectionObligators, ViewObligator) {

    var ViewObligators = BemView.extend({
        collection: CollectionObligators,

        initialize: function (params) {
            this.collection.on('add', this.addOne, this);
            this.bemEl = params.bemEl;
            this.bemList = this.bemEl.findBlockInside('w-obligators__list');
            this.render();
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (obligator) {
            var taskView = new ViewObligator({ model: obligator });
            BEM.DOM.append(this.bemList.domElem, taskView.el);
        }
    });

    provide(ViewObligators);
});