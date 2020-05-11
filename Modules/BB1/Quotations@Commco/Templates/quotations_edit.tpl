<div class="profile-information">
        <h2 class="profile-information-header">
                {{#if editable}}Create a Quotation{{else}}Submitted Quotation{{/if}}</h2>
        <div data-type="alert-placeholder"></div>
        <section class="profile-information-row-fluid">
                <div class="profile-information-col">
                        <form class="contact_info">
                                {{#unless editable}}
                                <div class="profile-information-form-actions">
                                        <a href="#quotes/{{quotation}}" class="profile-information-button-cancel">View
                                                Quote</a>
                                </div>
                                {{/unless}}

                                <fieldset>
                                        <div class="profile-information-row" data-input="phone"
                                                data-validation="control-group"><label class="profile-information-label"
                                                        for="title"> Quotation Title <small
                                                                class="profile-information-input-required">*</small>
                                                </label>
                                                {{#if editable}}
                                                <p>Please give your quotation a title:</p>
                                                <div class="profile-information-group-form-controls"><input type="text"
                                                                class="profile-information-input-large" id="title"
                                                                name="title" data-type="text" value="{{title}}">
                                                </div>
                                                {{else}}
                                                <p>{{title}}</p>
                                                {{/if}}
                                        </div>
                                        <div class="profile-information-row" data-input="location"
                                                data-validation="control-group"><label class="profile-information-label"
                                                        for="location"> Office Location <small
                                                                class="profile-information-input-required">*</small>
                                                </label>
                                                {{#if editable}}
                                                <p>Please select one of your saved locations:</p>
                                                <div class="profile-information-group-form-controls"><select
                                                                class="profile-information-input-large" id="location"
                                                                name="location" data-type="text" value="{{location}}">
                                                                {{#each locations}}
                                                                <option value="{{internalid}}"
                                                                        {{#if selected}}selected{{/if}}>{{text}}
                                                                </option>
                                                                {{/each}}
                                                        </select>
                                                </div>
                                                {{else}}
                                                <p>{{#each locations}}

                                                        {{#if selected}}<p>{{text}}</p>{{/if}}

                                                        {{/each}}</p>
                                                {{/if}}
                                        </div>
                                        <div class="profile-information-row" data-input="installation"
                                                data-validation="control-group"><label class="profile-information-label"
                                                        for="title"> Do you require installation?</label>
                                                {{#if editable}}
                                                <input type="checkbox"
                                                                class="profile-information-input-large" id="installation"
                                                                name="installation" data-type="checkbox" {{#ifEquals installation 'T'}}checked{{/ifEquals}} value="T">
                                               
                                                {{else}}
                                                <p>{{#ifEquals installation 'T'}}Yes{{else}}No{{/ifEquals}}</p>
                                                {{/if}}
                                        </div>
                                        <div class="profile-information-row" data-input="programming"
                                                data-validation="control-group"><label class="profile-information-label"
                                                        for="title"> Do you require programming?</label>
                                                {{#if editable}}
                                                <input type="checkbox"
                                                                class="profile-information-input-large" id="programming"
                                                                name="programming" data-type="checkbox" {{#ifEquals programming 'T'}}checked{{/ifEquals}} value="T">
                                                
                                                {{else}}
                                                <p>{{#ifEquals programming 'T'}}Yes{{else}}No{{/ifEquals}}</p>
                                                {{/if}}
                                        </div>
                                        {{#if editable}}
                                        <ul class="profile-information-row" data-input="search"
                                                data-validation="control-group"><label class="profile-information-label"
                                                        for="search"> Item Search
                                                </label>
                                                <p>Which item(s) would you like to add?:</p>
                                                <div class="profile-information-group-form-controls"><input type="text"
                                                                class="profile-information-input-large" id="search"
                                                                name="search" autocomplete="off" data-type="text"
                                                                style="float:left;margin-right:10px;">

                                                        <button type="button" class="cart-item-summary-quantity-remove"
                                                                data-action="minus">-</button>
                                                        <input type="number" data-type="cart-item-quantity-input"
                                                                name="quantity" id="quantity-{{internalid}}"
                                                                class="cart-item-summary-quantity-value" value="1"
                                                                min="1" />
                                                        <button type="button" class="cart-item-summary-quantity-add"
                                                                data-action="plus">+</button>
                                                        <span style="width:10px;display:inline-block;"></span>
                                                        <button type="button" class="quotation-add"
                                                                data-action="add">Add</button>
                                                </div>
                                                <div>
                                                        <ul class="item-dropdown">
                                                                {{#each choice}}
                                                                <li data-value="{{internalid}}" data-match="{{match}}"
                                                                        class="menu-tree-node"><a
                                                                                class="menu-tree-node-item-anchor">{{itemManu}}: {{itemText}}
                                                                                ({{itemCode}})</a>
                                                                </li>
                                                                {{/each}}
                                                                <li data-match="more" class="menu-tree-node"><a
                                                                                class="menu-tree-node-item-anchor">+
                                                                                More...</a></li>
                                                        </ul>
                                                </div>
                                        </ul>
                                        {{/if}}
                </div>
                <br />
                <div class="profile-information-row" data-input="items" data-validation="control-group"><label
                                class="profile-information-label" for="search"> Items
                        </label>



                        <table class="order-history-list-recordviews-actionable-table">
                                <thead class="order-history-list-recordviews-actionable-header">
                                        <tr>
 <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Quantity</span></th>
                                                        <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Make</span></th>
                                                        <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Model</span></th>
                                                <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Descrption</span></th>
                                                        <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Unit Price</span></th>
                                                        <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>Total Price</span></th>
                                                         <th class="order-history-list-recordviews-actionable-title-header">
                                                        <span>&nbsp;</span></th>
                                                
                                               
                                        </tr>
                                </thead>
                                <tbody class="order-history-list">
                                        {{#each items}}

                                        <tr class="recordviews" data-row="{{@index}}">
 <td class="recordviews-quantity-row"> <span
                                                                class="recordviews-label">Quantity:<br /></span>
                                                        {{#if ../editable}}
                                                        <button type="button" class="cart-item-summary-quantity-remove"
                                                                data-action="minus">-</button>
                                                        <input type="number" data-type="cart-item-quantity-input"
                                                                name="quantity-{{@index}}" id="quantity-{{internalid}}"
                                                                class="cart-item-summary-quantity-value row_item_quantity" value="{{qty}}"
                                                                min="1" />
                                                        <button type="button" class="cart-item-summary-quantity-add"
                                                                data-action="plus">+</button>
                                                        {{else}}
                                                        <span class="recordviews-value">{{qty}}</span>
                                                        {{/if}}
                                                </td>
                                                <td> <span class="recordviews-label">Make:</span>
                                                        <span class="recordviews-value">{{itemManu}}</span>
                                                </td>
                                                <td> <span class="recordviews-label">Model:</span>
                                                        <span class="recordviews-value">{{itemCode}}</span>
                                                </td>
                                                <td> <span class="recordviews-label">Description:</span>
                                                        <span class="recordviews-value">{{itemText}}</span>
                                                </td>
                                                 <td> <span class="recordviews-label">Unit Price:</span>
                                                        <span class="recordviews-value">
                                                                {{#if rate_message}}
                                                                {{rate_message}}
                                                                {{else}}
                                                                {{../currencysymbol}}{{rate}}
                                                                {{/if}}
                                                        </span>
                                                </td>
                                                 <td> <span class="recordviews-label">Total Price:</span>
                                                        <span class="recordviews-value">{{#if rate_message}}
                                                                {{rate_message}}
                                                                {{else}}
                                                                {{../currencysymbol}}<span class="item_total">{{total}}</span>
                                                                {{/if}}</span>
                                                </td>
                                                <td class="recordviews-remove" > <span
                                                {{#if ../editable}}
                                                                class="recordviews-label">Remove:</span>
                                                        
                                                        
                                                        <button type="button" class="delete-input-button"
                                                                data-action="delete">&times;</button>
                                                        {{/if}}
                                                </td>
                                               


                                        </tr>
                                        {{/each}}
                                </tbody>
                        </table>

                </div>
                </fieldset>
                <table class="subtotal">
                <tr><td class="subtotal-label">Subtotal:</td><td>{{currencysymbol}}<span id="quote-subtotal">{{subtotal}}</span></td></tr>
                <tr><td class="subtotal-label">VAT:</td><td>{{currencysymbol}}<span id="quote-tax">{{tax}}</span></td></tr>
                <tr><td class="subtotal-label">Total:</td><td>{{currencysymbol}}<span id="quote-total">{{total}}</span></td></tr>
                </table>
                {{#if editable}}
                <div class="profile-information-form-actions">
                        <button type="button" class="profile-information-button-cancel" data-action="save">Save</button>
                        &nbsp;
                        <button type="button" class="profile-information-button-update" data-action="submit">Submit for
                                Approval</button>
                </div>
                {{/if}}
                <div style="clear:both;"></div>
                </form>
</div>
</section>
</div>