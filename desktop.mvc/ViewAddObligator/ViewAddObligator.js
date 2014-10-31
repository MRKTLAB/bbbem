modules.define('ViewAddObligator', ['PubSub'], function(provide, PubSub) {

    var ViewAddObligator = Backbone.View.extend({
        events: {
            'click .b-add-obligator': 'add'
        },

        add: function (e) {
            Backbone.history.navigate('add');
            e.preventDefault();
        }

    });

    provide(ViewAddObligator);
});