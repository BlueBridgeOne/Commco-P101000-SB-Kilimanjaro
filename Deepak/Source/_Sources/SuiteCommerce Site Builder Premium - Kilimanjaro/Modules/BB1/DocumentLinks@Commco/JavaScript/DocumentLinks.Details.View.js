define('DocumentLinks.Details.View'
, [
    'Backbone'
  , 'document_links_details.tpl'
  ]
, function
  (
    Backbone
  , document_links_details_tpl
  )
{
  'use strict';

  return Backbone.View.extend({
    template: document_links_details_tpl

  , getContext: function ()
    {
      return {
        'internalid': this.model.get('internalid')
      , 'title': this.model.get('title')
      , 'filetype': this.model.get('filetype')
      , 'link': this.model.get('link')
      }
    }
  })
});