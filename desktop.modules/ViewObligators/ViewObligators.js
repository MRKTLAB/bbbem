modules.define('ViewObligators', ['CollectionObligators', 'ViewObligator'], function(provide, CollectionObligators, ViewObligator) {

    var ViewObligators = Backbone.View.extend({
        collection: CollectionObligators,

        initialize: function () {
            this.collection.on('add', this.addOne, this);
            this.$list = this.$el.find('.w-obligators__list');
            this.render();
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (obligator) {
            var taskView = new ViewObligator({ model: obligator });
            this.$list.append(taskView.el);
        }
    });

    provide(ViewObligators);
});