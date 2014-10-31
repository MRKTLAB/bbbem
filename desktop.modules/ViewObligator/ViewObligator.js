modules.define('ViewObligator', ['ModelObligator'], function(provide, ModelObligator) {

    var ViewObligator = Backbone.View.extend({
        model: ModelObligator,

        template: _.template($('#w-obligators__list-item').html()),

        events: {
            'click .b-obligator__remove': 'destroy'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);

            this.listenTo(this.model, 'change:firstname', function () {
                this.$('.b-obligator__firstname').text(this.model.get('firstname'));
            });

            this.listenTo(this.model, 'change:lastname', function () {
                this.$('.b-obligator__lastname').text(this.model.get('lastname'));
            });

            this.listenTo(this.model, 'change:phone', function () {
                this.$('.b-obligator__phone').text(this.model.get('phone'));
            });

            this.listenTo(this.model, 'change:obligation', function () {
                this.$('.b-obligator__obligation').text(this.model.get('obligation'));
            });

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        destroy: function (e) {
            this.model.destroy();
            e.preventDefault();
        }
    });

    provide(ViewObligator);
});