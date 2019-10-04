define('DocumentLinks', [
  'DocumentLinks.Router'
], function (
  DocumentLinksRouter
) {
  'use strict';

  return {
    mountToApp: function (application) {
      return new DocumentLinksRouter(application);
    }
  }
});