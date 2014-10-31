BEM.DOM.decl('b-obligator', {
    onSetMod: {
        js: function () {
            console.log('b-obligator: init');
        }
    },

    render: function (count, total) {
        this.domElem.text('Total obligators: '+ count +', $'+total);
    }
});