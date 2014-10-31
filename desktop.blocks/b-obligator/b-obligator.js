BEM.DOM.decl('b-obligator', {
    onSetMod: {
        js: function () {
            console.log('b-obligator: init');
        }
    },

    setFirstName: function (firstname) {
        this.findElem('firstname').text(firstname);
    },

    setLastName: function (lastname) {
        this.findElem('lastname').text(lastname);
    },

    setPhone: function (phone) {
        this.findElem('phone').text(phone);
    },

    setObligation: function (obligation) {
        this.findElem('obligation').text(obligation);
    }
});