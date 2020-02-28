define('Quotations.Details.View', [
  'Backbone', 'quotations_details.tpl'
], function (
  Backbone, quotations_details_tpl
) {
  'use strict';

  return Backbone.View.extend({
    template: quotations_details_tpl

      ,
    getContext: function () {
     
      return this.model;
    }
  })
});