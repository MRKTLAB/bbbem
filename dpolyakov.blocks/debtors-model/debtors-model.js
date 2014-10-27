(function() {
    BEM.DOM.decl('debtors-model', {

        onSetMod: {
            js : {
                inited : function() {
                    this.ModelDebtors = Backbone.Model.extend({
                        validate: function (attrs) {
                            if (!attrs.firstname) {
                                return {'code': 'FIRSTNAME_EMPTY'};
                            }

                            if (!attrs.lastname) {
                                return {'code': 'LASTNAME_EMPTY'};
                            }

                            if (!attrs.phone) {
                                return {'code': 'PHONE_EMPTY'};
                            }

                            if (attrs.phone && attrs.phone.indexOf('+7') < 0) {
                                return {'code': 'PHONE_INVALID'};
                            }

                            if (!attrs.obligation || attrs.obligation <= 0) {
                                return {'code': 'OBLIGATION_INVALID'};
                            }
                        }
                    })
                }
            }
        }
    });
})();

