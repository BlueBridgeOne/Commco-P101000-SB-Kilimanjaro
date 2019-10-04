define('Careers.ServiceController'
, [
    'ServiceController'
  , 'Careers.Model'
  ]
, function
  (
    ServiceController
  , CareersModel
  )
{
  'use strict';

  return ServiceController.extend({
    name: 'Careers.ServiceController'

  , get: function ()
    {
      var id = this.request.getParameter('id');
      return id ? CareersModel.get(id) : CareersModel.list()
    }
  })
});