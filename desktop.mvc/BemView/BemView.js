modules.define('BemView', function(provide) {

    var BemView = Backbone.View.extend({
        initialize: function (params) {
            var bemBlockEl = params.bemBlockEl;
            var bemBlockName = params.bemBlockName;

            // Если при инстанцирование передали BEM-блок, то устанавливаем его
            if (bemBlockEl && bemBlockEl instanceof BEM) {
                this.bemBlockEl = bemBlockEl;
            }

            // Проверяем наличие имени BEM-блока
            if (bemBlockName && typeof bemBlockName == 'string') {
                this.bemBlockName = bemBlockName;
            } else {
                throw new Error('BemView.initialize: "bemBlockName" is required');
            }

            // Пытаемся инициализировать BEM-блок
            this.initBemBlock();

            // Вызываем функцию доопределения инициализации
            this.initBemView.call(this, params);
        },

        /**
         * Функция доопределения инициализации
         * @param {Object} params
         * @param {BEM} [params.bemBlockEl = null] – BEM-блок
         * @param {String} params.bemBlockName – имя BEM-блока
         */
        initBemView: function (params) {
        },

        /**
         * Инициализирует BEM-блок
         * @returns {BemView}
         */
        initBemBlock: function () {
            var viewNode = null;
            var bemNode = null;

            // TODO: добавить явную проверку, что BEM-блок проинициализирован
            if (this.bemBlockEl) {
                return this;
            }

            viewNode = this.$el;

            if (viewNode) {
                bemNode = viewNode.children('.i-bem');
            } else {
                throw new Error('BemView.initBemBlock: can\'t init BEM-block, because undefined "viewNode"');
            }

            /**
             * BEM-блок, может как быть, так и не быть в DOM, поэтому не кидаем эксепшен:
             *
             * 1. В момент инициализации блок уже есть в DOM;
             * 2. В момент инициализации блока еще нет в DOM, но он появится при отрисовке из шаблона
             *    с помощью метода renderBemView.
             */
            if (bemNode && bemNode.length) {
                this.bemBlockEl = bemNode.bem(this.bemBlockName);
            }

            return this;
        },

        /**
         * Правильно уничтожает BEM-блок
         * @returns {BemView}
         */
        removeBemBlock: function () {
            if (this.bemBlockEl) {
                this.bemBlockEl.destruct();
                this.bemBlockEl = null;
            }

            return this;
        },

        /**
         * Перерисовывает View полностью, с учетом BEM-блока:
         * @param {String} templateResult – результат шаблонизации для отрисовки
         * @returns {BemView}
         */
        renderBemView: function (templateResult) {
            // Правильно удаляем BEM-блок
            this.removeBemBlock();

            // Полностью отрисовываем View
            this.$el.html(templateResult);

            // Инициализируем BEM-блок
            this.initBemBlock(this.bemBlockName);

            return this;
        },

        /**
         * Удаляет Backbone View и BEM-блок
         * @returns {BemView}
         */
        remove: function () {
            this.stopListening();
            this.removeBemBlock();
            this.$el.remove();

            return this;
        }
    });

    provide(BemView);
});