modules.define('ViewFormObligatorEdit', ['ViewFormObligator', 'ModelObligator'], function(provide, ViewFormObligator, ModelObligator) {

    var ViewFormObligatorEdit = ViewFormObligator.extend({
        model: ModelObligator,

        initialize: function () {
            this.constructor.__super__.initialize.apply(this, arguments);

            this.listenTo(this.model, 'invalid', this.error);

            this.renderForm(this.model.toJSON());
            this.show();
        },

        error: function (obligator, err) {
            alert(err.code);
        },

        save: function (e) {
            var formData = $(e.currentTarget).serializeArray();
            var _this = this;

            _.forEach(formData, function (item) {
                _this.model.set(item.name, item.value);
            });

            if (_this.model.isValid()) {
                this.hide();
            }

            e.preventDefault();
        }
    });

    provide(ViewFormObligatorEdit);
});