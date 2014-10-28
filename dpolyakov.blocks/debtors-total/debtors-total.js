BEM.DOM.decl('debtors-total', {

    render: function (modelDebtors) {
        var bemjson = this._getTotal(modelDebtors);

        BEM.DOM.update(this.domElem, BEMHTML.apply(bemjson));

        this._getTotal(modelDebtors);

        return this;
    },

    _getTotal: function (modelDebtors) {
        var data = modelDebtors.toJSON();
        var size = _.size(data);
        var sum = 0;

        _.each(data, function (debtor) {
            sum += Number(debtor['obligation'])
        });

        return [
            {
                elem: 'count',
                content: 'Должников:&#160;' +size,
                tag: 'span'
            },
            {
                elem: 'sum',
                content: '&#160;с общей суммой&#160;' + sum,
                tag: 'span'
            }
        ];

    }
});
