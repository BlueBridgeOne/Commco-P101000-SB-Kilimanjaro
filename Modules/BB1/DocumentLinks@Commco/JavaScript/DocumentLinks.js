define('DocumentLinks', [
  'DocumentLinks.Router'
], function (
  DocumentLinksRouter
) {
  'use strict';
  return {
    MenuItems: {
      name: _('Documents').translate(),
      id: 'documents',
      index: 3,
      children: [{
        id: 'document',
        name: _('Links').translate(),
        url: 'documentlinks',
        index: 1
      }]
    }

    ,
    mountToApp: function (application) {
      return new DocumentLinksRouter(application);
    }
  };

});