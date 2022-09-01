'use strict';
module.exports = function (app, controller) {
	var baseUrl = '/bank-account-records';

	app.route(baseUrl + `/view/:id?`).post(controller.view_record);
	app.route(baseUrl + `/filter`).post(controller.filter_record);
	app.route(baseUrl + `/sum/:id?`).post(controller.sum_records);
	app.route(baseUrl + `/edit/:id?`).post(controller.edit_record);
	app.route(baseUrl + `/add`).post(controller.add_record);
	app.route(baseUrl + `/update/:id`).put(controller.update_record);
	// app.route(baseUrl+`/updateDate`).put(controller.update_date_record);
	app.route(baseUrl + `/delete/:id`).delete(controller.delete_record);
	app.route(baseUrl + `/status/:id`).put(controller.update_status);
	app.route(baseUrl + `/last-record/:id`).post(controller.last_record);
	app.route(baseUrl + `/fix-order`).post(controller.fix_order);
	app.route(baseUrl + `/budget/:id`).post(controller.budget);
	app.route(baseUrl + `/budget-search/`).post(controller.budget_search);
	app.route(baseUrl + `/add-to-budget/`).post(controller.add_to_budget);
	app.route(baseUrl + `/budget-dash-item`).post(controller.view_dashItem);
	app.route(baseUrl + `/remove-from-budget/`).post(controller.remove_from_budget);
};
