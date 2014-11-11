/**
 * @file
 * @date 10.11.14
 * @author andychups <andychups@yandex-team.ru>
 */

BEM.DOM.decl({block:'b-preloader'}, {
    onSetMod: {
        js: function () {
            var block = this;

            modules.require([ 'PubSub' ], function(PubSub) {
                PubSub.on('modules:obligators:init', function () {
                    block.domElem.removeClass('b-preloader_visibility_visible');
                    console.log('b-preloader: fetch data from module "obligator"');
                });
            });

            console.log('b-preloader: init');
        }
    }
});


