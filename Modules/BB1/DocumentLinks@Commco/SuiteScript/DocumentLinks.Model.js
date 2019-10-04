define('DocumentLinks.Model'
, [
    'SC.Model'
  ]
, function
  (
    SCModel
  )
{
  'use strict';

  return SCModel.extend({
    name: 'DocumentLinks', 
    
    list: function ()
    {
      var type = 'customrecord_bb1_document_links';

      var filters = [
        new nlobjSearchFilter('custrecord_bb1_dc_owner', null, 'anyof', nlapiGetUser())
      ];

      var columns = [
        new nlobjSearchColumn('internalid')
      , new nlobjSearchColumn('name')
      , new nlobjSearchColumn('custrecord_bb1_dc_filetype')
      , new nlobjSearchColumn('custrecord_bb1_dc_link')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result) {
        nlapiLogExecution('DEBUG', 'RESULT ' + result.getValue('name'));
        return {
          internalid: result.getValue('internalid')
        , name: result.getValue('name')
        , filetype: result.getValue('custrecord_bb1_dc_filetype')
        , link: result.getValue('custrecord_bb1_dc_link')
        };
      });
    }

  });
});