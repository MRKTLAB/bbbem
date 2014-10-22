modules.define('ViewAddObligator', ['PubSub'], function(provide, PubSub) {

    var ViewAddObligator = Backbone.View.extend({
        events: {
            'click .js-book-add__action': 'add'
        },

        add: function (e) {
            Backbone.history.navigate('add');
            e.preventDefault();
        }

    });

    provide(ViewAddObligator);
});