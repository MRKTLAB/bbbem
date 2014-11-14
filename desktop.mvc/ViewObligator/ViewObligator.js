modules.define('ViewObligator', ['BemView', 'ModelObligator'], function(provide, BemView, ModelObligator) {

    var ViewObligator = BemView.extend({
        model: ModelObligator,

        template: _.template($('#w-obligators__list-item').html()),

        events: {
            'click .b-obligator__remove': 'destroy',
            'click .b-obligator__full-redraw': 'fullRedraw'
        },

        initBemView: function () {
            this.listenTo(this.model, 'destroy', this.remove);

            this.listenTo(this.model, 'change:firstname', function () {
                this.bemBlockEl.setFirstName(this.model.get('firstname'));
            });

            this.listenTo(this.model, 'change:lastname', function () {
                this.bemBlockEl.setLastName(this.model.get('lastname'));
            });

            this.listenTo(this.model, 'change:phone', function () {
                this.bemBlockEl.setPhone(this.model.get('phone'));
            });

            this.listenTo(this.model, 'change:obligation', function () {
                this.bemBlockEl.setObligation(this.model.get('obligation'));
            });

            this.render();
        },

        render: function () {
            this.renderBemView(this.template(this.model.toJSON()));
        },

        destroy: function (e) {
            this.model.destroy();
            e.preventDefault();
        }
    });

    provide(ViewObligator);
});