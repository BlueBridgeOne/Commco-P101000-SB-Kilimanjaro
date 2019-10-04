/**
 * Project : P101000
 * 
 * Description : When a lead is created from the website, clear the financial.
 * Also tag on a bit of script to fix the salutaion issue for online forms.
 * 
 * @Author : Gordon Truslove
 * @Date   : 7/19/2019, 9:34:29 AM
 * 
 * Copyright (c) 2017 BlueBridge One Business Solutions, All Rights Reserved
 * support@bluebridgeone.com, +44 (0)1932 300007
 * 
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/runtime'],

function(record, runtime) {
   
    

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {
    
        
           if (scriptContext.type == scriptContext.UserEventType.DELETE) return;
           var currentRecord = scriptContext.newRecord;
            
    	        var webLead=currentRecord.getValue({
                    fieldId: 'weblead'
                });
                //log.error("start",scriptContext.type+" "+runtime.executionContext+" "+webLead );
        if (scriptContext.type == "create" &&webLead=="T") {

            try{ //Can get to the saluation field so attempt to copy over an intermediate field from any input forms.
            var custentity_bb1_salutation=currentRecord.getText({
                fieldId: 'custentity_bb1_salutation'
            });
            currentRecord.setText({
                fieldId: 'salutation',
                value: custentity_bb1_salutation,
                ignoreFieldChange: true
            });
        }catch(err){

        }
            
            currentRecord.setValue({
                fieldId: 'pricelevel',
                value: 5,
                ignoreFieldChange: true
            });
            currentRecord.setValue({
                fieldId: 'terms',
                value: "",
                ignoreFieldChange: true
            });
        
        }


    }

    return {
        beforeSubmit: beforeSubmit
    };
    
});

