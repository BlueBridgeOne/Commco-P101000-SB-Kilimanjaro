define('Quotations.Model', [
  'SC.Model'
], function (
  SCModel
) {
  'use strict';

  return SCModel.extend({
    name: 'Quotations',

    list: function () {
      var type = 'customrecord_bb1_draftquote';

      var filters = [
        new nlobjSearchFilter('custrecord_bb1_draftquote_customer', null, 'anyof', nlapiGetUser())
      ];

      var columns = [
        new nlobjSearchColumn('internalid'), new nlobjSearchColumn('created'), new nlobjSearchColumn('custrecord_bb1_draftquote_title'), new nlobjSearchColumn('custrecord_bb1_draftquote_customer'), new nlobjSearchColumn('custrecord_bb1_draftquote_location'), new nlobjSearchColumn('custrecord_bb1_draftquote_submitted'), new nlobjSearchColumn('custrecord_bb1_draftquote_submitteddate')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result) {
        // nlapiLogExecution('DEBUG', 'RESULT ' + result.getValue('name'));
        return {
          internalid: result.getValue('internalid'),
          created: result.getValue('created'),
          customer: result.getValue('custrecord_bb1_draftquote_customer'),
          location: result.getValue('custrecord_bb1_draftquote_location'),
          submitted: result.getValue('custrecord_bb1_draftquote_submitted'),
          submitteddate: result.getValue('custrecord_bb1_draftquote_submitteddate')
        };
      });
    },
    get: function (id) {
      var type = 'customrecord_bb1_draftquote';
      var rec = nlapiLoadRecord(type, id);

      var res={
        internalid: rec.getId(),
        created: rec.getFieldValue('created'),
        customer: rec.getFieldValue('custrecord_bb1_draftquote_customer'),
        location: rec.getFieldValue('custrecord_bb1_draftquote_location'),
        submitted: rec.getFieldValue('custrecord_bb1_draftquote_submitted'),
        submitteddate: rec.getFieldValue('custrecord_bb1_draftquote_submitteddate')
      };

      var numLines = currentRecord.getLineItemCount('customrecord_bb1_draftquoteline');
					var items = [],
						item;
					for (var i = 1; i <= numLines; i++) {

						item = {};
						item.internalid = currentRecord.getLineItemValue('customrecord_bb1_draftquoteline','customrecord_bb1_draftquoteline_item',i);
						item.displayname = currentRecord.getLineItemText('customrecord_bb1_draftquoteline','customrecord_bb1_draftquoteline_item',i);
						item.qty = currentRecord.getLineItemValue('customrecord_bb1_draftquoteline','customrecord_bb1_draftquoteline_qty',i);
						
						items.push(item);

          }
          res.items=items;

      return res;
    }

  });
});