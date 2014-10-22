modules.define('ViewFormObligatorCreate', ['ViewFormObligator', 'ModelObligator', 'PubSub'], function(provide, ViewFormObligator, ModelObligator, PubSub) {

    var ViewFormObligatorEdit = ViewFormObligator.extend({
        model: ModelObligator,

        initialize: function (options) {
            this.constructor.__super__.initialize.apply(this, arguments);
            this.show();
        },

        error: function (obligator, err) {
            alert(err.code);
        },

        save: function (e) {
            var formData = $(e.currentTarget).serializeArray();
            var obligatorNewModel = {};

            obligatorNewModel.mid = Math.round(Date.now()+Math.random()*1000);
            _.forEach(formData, function (item) {
                obligatorNewModel[item.name] = item.value;
            });

            obligatorNewModel = new this.model(obligatorNewModel);

            this.listenTo(obligatorNewModel, 'invalid', this.error);

            if (obligatorNewModel.isValid()) {
                PubSub.trigger('obligator:created', obligatorNewModel);
                this.hide();
            }

            e.preventDefault();
        }
    });

    provide(ViewFormObligatorEdit);
});