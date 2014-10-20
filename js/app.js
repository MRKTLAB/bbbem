/**
 * Модель записи
 * Коллекция записей
 * Вью записи
 * Вью списка записей и футера
 * Вью счетчика
 */

(function (exports, $) {

    var App = exports.App = {};
    var models = App.models = {};
    var collection = App.collection = {};
    var views = App.views = {};
    var PubSub = _.extend({}, Backbone.Events);

    models.Obligator = Backbone.Model.extend({
        validate: function (attrs) {
            if (!$.trim(attrs.title)) {
                return {'code': 'EMPTY_TITLE'}
            }
        }
    });

    collection.Obligators = Backbone.Collection.extend({
        model: models.Obligator,

        initialize: function () {
            var _this = this;

            PubSub.on('obligator:created', function (obligator) {
                _this.add(obligator);
            });
        },

        getTotal: function () {
            var total = 0;

            this.models.forEach(function (obligator) {
                total += Number(obligator.get('obligation'))
            });

            return total;
        }
    });

    views.Obligators = Backbone.View.extend({
        collection: collection.Obligators,

        initialize: function () {
            this.collection.on('add', this.addOne, this);
            this.render();
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (taskModelData) {
            var taskView = new views.Obligator({ model: taskModelData });
            this.$el.append(taskView.el);
        }
    });

    views.Obligator = Backbone.View.extend({
        model: models.Obligator,

        tagName: 'tr',

        template: _.template($('#js-book-templates-item').html()),

        events: {
            'click .js-book-item__edit': 'edit',
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


            this.listenTo(this.model, 'invalid', this.error);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        error: function (task, err) {
            alert(err.code)
        },

        edit: function (e) {
            PubSub.trigger('obligator:edit', this.model);
            e.preventDefault();
        },

        destroy: function (e) {
            this.model.destroy();
            e.preventDefault();
        }
    });

    views.ObligatorsTotal = Backbone.View.extend({
        collection: collection.Obligators,

        initialize: function () {
            this.listenTo(this.collection, 'add remove change:obligation reset destroy', this.update);
            this.update();
        },

        update: function () {
            this.render(this.collection.length);
        },

        render: function (count) {
            this.$el.text('Total obligators: '+count+', $'+this.collection.getTotal());
            return this;
        }
    });

    views.AddObligator = Backbone.View.extend({
        events: {
            'click .js-book-add__action': 'add'
        },

        add: function (e) {
            PubSub.trigger('obligator:add');
            e.preventDefault();
        }

    });

    views.FormObligator = Backbone.View.extend({
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
            this.$popup.addClass('popup_visible_hidden');
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

    views.FormObligatorCreate = views.FormObligator.extend({
        initialize: function (options) {
            var _this = this;

            this.constructor.__super__.initialize.apply(this, arguments);
            this.ObligatorModel = options.ObligatorModel;

            PubSub.on('obligator:add', function () {
                _this.show();
            });
        },

        save: function (e) {
            var _this = this;
            var formData = $(e.currentTarget).serializeArray();
            var obligatorNewModel = {};
            e.preventDefault();

            _.forEach(formData, function (item) {
                obligatorNewModel[item.name] = item.value;
            });

            PubSub.trigger('obligator:created', (new this.ObligatorModel(obligatorNewModel)));

            this.hide();

            e.preventDefault();
        }
    });

    views.FormObligatorEdit = views.FormObligator.extend({
        initialize: function () {
            var _this = this;

            this.obligatorEdit = null;
            this.constructor.__super__.initialize.apply(this, arguments);

            PubSub.on('obligator:edit', function (obligator) {
                _this.obligatorEdit = obligator;
                _this.renderForm(obligator.toJSON());
                _this.show();
            });
        },

        save: function (e) {
            var formData = $(e.currentTarget).serializeArray();
            var _this = this;

            _.forEach(formData, function (item) {
                _this.obligatorEdit.set(item.name, item.value);
            });

            this.hide();

            e.preventDefault();
        }
    });


    exports.obligatorsList = new collection.Obligators([
        {'firstname': 'Vlad', 'lastname': 'Kurkin', 'phone': '+79251234567', 'obligation': 5000},
        {'firstname': 'Anton', 'lastname': 'Sachkov', 'phone': '+79251234567', 'obligation': 4000},
        {'firstname': 'Pavel', 'lastname': 'Masalskiy', 'phone': '+79251234567', 'obligation': 3000},
        {'firstname': 'Ivan', 'lastname': 'Zasimov', 'phone': '+79251234567', 'obligation': 2000},
        {'firstname': 'Dmitry', 'lastname': 'Polyakov', 'phone': '+79251234567', 'obligation': 1300}
    ]);

    var obligatorsView = new views.Obligators({el: '#js-book', collection: obligatorsList});
    var obligatorsTotalView = new views.ObligatorsTotal({el: '#js-book-footer', collection: obligatorsList});
    var addObligatorView =  new views.AddObligator({el: '#js-book-add'});
    var formObligatorEdit = new views.FormObligatorEdit();
    var formObligatorCreate = new views.FormObligatorCreate({'ObligatorModel': models.Obligator});


})(window, jQuery);