define('Quotations.ServiceController'
, [
    'ServiceController'
  , 'Quotations.Model'
  ]
, function
  (
    ServiceController
  , QuotationsModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'Quotations.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('internalid');
      return id ? QuotationsModel.get(id) : QuotationsModel.list()
    }
  })
});