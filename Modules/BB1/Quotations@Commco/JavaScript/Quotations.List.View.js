define('Quotations.List.View', [
  'Backbone', 'quotations_list.tpl', 'Backbone.CollectionView', 'Quotations.Details.View'
], function (
  Backbone, quotations_list_tpl, CollectionView, QuotationsDetailsView
) {
  'use strict';

  return Backbone.View.extend({

    template: quotations_list_tpl,

    initialize: function (options) {
      this.application = options.application;
      this.collection = options.collection;
    },	getSelectedMenu: function ()
		{
			return 'quotations';
		},

    childViews: {
      'Quotations.Collection': function () {
        return new CollectionView({
          'childView': QuotationsDetailsView,
          'collection': this.collection,
          'viewsPerRow': 1
        })
      }
    }
    
  })
});