define('DocumentLinks.Model'
, [
    'Backbone'
  , 'underscore'
  ]
, function
  (
    Backbone
  , _
  )
{
  'use strict';

  return Backbone.Model.extend({
    urlRoot: _.getAbsoluteUrl('services/DocumentLinks.Service.ss')
  });
});