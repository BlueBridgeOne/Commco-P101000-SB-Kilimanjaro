/*
	© 2017 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// @module Overview
// Defines the Overview module (Router)
define('Overview', [
	'Overview.Router', 'underscore', 'Utils'
], function (
	Router, _
) {
	'use strict';

	// @class Overview @extends ApplicationModule
	var OverviewModule = {
		MenuItems: [
				function (application) {
					if (_.isPhoneDevice()) {
						return {
							id: 'home',
							name: _('My Account').translate(),
							index: 0,
							children: [{
								id: 'details',
								name: _('Overview').translate(),
								url: 'overview',
								index: 1
							}, {
								parent: 'cases',
								id: 'logout',
								name: _('Logout').translate(),
								url: SC.SESSION.touchpoints.logout.substring(1),
								index: 3,
								"navigation":"ignore-click"
							}]
						};
					} else {
						return {
							id: 'home',
							name: _('Overview').translate(),
							url: 'overview',
							index: 0
						};
					}
				}
			]

			,
		mountToApp: function (application) {
			// default behavior for mount to app
			return new Router(application);
		}
	};

	return OverviewModule;
});