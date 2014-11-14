modules.require([ 'PubSub', 'ViewFormObligatorEdit', 'ViewFormObligatorCreate' ], function (PubSub, ViewFormObligatorEdit, ViewFormObligatorCreate) {

    PubSub.on('modules:obligators:init', function (obligatorsCollection) {

        new Backbone.Router({
            routes: {
                'edit/:id': function (id) {
                    new ViewFormObligatorEdit({model: obligatorsCollection.findWhere({'mid': Number(id)})});
                },

                'add': function () {
                    new ViewFormObligatorCreate();
                }
            }
        });

        Backbone.history.start();
    });
});