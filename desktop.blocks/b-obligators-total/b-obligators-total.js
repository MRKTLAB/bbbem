BEM.DOM.decl('b-obligators-total', {
    onSetMod: {
        js: function () {
            console.log('b-obligators-total: init');
        }
    },

    render: function (count, total) {
        this.domElem.text('Total obligators: '+ count +', $'+total);
    }
});