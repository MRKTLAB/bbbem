/**
 * @file
 * @date 10.11.14
 * @author andychups <andychups@yandex-team.ru>
 */

BEM.DOM.decl('w-bem-obligators-total', {
    onSetMod: {
        js: function () {
            var _this = this;
            this.bemTotal = _this.findBlockInside('b-obligators-total');

            modules.require([ 'PubSub' ], function (PubSub) {
                PubSub.on('modules:obligators:init', function (obligatorsCollection) {
                    _this.collection = obligatorsCollection;
                    _this.collection.on('add remove change:obligation reset destroy', function () {
                        _this.update();
                    });
                    _this.update();
                });
            });

            console.log('w-obligators-total: init');
        }
    },

    update: function () {
        this.render(this.collection.length, this.collection.getTotal());
    },

    render: function (count, total) {
        this.bemTotal.render(count, total);
    }
});


