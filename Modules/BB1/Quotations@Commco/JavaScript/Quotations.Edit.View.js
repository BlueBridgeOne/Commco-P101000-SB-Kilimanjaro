define('Quotations.Edit.View', [
  'Backbone', 'quotations_edit.tpl', 'Profile.Model'
], function (
  Backbone, quotations_edit_tpl, ProfileModel
) {
  'use strict';

  return Backbone.View.extend({
    template: quotations_edit_tpl,
    initialize: function (options) {
      this.application = options.application;
      this.profileModel = ProfileModel.getInstance();
      this._page = 0;
    },
    getSelectedMenu: function () {
      return 'quotations';
    },
    events: {
      // login error message could contain link to registration page
      'keyup #search': 'handleSearchChange',
      'click [data-match]': 'handleMatch',
      'click [data-action="plus"]': 'handlePlus',
      'click [data-action="minus"]': 'handleMinus',
      'click [data-action="add"]': 'handleAdd',
      'click [data-action="delete"]': 'handleDelete',
      'click [data-action="save"]': 'handleSave',
      'click [data-action="submit"]': 'handleSubmit',
      'change #title': 'handleChange',
      'change #location': 'handleChange',
      'change #programming': 'handleChange',
      'change #installation': 'handleChange',
      'change .row_item_quantity': 'handleChangeQuantity'
    },
    handleChangeQuantity: function (e) {
      var $input = $(e.target);
      var qty = $input.val();
      try {
        qty = parseInt(qty) || 1;
      } catch (e) {
        qty = 1;
      }
      if (qty < 1) {
        qty = 1;
      }
      $input.val(qty);

      var row = $input.closest("tr").attr("data-row");

      var items = this.model.get("items");
      var r = parseInt(row);
      items[r].qty = qty;
      items[r].total = this.numberWithCommas(parseFloat(items[r].rate) * parseFloat(items[r].qty));

      $input.closest("tr").find(".item_total").html(items[r].total);

    },
    handleChange: function (e) {

      var $this = $(e.target);
      var name = $this.attr("name");
      if (name == "title" || name == "location"|| name == "programming"|| name == "installation") {
        this.model.set(name, $this.val());
      }
    },
    handleSave: function (e, forceRender) {

      var id = this.model.get("internalid");
      var self = this;

      this.model.save({
        title: $("#title").val(),
        location: $("#location").val(),
        items: this.model.get("items")
      }, {
        wait: true,
        success: function (model, response) {
          console.log('Successfully saved! ' + forceRender);


          if (forceRender) {
            self.model.fetch().done(function () {
              self.render();
              if (id == "new") {
                Backbone.history.navigate('#quotations/saved/' + model.get("internalid"), {
                  trigger: false
                });
              }
              self.render();

            });
          } else {
            //response.internalid
            Backbone.history.navigate('#quotations/saved', {
              trigger: true
            });
          }

          //if(response.in)
        },
        error: function (model, error) {
          console.log(error.responseText);
        }
      });
    },
    handleSubmit: function (e) {
      //var id = this.model.get("internalid");
      var self = this;
      this.model.save({
        title: $("#title").val(),
        location: $("#location").val(),
        programming: $("#programming").val(),
        installation: $("#installation").val(),
        items: this.model.get("items"),
        submit: true
      }, {
        wait: true,
        success: function (model, response) {
          console.log('Successfully submitted!');
          if (response.quoteid) {
            //console.log(response);
            Backbone.history.navigate('#quotes/' + response.quoteid, {
              trigger: true
            });
          } else {
            self.model.fetch().done(function () {
              self.showContent();
            });
          }

        },
        error: function (model, error) {
          console.log(error.responseText);
        }
      });

    },
    handleAdd: function (e) {
      var $button = jQuery(e.target);
      var $input = $button.closest("div").find(".cart-item-summary-quantity-value");
      var qty = $input.val();
      var $search = jQuery("#search");
      var search = $search.val();
      try {
        qty = parseInt(qty) || 1;
      } catch (e) {
        qty = 1;
      }

      var choice = this.model.get("choice");
      var choiceItem;


      for (var i = 0; i < choice.length; i++) {
        if (this._item == choice[i].internalid.toString() || search == choice[i].itemText + " (" + choice[i].itemCode + ")") {
          choiceItem = choice[i];
          break;
        }
      }
      if (choiceItem) {
        //console.log("Add "+search);
        var items = this.model.get("items"),
          item = {};

        item.internalid = items.length;
        item.item = choiceItem.internalid;
        item.itemCode = choiceItem.itemCode;
        item.itemText = choiceItem.itemText;
        item.qty = qty;

        items.push(item);

        this.handleSave(null, true);

        //$search = jQuery("#search");
        //$search.focus();
      }

    },
    handleDelete: function (e) {
      var $button = jQuery(e.target);

      var row = $button.closest("tr").attr("data-row");
      if (row) {
        var items = this.model.get("items");
        items.splice(parseInt(row), 1);
        this.render();
        this.updateSubtotal();
      }
    },
    updateSubtotal: function () {
      var items = this.model.get("items") || [];
      var subtotal = 0,
        tax = 0,
        linetotal;
      for (var i = 0; i < items.length; i++) {
        if (!items[i].rate_message) {
          linetotal = (parseFloat(items[i].rate) * parseFloat(items[i].qty));
          subtotal += linetotal;
          tax += linetotal * parseFloat((items[i].taxrate || "20").split("%").join("")) / 100;
          items[i].total = this.numberWithCommas(linetotal);
        }
      }
      var subtotal = Math.ceil(100 * subtotal) / 100;
      var tax = Math.ceil(100 * tax) / 100;
      var total = subtotal + tax;

      document.getElementById("quote-subtotal").innerHTML = this.numberWithCommas(subtotal);
      document.getElementById("quote-tax").innerHTML = this.numberWithCommas(tax);
      document.getElementById("quote-total").innerHTML = this.numberWithCommas(total);
    },
    handleMinus: function (e) {
      var $button = jQuery(e.target);
      var $input = $button.closest("div,td").find(".cart-item-summary-quantity-value");
      var qty = $input.val();
      try {
        qty = parseInt(qty) || 1;
      } catch (e) {
        qty = 1;
      }
      qty--;
      if (qty < 1) {
        qty = 1;
      }
      $input.val(qty);

      var row = $button.closest("tr").attr("data-row");
      if (row) {
        var items = this.model.get("items");
        var r = parseInt(row);
        items[r].qty = qty;
        var linetotal = (parseFloat(items[r].rate) * parseFloat(items[r].qty))
        var tax = linetotal * parseFloat((items[r].taxrate || "20").split("%").join("")) / 100;

        items[r].total = this.numberWithCommas(linetotal + tax);
        $button.closest("tr").find(".item_total").html(items[r].total);
        this.updateSubtotal();
      }
    },
    handlePlus: function (e) {
      var $button = jQuery(e.target);
      var $input = $button.closest("div,td").find(".cart-item-summary-quantity-value");
      var qty = $input.val();
      try {
        qty = parseInt(qty) || 1;
      } catch (e) {
        qty = 1;
      }
      qty++;
      $input.val(qty);

      var row = $button.closest("tr").attr("data-row");
      if (row) {
        var items = this.model.get("items");
        var r = parseInt(row);
        items[r].qty = qty;
        var linetotal = (parseFloat(items[r].rate) * parseFloat(items[r].qty))
        var tax = linetotal * parseFloat((items[r].taxrate || "20").split("%").join("")) / 100;

        items[r].total = this.numberWithCommas(linetotal + tax);

        $button.closest("tr").find(".item_total").html(items[r].total);
        this.updateSubtotal();
      }
    },
    handleMatch: function (e) {
      var $match = jQuery(e.target);
      var $search = jQuery("#search");
      var match = $match.text();
      if (match.charAt(0) != "+") {
        $search.val(match);
        var $li = $match.closest("li");
        this._item = $li.attr("data-value");
        jQuery(".item-dropdown").hide();
      } else {
        this.handleSearchChange(null, this._page + 1);
      }
    },
    handleSearchChange: function (e, newPage) {
      this._page = newPage || 0, self = this;

      setTimeout(function () {

        var $search = jQuery("#search"),
          $this, match, found;

        var val = $search.val();
        if (val) {
          val = val.toLowerCase();
          var parts = [],
            word = "",
            char, lastAlpha;
          for (var i = 0; i < val.length; i++) {
            char = val.charAt(i);
            if (char.toUpperCase() != char) {
              if (!lastAlpha) {
                if (word.length > 0) {
                  parts.push(word);
                  word = "";
                }
              }
              word += char;
              lastAlpha = true;
            } else if ((char >= "0" && char <= "9") || char == ".") {
              if (lastAlpha) {
                if (word.length > 0) {
                  parts.push(word);
                  word = "";
                }
              }
              word += char;
              lastAlpha = false;
            } else {
              if (word.length > 0) {
                parts.push(word);
                word = "";
              }
            }
          }
          if (word.length > 0) {
            parts.push(word);
          }
          var count = 0,
            _page = self._page;
          jQuery(".item-dropdown>li").each(function () {
            $this = jQuery(this);
            found = parts.length > 0 && count < 10 + (_page * 10);

            match = $this.attr("data-match");
            if (found) {

              for (var i = 0; i < parts.length; i++) {
                if (match.indexOf(parts[i]) == -1) {
                  found = false;
                  break;
                }
              }
            }
            if ((found && count >= _page * 10) || (match == "more" && count == 10 + (_page * 10))) {
              $this.show();
              count++;
            } else if (found && count < _page * 10) {
              $this.hide();
              count++;
            } else {
              $this.hide();
            }

          });
          if (count == 0) {
            jQuery(".item-dropdown").hide();
          } else {
            jQuery(".item-dropdown").show();
          }
        } else {
          jQuery(".item-dropdown").hide();
          //hide;
        }
      }, 10);
    },
    numberWithCommas:function(x) {
      return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
    getContext: function () {
      // console.log(this.model);
      // console.log(this.model.get("title"));
      // return {
      //   title: this.model.get("title")
      // };

      var collection = this.profileModel.get('addresses');

      var location = this.model.get("location"),
        locations = [{
          internalid: 0,
          text: ""
        }];
      for (var i = 0; i < collection.length; i++) {
        locations.push({
          internalid: collection.models[i].get("internalid"),
          text: (collection.models[i].get("fullname") || "") + ", " + (collection.models[i].get("addr1") || "") + ", " + (collection.models[i].get("city") || "") + ", " + (collection.models[i].get("zip") || ""),
          selected: (collection.models[i].get("internalid") == location)
        });

      }
      var items = this.model.get("items") || [];
      var subtotal = 0,
        tax = 0,
        linetotal;
      for (var i = 0; i < items.length; i++) {
        if (!items[i].rate_message) {
          if (items[i].sup_cost) {
            items[i].rate = items[i].sup_cost;
            items[i].is_sup_cost = true;
          }
          linetotal = (parseFloat(items[i].rate) * parseFloat(items[i].qty));

          subtotal += linetotal;
          tax += linetotal * parseFloat((items[i].taxrate || "20").split("%").join("")) / 100;

          items[i].total = this.numberWithCommas(linetotal);
        }
      }
      var subtotal = Math.ceil(100 * subtotal) / 100;
      var tax = Math.ceil(100 * tax) / 100;
      var total = subtotal + tax;

      this.model.set("subtotal", this.numberWithCommas(subtotal));
      this.model.set("tax", this.numberWithCommas(tax));
      this.model.set("total", this.numberWithCommas(total));

      this.model.set("locations", locations);
      this.model.set("editable", !this.model.get("quotation"));
      var choice = this.model.get("choice");
      for (var i = 0; i < choice.length; i++) {
        choice[i].match = choice[i].itemText.toLowerCase() + " " + choice[i].itemCode.toLowerCase() + " " + choice[i].itemManu.toLowerCase();
      }
      return this.model;
    }
  })
});