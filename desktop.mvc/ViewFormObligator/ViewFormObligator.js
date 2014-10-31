modules.define('ViewFormObligator', function(provide) {

    var ViewFormObligator = Backbone.View.extend({
        tagName: 'div',

        template: _.template($('#js-book-templates-item-form').html()),

        templateForm: _.template($('#js-book-templates-item-form-inner').html()),

        events: {
            'click .js-book-popup-close': 'close',
            'submit .js-book-popup-form': 'save'
        },

        initialize: function () {
            this.render();
            this.$popup = this.$el.find('.popup');
            this.$popupContent = this.$popup.find('.popup__content');
            this.renderForm();
            $('body').append(this.$el);
        },

        close: function (e) {
            this.hide();
            e.preventDefault();
        },

        show: function () {
            this.$popup.removeClass('popup_visible_hidden');
        },

        hide: function () {
            this.remove();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        renderForm: function (obligator) {
            this.$popupContent.html(this.templateForm(obligator));
            return this;
        }
    });

    provide(ViewFormObligator);
});