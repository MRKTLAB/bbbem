modules.define('ViewObligator', ['ModelObligator'], function(provide, ModelObligator) {

    var ViewObligator = Backbone.View.extend({
        model: ModelObligator,

        template: _.template($('#w-obligators__list-item').html()),

        events: {
            'click .b-obligator__remove': 'destroy'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.removeBemView);

            this.listenTo(this.model, 'change:firstname', function () {
                this.bemEl.setFirstName(this.model.get('firstname'));
            });

            this.listenTo(this.model, 'change:lastname', function () {
                this.bemEl.setLastName(this.model.get('lastname'));
            });

            this.listenTo(this.model, 'change:phone', function () {
                this.bemEl.setPhone(this.model.get('phone'));
            });

            this.listenTo(this.model, 'change:obligation', function () {
                this.bemEl.setObligation(this.model.get('obligation'));
            });

            this.render();

            this.bemEl = this.$el.find('.b-obligator').bem('b-obligator');
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        removeBemView: function () {
            this.bemEl.destruct();
            this.remove();
        },

        destroy: function (e) {
            this.model.destroy();
            e.preventDefault();
        }
    });

    provide(ViewObligator);
});