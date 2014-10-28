(function () {
    BEM.DOM.decl('debtors-item', {
            onSetMod: {
                js: {
                    inited: function() {
                        this._name = this.__self.getName();

                    }
                }
            }
        },{
        build: function (debtor) {
            return {
                block: this._name,
                tag: 'tr',
                js: {
                    num: debtor.mid
                },
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
                                block: 'btn btn-xs btn-default',
                                tag: 'span',
                                js: {
                                    num: debtor.mid
                                },
                                content: 'Edit',
                                mix: {
                                    block: this._name,
                                    elem: 'edit'
                                }
                            },
                            {
                                block: 'btn btn-xs btn-danger',
                                tag: 'span',
                                js: {
                                    num: debtor.mid
                                },
                                content: 'Remove',
                                mix: {
                                    block: this._name,
                                    elem: 'remove'
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
);

})();