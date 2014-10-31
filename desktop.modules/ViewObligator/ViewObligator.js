modules.define('ViewObligator', ['ModelObligator'], function(provide, ModelObligator) {

    var ViewObligator = Backbone.View.extend({
        model: ModelObligator,

        template: _.template($('#js-book-templates-item').html()),

        events: {
            'click .js-book-item__remove': 'destroy'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);

            this.listenTo(this.model, 'change:firstname', function () {
                this.$('.js-book-item__firstname').text(this.model.get('firstname'));
            });

            this.listenTo(this.model, 'change:lastname', function () {
                this.$('.js-book-item__lastname').text(this.model.get('lastname'));
            });

            this.listenTo(this.model, 'change:phone', function () {
                this.$('.js-book-item__phone').text(this.model.get('phone'));
            });

            this.listenTo(this.model, 'change:obligation', function () {
                this.$('.js-book-item__obligation').text(this.model.get('obligation'));
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