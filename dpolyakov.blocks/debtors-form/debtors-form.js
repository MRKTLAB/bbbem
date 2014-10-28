BEM.DOM.decl('debtors-form', {
        onSetMod: {
            js: {
                inited: function () {
                    this.__base();
                }
            }
        }

    },
    {
    render: function (debtor) {
        var bemjson = this._buildContent(debtor);

        var html = $(BEMHTML.apply(bemjson));

        BEM.DOM.append($('body'), html);
        BEM.DOM.init(html);

    },

    live: function () {
        this.liveBindTo('debtors-form remove', 'click', function () {
            this.destruct()
        });

        this.liveBindTo('debtors-form save', 'click', function () {

        });

        return false;
    },

    _buildContent: function(debtor) {
        this._name = 'debtors-form';
        this._debtor = {
            firstname: '',
            lastname: '',
            phone: '',
            obligation: '',
            mid: Math.round(Date.now()+Math.random()*1000)
        };

        // Если пришел объект должника, значит это редактирование
        if (debtor) {
            this._debtor = _.extend({}, this._debtor, debtor)
        }

        return {
            block: 'popup',
            mix: {
              block: this._name,
                js: true
            },
            content: [
                {elem: 'paranja'},
                {
                    elem: 'content',
                    content:
                        {
                            block: 'form',
                            tag: 'form',
                            content: [
                                {
                                    block: 'form-group',
                                    content: [
                                        {
                                            block: 'form-group',
                                            elem: 'label',
                                            tag: 'label',
                                            content: 'firstname'
                                        },
                                        {
                                            block: 'form-control',
                                            tag: 'input',
                                            attrs: {
                                                type: 'text',
                                                placeholder: 'firstname',
                                                name: 'firstname',
                                                value: this._debtor.firstname
                                            }
                                        }
                                    ]
                                },
                                {
                                    block: 'form-group',
                                    content: [
                                        {
                                            block: 'form-group',
                                            elem: 'label',
                                            tag: 'label',
                                            content: 'lastname'
                                        },
                                        {
                                            block: 'form-control',
                                            tag: 'input',
                                            attrs: {
                                                type: 'text',
                                                placeholder: 'lastname',
                                                name: 'lastname',
                                                value: this._debtor.lastname
                                            }
                                        }
                                    ]
                                },
                                {
                                    block: 'form-group',
                                    content: [
                                        {
                                            block: 'form-group',
                                            elem: 'label',
                                            tag: 'label',
                                            content: 'phone'
                                        },
                                        {
                                            block: 'form-control',
                                            tag: 'input',
                                            attrs: {
                                                type: 'tel',
                                                placeholder: 'phone',
                                                name: 'phone',
                                                value: this._debtor.phone
                                            }
                                        }
                                    ]
                                },
                                {
                                    block: 'form-group',
                                    content: [
                                        {
                                            block: 'form-group',
                                            elem: 'label',
                                            tag: 'label',
                                            content: 'obligation'
                                        },
                                        {
                                            block: 'form-control',
                                            tag: 'input',
                                            attrs: {
                                                type: 'text',
                                                placeholder: 'obligation',
                                                name: 'obligation',
                                                value: this._debtor.obligation
                                            }
                                        }
                                    ]
                                },
                                {
                                    block: 'form-control',
                                    tag: 'input',
                                    attrs: {
                                        type: 'hidden',
                                        name: 'mid',
                                        value: this._debtor.mid
                                    }
                                },
                                {
                                    block: 'btn btn-success',
                                    tag: 'button',
                                    content: 'Save',
                                    attrs: {
                                        type: 'submit'
                                    }
                                },
                                {
                                    block: 'btn btn-danger',
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
                }
            ]
        }
    }
});
