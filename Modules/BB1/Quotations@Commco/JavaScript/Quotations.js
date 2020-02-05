define('Quotations', [
  'Quotations.Router'
], function (
  QuotationsRouter
) {
  'use strict';
  var MenuItems={}
  if (SC.isDevelopment) {
    MenuItems={
        name: _('Quotations').translate(),
        id: 'quotations',
        index: 0.5,
        children: [{
          id: 'createquotation',
          name: _('Create a Quotation').translate(),
          url: 'quotations/create',
          index: 1
        },{
          id: 'openquotation',
          name: _('Open Quotations').translate(),
          url: 'quotations/open',
          index: 2
        },{
          id: 'savedquotation',
          name: _('Saved Quotations').translate(),
          url: 'quotations/saved',
          index: 3
        }]
      };
  }
  return {
    MenuItems: MenuItems

    ,
    mountToApp: function (application) {
      return new QuotationsRouter(application);
    }
  };

});