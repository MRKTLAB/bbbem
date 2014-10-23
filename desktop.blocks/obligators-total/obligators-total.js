BEM.DOM.decl('obligators-total', {
    onSetMod: {
        js: function () {
            console.log('obligators-total');
        }
    },

    render: function (count, total) {
        this.domElem.text('Total obligators: '+ count +', $'+total);
    }
});