BEM.DOM.decl({
        block: 'debtors',
        baseBlock: 'debtors-model'
    },
    {
    onSetMod: {
        js: {
            inited: function() {
                this.__base();

                this._set(this.params.data)
            }
        }
    },

    _set: function (data) {
        if (_.size(data)) {
            this._data = new this.ModelDebtors(data);
            this._onUpdate();
        } else {
            throw new Error('No data');
        }
    },

    _get: function () {
        return this._data;
    },

    _onUpdate: function() {
        if (!(this._debtorsList)) {
            this._debtorsList = this.findBlockInside('debtors-list');
        }

        this._debtorsList.render(this._data);
    }

});
