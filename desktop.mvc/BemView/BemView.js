modules.define('BemView', function(provide) {

    var BemView = Backbone.View.extend({
        createBemView: function (blockName) {
            if (this.bemEl) {
                return;
            }

            this.bemEl = this.$el.children('.i-bem').bem(blockName);
        },

        removeBemView: function () {
            if (this.bemEl) {
                this.bemEl.destruct();
                this.bemEl = null;
            }
        },

        remove: function () {
            this.$el.remove();
            this.stopListening();
            this.removeBemView();
            return this;
        }
    });

    provide(BemView);
});