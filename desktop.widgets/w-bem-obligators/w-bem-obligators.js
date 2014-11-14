BEM.DOM.decl('w-bem-obligators', {
    onSetMod: {
        js: function () {
            var _this = this;

            _this.bemBlockList = _this.findBlockInside('w-obligators__list');

            modules.require([ 'PubSub' ], function(PubSub) {

                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    _this.collection = obligatorsCollection;
                    _this.render();
                });
            });

            console.log('w-bem-obligators: init');
        }
    },

    render: function () {
        this.collection.each(this.addOne, this);
    },

    addOne: function () {
        /**
         * Тут шаблон нашего BEM-блока, API которого мы считаем контроллером, но обратиться
         * к этому API мы сможем только тогда, когда вставим шаблон в DOM и проинициализируем
         * на нем BEM-блок.
         *
         * Т.е. в случае с Backbone BemView я бы сделал так: new listObligatorsItem
         * и вьюха уже сама все сделала бы, отрисовалась бы, проинициализировала бы BEM-блок.
         *
         * В случае отказа от Backbone BemView, я должен сделать примерно тоже самое с i-bem.js:
         * new BEM.blocks['b-obligator'] – это работать не будет.
         * @type {string}
         */
        var listObligatorsItem = '<div>хуйпиздаджигурда</div>';

        BEM.DOM.append(this.bemBlockList.domElem, listObligatorsItem);
    }
});


