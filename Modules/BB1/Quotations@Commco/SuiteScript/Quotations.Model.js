define('Quotations.Model', [
  'SC.Model', 'Address.Model', 'Profile.Model', 'Tools'
], function (
  SCModel, AddressModel, ProfileModel, Tools
) {
  'use strict';

  return SCModel.extend({
    name: 'Quotations',

    list: function () {
      nlapiLogExecution("debug", "list quotes for " + nlapiGetUser());
      var type = 'customrecord_bb1_draftquote';

      var filters = [
        ['custrecord_bb1_draftquote_customer', 'anyof', nlapiGetUser()],
        "AND",
        ["custrecord_bb1_draftquote_quotation", "anyof", "@NONE@"]
      ];

      var columns = [
        new nlobjSearchColumn('internalid').setSort(false), new nlobjSearchColumn('created'), new nlobjSearchColumn('name'), new nlobjSearchColumn('custrecord_bb1_draftquote_customer'), new nlobjSearchColumn('custrecord_bb1_draftquote_location'), new nlobjSearchColumn('custrecord_bb1_draftquote_quotation')
      ];

      var search = nlapiSearchRecord(type, null, filters, columns);

      return _.map(search, function (result) {
        // nlapiLogExecution('DEBUG', 'RESULT ' + result.getValue('name'));
        return {
          internalid: result.getValue('internalid'),
          created: nlapiStringToDate(result.getValue('created')).toDateString(),
          title: result.getValue('name'),
          customer: result.getValue('custrecord_bb1_draftquote_customer'),
          location: result.getValue('custrecord_bb1_draftquote_location'),
          quotation: result.getValue('custrecord_bb1_draftquote_quotation')
        };
      });
    },
    get: function (id) {
      nlapiLogExecution("debug", "get quote for " + id + " " + nlapiGetUser());
      var type = 'customrecord_bb1_draftquote';
      var res, items = [];
      if (id == "new") {
        res = {
          internalid: "new",
          created: new Date().toDateString(),
          title: "New Quotation",
          customer: nlapiGetUser(),
          location: 0
        };
      } else {
        var rec = nlapiLoadRecord(type, id);

        res = {
          internalid: rec.getId(),
          created: new Date(rec.getFieldValue('created')).toDateString(),
          title: rec.getFieldValue('name'),
          customer: rec.getFieldValue('custrecord_bb1_draftquote_customer'),
          location: rec.getFieldValue('custrecord_bb1_draftquote_location'),
          quotation: rec.getFieldValue('custrecord_bb1_draftquote_quotation'),
          installation: rec.getFieldValue('custrecord_bb1_draftquote_installation'),
          programming: rec.getFieldValue('custrecord_bb1_draftquote_programming')
        };

        var item, sres;

        var customrecord_bb1_draftquotelineSearch = nlapiSearchRecord("customrecord_bb1_draftquoteline", null,
          [
            ["custrecord_bb1_draftquotationline_quot", "anyof", id]
          ],
          [
            new nlobjSearchColumn("custrecord_bb1_draftquotationline_item"),
            new nlobjSearchColumn("custrecord_bb1_draftquotationline_qty"),
            new nlobjSearchColumn("salesdescription", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM", null),
            new nlobjSearchColumn("cseg_bb1_manufactur", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM", null),
            new nlobjSearchColumn("displayname", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM", null),
            new nlobjSearchColumn("type", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM", null)
          ]
        );

        var SO = nlapiCreateRecord("estimate", {
          recordmode: 'dynamic',
          entity: nlapiGetUser()
        });
        res.currencyname = SO.getFieldValue("currencyname");
        res.currencysymbol = "£";
        switch (res.currencyname) {
          case "USD":
            res.currencysymbol = "$";
            break;
          case "EUR":
            res.currencysymbol = "€";
            break;
        }
        //get item details and prices using a dynamic so.
        if (customrecord_bb1_draftquotelineSearch) {
          var itemLookup = [];
          for (var i = 0; i < customrecord_bb1_draftquotelineSearch.length; i++) {
            sres = customrecord_bb1_draftquotelineSearch[i];
            item = {};
            item.internalid = i + 1;
            item.item = sres.getValue('custrecord_bb1_draftquotationline_item');
            item.itemCode = sres.getValue("displayname", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM");
            item.itemText = sres.getValue("salesdescription", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM");
            item.itemManu = sres.getText("cseg_bb1_manufactur", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM");
            item.itemType = sres.getValue("type", "CUSTRECORD_BB1_DRAFTQUOTATIONLINE_ITEM");
            item.qty = sres.getValue('custrecord_bb1_draftquotationline_qty');

            itemLookup.push(item.item);

            try {

              SO.selectNewLineItem("item");
              SO.setCurrentLineItemValue('item', 'item', item.item);
              SO.setCurrentLineItemValue('item', 'quantity', 1);
              SO.commitLineItem('item', false);

              item.rate = SO.getLineItemValue('item', 'rate', i + 1);
              item.taxrate = SO.getLineItemValue('item', 'taxrate1', i + 1);
              //item.sup_cost = SO.getLineItemValue('item', 'custcol_bb1_supp_sup_cost', i + 1);
              //item.porate = SO.getLineItemValue('item', 'porate', i + 1);


            } catch (err) {
              item.rate_message = "Submit for Price";
            }
            items.push(item);

          }


          //lookup supplier costs.
          var customrecord_bb1_sup_pricesSearch = nlapiSearchRecord("customrecord_bb1_sup_prices", null,
            [
              ["custrecord_bb1_sp_cust", "anyof", nlapiGetUser()],
              "AND",
              ["custrecord_bb1_sp_item", "anyof", itemLookup]
            ],
            [
              new nlobjSearchColumn("custrecord_bb1_supp_sup_cost"),
              new nlobjSearchColumn("custrecord_bb1_sp_item")
            ]
          );

          if (customrecord_bb1_sup_pricesSearch) {
            var sup_item;
            for (var i = 0; i < customrecord_bb1_sup_pricesSearch.length; i++) {
              sres = customrecord_bb1_sup_pricesSearch[i];
              sup_item = sres.getValue('custrecord_bb1_sp_item');
              for (var j = 0; j < items.length; j++) {
                if (items[j].item == sup_item) {
                  items[j].sup_cost = sres.getValue('custrecord_bb1_supp_sup_cost');
                }
              }

            }
          }
        }
      }
      res.items = items;
      res.choice = [];


      var filter = [
        ["internalidnumber", "greaterthan", 0],
        "AND",
        ["isinactive", "is", "F"]
      ];

      // ,
      //   "AND",
      //   ["type", "anyof", "InvtPart"]
      // ,
      //   "AND",
      //   ["matrixchild", "is", "F"]

      var find = [];
      var internalid = new nlobjSearchColumn('internalid').setSort(false); //
      find.push(internalid);
      find.push(new nlobjSearchColumn("itemid"));
      find.push(new nlobjSearchColumn("salesdescription"));
      find.push(new nlobjSearchColumn("displayname"));
      find.push(new nlobjSearchColumn("cseg_bb1_manufactur"));

      //find[0].setSort();


      var itemSearch = nlapiSearchRecord("item", null,
        filter,
        find
      );
      var iresult;
      if (itemSearch) {


        do {
          if (!itemSearch) {
            break;
          }

          var lastid;
          for (var j in itemSearch) {
            iresult = itemSearch[j];
            if (iresult.getValue("displayname")) {
              res.choice.push({
                internalid: iresult.getId(),
                itemText: iresult.getValue("salesdescription"),
                itemCode: iresult.getValue("displayname"),
                itemManu: iresult.getText("cseg_bb1_manufactur")
              });
            }
            lastid = iresult.getValue("internalid");
          }
          //nlapiLogExecution("debug","itemSearch.length",itemSearch.length);
          

          filter[0] = ["internalidnumber", "greaterthan", lastid];
          itemSearch = nlapiSearchRecord("item", null,
            filter,
            find
          );
        } while (true);
      }

      res.choice.sort(function (a, b) {
        return a.itemCode.localeCompare(b.itemCode);
      });

      return res;
    },
    put: function (data) {

      nlapiLogExecution("debug", "put quote for " + data.internalid + " " + nlapiGetUser());
      //nlapiLogExecution("debug","data",JSON.stringify(data));
      var type = 'customrecord_bb1_draftquote';
      var rec;
      if (data.internalid == "new") {
        rec = nlapiCreateRecord(type);
        rec.setFieldValue("custrecord_bb1_draftquote_customer", nlapiGetUser());
        rec.setFieldValue("name", data.title);
        data.internalid = nlapiSubmitRecord(rec);
      }
      rec = nlapiLoadRecord(type, data.internalid);

      var custrecord_bb1_draftquote_quotation = rec.getFieldValue("custrecord_bb1_draftquote_quotation");
      if (custrecord_bb1_draftquote_quotation) {
        throw (new Error("This quotation has already been submitted."));
      }

      if (!data.installation) {
        data.installation = "F";
      }
      if (!data.programming) {
        data.programming = "F";
      }

      rec.setFieldValue("name", data.title);
      rec.setFieldValue("custrecord_bb1_draftquote_location", data.location);

      rec.setFieldValue("custrecord_bb1_draftquote_installation", data.installation);
      rec.setFieldValue("custrecord_bb1_draftquote_programming", data.programming);

      nlapiSubmitRecord(rec, false, true);

      //existing items:

      var items = [],
        hitems = {},
        item, sres;

      var customrecord_bb1_draftquotelineSearch = nlapiSearchRecord("customrecord_bb1_draftquoteline", null,
        [
          ["custrecord_bb1_draftquotationline_quot", "anyof", data.internalid]
        ],
        [
          new nlobjSearchColumn("custrecord_bb1_draftquotationline_item"),
          new nlobjSearchColumn("custrecord_bb1_draftquotationline_qty")
        ]
      );
      if (customrecord_bb1_draftquotelineSearch) {
        for (var i = 0; i < customrecord_bb1_draftquotelineSearch.length; i++) {
          sres = customrecord_bb1_draftquotelineSearch[i];
          item = {};
          item.internalid = sres.getId();
          item.item = sres.getValue('custrecord_bb1_draftquotationline_item');
          item.qty = sres.getValue('custrecord_bb1_draftquotationline_qty');

          if (hitems[item.item]) {
            nlapiDeleteRecord("customrecord_bb1_draftquoteline", sres.getId());
            body += "Delete record " + sres.getId() + "\r\n";
          } else {
            items.push(item);
            hitems[item.item] = item;
          }
        }
        // nlapiLogExecution("debug","Existing items "+JSON.stringify(hitems));
      }
      var body = JSON.stringify(hitems) + '\r\n';

      for (var i = 0; i < data.items.length; i++) {
        body += "add " + data.items[i].item + ' ' + hitems[data.items[i].item] + '\r\n';
        if (hitems[data.items[i].item]) { //Record exists!

          item = hitems[data.items[i].item];
          delete hitems[data.items[i].item];
          data.items[i].found = true;
          //nlapiLogExecution("debug","Existing items "+data.items[i].item+" qty="+item.qty+" to "+data.items[i].qty);
          if (item.qty != data.items[i].qty) {
            nlapiSubmitField("customrecord_bb1_draftquoteline", item.internalid, 'custrecord_bb1_draftquotationline_qty', data.items[i].qty);
          }
        }
      }
      for (var i in hitems) { //These leftover rows need to be deleted.
        nlapiDeleteRecord("customrecord_bb1_draftquoteline", hitems[i].internalid);
        body += "Delete record " + hitems[i].internalid + "\r\n";
      }
      for (var i = 0; i < data.items.length; i++) { //These new rows need to be created.
        if (!data.items[i].found) {
          body += "Create record " + data.items[i].item + "\r\n";
          var newRow = nlapiCreateRecord("customrecord_bb1_draftquoteline");
          newRow.setFieldValue("custrecord_bb1_draftquotationline_quot", data.internalid);
          newRow.setFieldValue("custrecord_bb1_draftquotationline_item", data.items[i].item);
          newRow.setFieldValue("custrecord_bb1_draftquotationline_qty", data.items[i].qty);
          nlapiSubmitRecord(newRow);
        }
      }

      if (data.submit) { //This draft has been submitted, so create a real quote.

        var addresses = AddressModel.list();
        var location = parseInt(data.location);
        if (!location > 0) {
          throw (new Error("Please set a location."));
        }
        var address;
        for (var i = 0; i < addresses.length; i++) {
          if (addresses[i].internalid == location) {
            address = addresses[i];
          }
        }
        if (!address) {
          throw (new Error("That location could not be found. Please select another location or update your address book."));
        }

        var quote = nlapiCreateRecord("estimate", {
          recordmode: 'dynamic'
        });
        quote.setFieldValue("entity", nlapiGetUser());
        quote.setFieldValue("title", data.title);
        quote.setFieldValue("memo", "Created from web portal.");
        quote.setFieldValue("custbody_bb1_sales_category", 6);
        quote.setFieldValue("custbody_bb1_qu_installation", data.installation);
        quote.setFieldValue("custbody_bb1_qu_programming", data.programming);
        quote.setFieldValue("entitystatus", 29);


        var prefix;
        for (var i = 0; i < 2; i++) {
          prefix = i == 0 ? "bill" : "ship";

          quote.setFieldValue(prefix + 'country', address.country || "");

          quote.setFieldValue(prefix + 'isresidential', address.isresidential);

          quote.setFieldValue(prefix + 'attention', address.fullname || "");

          quote.setFieldValue(prefix + 'addressee', address.company || "");

          quote.setFieldValue(prefix + 'addrphone', address.phone || "");

          quote.setFieldValue(prefix + 'addr1', address.addr1 || "");

          quote.setFieldValue(prefix + 'addr2', address.addr2 || "");

          quote.setFieldValue(prefix + 'city', address.city || "");

          quote.setFieldValue(prefix + 'state', address.state || "");

          quote.setFieldValue(prefix + 'zip', address.zip || "");

        }


        if (address.country == "GB") {
          quote.setFieldValue("class", 1);
        } else {
          quote.setFieldValue("class", 2);
        }


        // throw (new Error(location + " " + JSON.stringify(address)));


        for (var i = 0; i < data.items.length; i++) {
          quote.selectNewLineItem("item");
          quote.setCurrentLineItemValue('item', 'item', data.items[i].item);
          quote.setCurrentLineItemValue('item', 'quantity', data.items[i].qty);
          quote.commitLineItem('item');

        }


        var quoteid = nlapiSubmitRecord(quote);

        //   rec.setFieldValue("custrecord_bb1_draftquote_quotation", quoteid);

        // nlapiSubmitRecord(rec, false, true);

        nlapiSubmitField("customrecord_bb1_draftquote", data.internalid, 'custrecord_bb1_draftquote_quotation', quoteid);

        var profile = ProfileModel.get();

        var params = [{
          name: "Company",
          value: profile.companyname
        }, {
          name: "E-Mail",
          value: profile.email,
          href: "mailto:" + profile.email + "?subject=re: " + data.title
        }];
        if (data.phone) {
          params.push({
            name: "Phone Number",
            value: data.phone,
            href: "tel:" + data.phone
          });
        }
        var reply;
        params.push({
          name: "Customer",
          value: "View in NetSuite",
          href: "https://system.eu2.netsuite.com" + nlapiResolveURL('RECORD', 'customer', nlapiGetUser())
        });

        // if (caseID) {
        params.push({
          name: "Quotation",
          value: "View in NetSuite",
          href: "https://system.eu2.netsuite.com" + nlapiResolveURL('RECORD', 'estimate', quoteid)
        });

        //   reply = "https://system.eu2.netsuite.com" + nlapiResolveURL('RECORD', 'supportcase', caseID, "EDIT");
        // }

        Tools.emailAlert(845, nlapiGetUser(), "New Quotation", data.title, "A new quotation has been submitted from the web portal.", params, reply);

        return {
          internalid: data.internalid,
          quoteid: quoteid
        };
      }

      return {
        internalid: data.internalid
      };
    }

  });
});