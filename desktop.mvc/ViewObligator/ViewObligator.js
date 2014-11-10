modules.define('ViewObligator', ['BemView', 'ModelObligator'], function(provide, BemView, ModelObligator) {

    var ViewObligator = BemView.extend({
        model: ModelObligator,

        template: _.template($('#w-obligators__list-item').html()),

        events: {
            'click .b-obligator__remove': 'destroy',
            'click .b-obligator__full-redraw': 'fullRedraw'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);

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

            this.renderBemView();
        },

        fullRedraw: function () {
            this.render();
        },

        renderBemView: function () {
            this.removeBemView();
            this.render();
            this.createBemView('b-obligator');
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        destroy: function (e) {
            this.model.destroy();
            e.preventDefault();
        }
    });

    provide(ViewObligator);
});