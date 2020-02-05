define('Quotations.Router', [
    'Backbone'
], function (
    Backbone
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'quotations/create': 'createQuotation'
        },
        initialize: function (application) {
            this.application = application
        },

        createQuotation: function () {
            // var collection = new QuotationsCollection();
            // var view = new QuotationsListView({
            //     application: this.application,
            //     collection: collection
            // });

            // collection.fetch().done(function () {
            //     view.showContent();
            // });
        }
    })
});