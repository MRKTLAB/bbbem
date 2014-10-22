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
            if (!attrs.firstname) {
                return {'code': 'FIRSTNAME_EMPTY'};
            }

            if (!attrs.lastname) {
                return {'code': 'LASTNAME_EMPTY'};
            }

            if (!attrs.phone) {
                return {'code': 'PHONE_EMPTY'};
            }

            if (attrs.phone && attrs.phone.indexOf('+7') < 0) {
                return {'code': 'PHONE_INVALID'};
            }

            if (!attrs.obligation || attrs.obligation <= 0) {
                return {'code': 'OBLIGATION_INVALID'};
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

        addOne: function (obligator) {
            var taskView = new views.Obligator({ model: obligator });
            this.$el.append(taskView.el);
        }
    });

    views.Obligator = Backbone.View.extend({
        model: models.Obligator,

        tagName: 'tr',

        template: _.template($('#js-book-templates-item').html()),

        events: {
            //'click .js-book-item__edit': 'edit',
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

    views.FormObligatorCreate = views.FormObligator.extend({
        model: models.Obligator,

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

    views.FormObligatorEdit = views.FormObligator.extend({
        model: models.Obligator,

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


    exports.obligatorsList = new collection.Obligators([
        {'mid': 1, 'firstname': 'Vlad', 'lastname': 'Kurkin', 'phone': '+79251234567', 'obligation': 5000},
        {'mid': 2, 'firstname': 'Anton', 'lastname': 'Sachkov', 'phone': '+79251234567', 'obligation': 4000},
        {'mid': 3, 'firstname': 'Pavel', 'lastname': 'Masalskiy', 'phone': '+79251234567', 'obligation': 3000},
        {'mid': 4, 'firstname': 'Ivan', 'lastname': 'Zasimov', 'phone': '+79251234567', 'obligation': 2000},
        {'mid': 5, 'firstname': 'Dmitry', 'lastname': 'Polyakov', 'phone': '+79251234567', 'obligation': 1300}
    ]);

    var obligatorsView = new views.Obligators({el: '#js-book', collection: obligatorsList});
    var obligatorsTotalView = new views.ObligatorsTotal({el: '#js-book-footer', collection: obligatorsList});
    var addObligatorView =  new views.AddObligator({el: '#js-book-add'});

    new Backbone.Router({
        routes: {
            'edit/:id': function (id) {
                new views.FormObligatorEdit({model: obligatorsList.findWhere({'mid': Number(id)})});
            },

            'add': function () {
                new views.FormObligatorCreate();
            }
        }
    });

    Backbone.history.start();

})(window, jQuery);