define('DocumentLinks.List.View', [
  'Backbone', 'document_links_list.tpl', 'Backbone.CollectionView', 'DocumentLinks.Details.View'
], function (
  Backbone, document_links_list_tpl, CollectionView, DocumentLinksDetailsView
) {
  'use strict';

  return Backbone.View.extend({

    template: document_links_list_tpl,

    initialize: function (options) {
      this.application = options.application,
      this.collection = options.collection
    },

    childViews: {
      'DocumentLinks.Collection': function () {
        return new CollectionView({
          'childView': DocumentLinksDetailsView,
          'collection': this.collection,
          'viewsPerRow': 1
        })
      }
    }
    
  })
});