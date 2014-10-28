BEM.DOM.decl({
        block: 'debtors',
        baseBlock: 'debtors-model'
    },
    {
    onSetMod: {
        js: {
            inited: function () {
                this.__base();
                this._form = BEM.blocks['debtors-form'];

                this._set(this.params.data);
                this._bindToEvents();
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

    _onUpdate: function () {
        if (!(this._debtorsList)) {
            this._debtorsList = this.findBlockInside('debtors-list');
        }

        if (!(this._debtorsTotal)) {
            this._debtorsTotal = this.findBlockInside('debtors-total');
        }

        this._debtorsList.render(this._data);
        this._debtorsTotal.render(this._data);
    },

    _bindToEvents: function () {
        var that = this;

        if (!(this._debtorsItems)) {
            this._debtorsItems = this.findBlocksInside('debtors-item');
        }

        _.each(this._debtorsItems, function(item) {
            item.bindTo('edit', 'click', function() {
                that._form.render(that, that._data.get(this.params.num - 1));
            });

            item.bindTo('delete', 'click', function() {
                console.log('delete', this.params)
            })
        })
    }

});
