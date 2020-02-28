define('Quotations.Router', [
    'Quotations.Collection',
    'Quotations.Model',
    'Quotations.List.View',
    'Quotations.Edit.View',
    'Backbone'
], function (
    QuotationsCollection,
    QuotationsModel,
    QuotationsListView,
    QuotationsEditView,
    Backbone
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'quotations/create': 'createQuotation',
            'quotations/saved': 'savedQuotation',
            'quotations/saved/:id': 'editQuotation',
            'quotations/open': 'quotes',
        },
        initialize: function (application) {
            this.application = application
        },

        savedQuotation: function () {
            var collection = new QuotationsCollection();
            var view = new QuotationsListView({
                application: this.application,
                collection: collection
            });

            collection.fetch().done(function () {
                view.showContent();
            });
        },

        createQuotation: function () {
            var model = new QuotationsModel();
            var view = new QuotationsEditView({
                application: this.application,
                model: model
            });

            model.fetch({data: {internalid:"new"}}).done(function () {
                view.showContent();
            });
        }
        ,

        editQuotation: function (id) {
            //console.log("editQuotation "+id);
            var model = new QuotationsModel();
            var view = new QuotationsEditView({
                application: this.application,
                model: model
            });

            model.fetch({data: {internalid:id}}).done(function () {
                view.showContent();
            });
        }
    })
});