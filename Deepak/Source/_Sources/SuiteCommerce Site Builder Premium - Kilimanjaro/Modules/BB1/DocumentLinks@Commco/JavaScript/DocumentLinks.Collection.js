define('DocumentLinks.Collection'
, [
    'Backbone'
  , 'DocumentLinks.Model'
  , 'underscore'
  ]
, function
  (
    Backbone
  , DocumentLinksModel
  , _
  )
{
  'use strict';

  return Backbone.Collection.extend({
    model: DocumentLinksModel
  , url: _.getAbsoluteUrl('services/DocumentLinks.Service.ss')
  });
});