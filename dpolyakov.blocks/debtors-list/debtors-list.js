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

        _.each(modelDebtors, function (debtor) {
            items.push({
                block: this._name,
                elem: 'item',
                tag: 'tr',
                content: [
                    {
                        elem: 'firstname',
                        content: debtor.firstname,
                        tag: 'td'
                    },
                    {
                        elem: 'lastname',
                        content: debtor.lastname,
                        tag: 'td'
                    },
                    {
                        elem: 'phone',
                        content: debtor.phone,
                        tag: 'td'
                    },
                    {
                        elem: 'obligation',
                        content: debtor.obligation,
                        tag: 'td'
                    },
                    {
                        elem: 'controls',
                        tag: 'td',
                        content: [
                            {
                                elem: 'controls-edit',
                                tag: 'a',
                                attrs: {
                                    href: '#edit/' + debtor.mid
                                },
                                content: 'Edit'
                            },
                            {
                                elem: 'controls-remove',
                                tag: 'a',
                                attrs: {
                                    href: '#remove/' + debtor.mid
                                },
                                content: 'Remove'
                            }
                        ]
                    }
                ]
            })
        });

        return items;
    }
});
