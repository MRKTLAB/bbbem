/**
 * @file
 * @date 10.11.14
 * @author andychups <andychups@yandex-team.ru>
 */

BEM.DOM.decl({block:'b-obligators-total'}, {
    render: function (count, total) {
        this.domElem.text('Total obligators: '+count+'. Total sum: $'+total);
    }
});


