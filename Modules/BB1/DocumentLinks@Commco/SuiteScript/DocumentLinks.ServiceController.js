define('DocumentLinks.ServiceController'
, [
    'ServiceController'
  , 'DocumentLinks.Model'
  ]
, function
  (
    ServiceController
  , DocumentLinksModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'DocumentLinks.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return id ? DocumentLinksModel.get(id) : DocumentLinksModel.list()
    }
  })
});