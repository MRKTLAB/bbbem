BEM.DOM.decl('obligator', {
    onSetMod: {
        js: function () {
            console.log('obligator init');
//            this.domElem.on('click', '.referee__button_wizard', function () {
//                    that.setMod('mode', 'wizard' + $(this).data('wizard-type'));
//                })
//                // возобновление переписки
//                .on('click', '.referee__link_newConv', function (ev) {
//                    ev.preventDefault();
//                    that.trigger('newConversationRequest');
//                    $(ev.target).mouseleave(function (ev) { // костыль: если ссылка имеет hover в момент клика, то после setMod всё равно остаётся красный цвет
//                        $(ev.target).bem('link').setMod('disabled', 'yes');
//                    });
//                });
        }
    }
});