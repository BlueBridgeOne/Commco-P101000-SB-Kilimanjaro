define('DocumentLinks.Router', [
    'Backbone',
    'DocumentLinks.List.View',
    'DocumentLinks.Collection'
], function (
    Backbone,
    DocumentLinksListView,
    DocumentLinksCollection
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'documentlinks': 'documentlinksList'
        },
        initialize: function (application) {
            this.application = application
        },

        documentlinksList: function () {
            var collection = new DocumentLinksCollection();
            var view = new DocumentLinksListView({
                application: this.application,
                collection: collection
            });

            collection.fetch().done(function () {
                view.showContent();
            });
        }
    })
});