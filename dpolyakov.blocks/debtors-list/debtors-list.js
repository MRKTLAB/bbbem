BEM.DOM.decl({
    block: 'debtors-list'
},
{
    onSetMod: {
        js: {
            inited: function() {
                this._name = this.__self.getName();
            }
        }
    },

    render: function (modelDebtors) {
        var bemjson = this._buildItems(modelDebtors.toJSON());

        BEM.DOM.append(this.domElem, BEMHTML.apply(bemjson));
    },

    _buildItems: function(modelDebtors) {
        var items = [];
        var debtorItem = BEM.blocks['debtors-item'];

        _.each(modelDebtors, function (debtor) {
            items.push(debtorItem.build(debtor))
        });

        return items;
    }
});
