define('Quotations.Collection'
, [
    'Backbone'
  , 'Quotations.Model'
  , 'underscore'
  ]
, function
  (
    Backbone
  , QuotationsModel
  , _
  )
{
  'use strict';

  return Backbone.Collection.extend({
    model: QuotationsModel
  , url: _.getAbsoluteUrl('services/Quotations.Service.ss')
  });
});