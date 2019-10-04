define('Careers.Model', [
  'SC.Model'
], function (
  SCModel
) {
  'use strict';

  return SCModel.extend({
    name: 'Careers',

    list: function () {
      var type = 'customrecord_bb1_careers';

      var filters = [
        new nlobjSearchFilter('isinactive', null, 'is', 'F')
      ];

      var columns = [
        new nlobjSearchColumn('internalid'), new nlobjSearchColumn('name'), new nlobjSearchColumn('custrecord_bb1_careers_job_description'), new nlobjSearchColumn('custrecord_bb1_careers_salary'), new nlobjSearchColumn('custrecord_bb1_careers_location')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result) {
        nlapiLogExecution('DEBUG', 'RESULT ' + result.getValue('name'));
        return {
          internalid: result.getValue('internalid'),
          name: result.getValue('name'),
          description: result.getValue('custrecord_bb1_careers_job_description'),
          location: result.getValue('custrecord_bb1_careers_location'),
          salary: result.getValue('custrecord_bb1_careers_salary')
        };
      });
    },
    get: function (id) {
      var type = 'customrecord_bb1_careers';

      var filters = [
        ["isinactive","is","F"], 
      "AND", 
      ["internalid","anyof",id]
      ];

      var columns = [
        new nlobjSearchColumn('internalid'), new nlobjSearchColumn('name'), new nlobjSearchColumn('custrecord_bb1_careers_job_description'), new nlobjSearchColumn('custrecord_bb1_careers_salary'), new nlobjSearchColumn('custrecord_bb1_careers_location')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);
      return _.map(search, function (result) {
        nlapiLogExecution('DEBUG', 'RESULT ' + result.getValue('name'));
        return {
          internalid: result.getValue('internalid'),
          name: result.getValue('name'),
          description: result.getValue('custrecord_bb1_careers_job_description'),
          location: result.getValue('custrecord_bb1_careers_location'),
          salary: result.getValue('custrecord_bb1_careers_salary')
        };
      });
      
    }

  });
});