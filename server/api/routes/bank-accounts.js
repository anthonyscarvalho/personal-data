'use strict';
module.exports = function (app, controller) {
	var baseUrl = '/bank-accounts';

	app.route(baseUrl + `/view`).post(controller.view);
	app.route(baseUrl + `/viewAll`).post(controller.view_all);
	app.route(baseUrl + `/view/dash`).post(controller.view_dash);
	app.route(baseUrl + `/edit/:id?`).post(controller.edit_record);
	app.route(baseUrl + `/add`).post(controller.add_record);
	app.route(baseUrl + `/get-default`).post(controller.get_default);
	app.route(baseUrl + `/update/:id`).put(controller.update_record);
	app.route(baseUrl + `/delete/:id`).delete(controller.delete_record);
	app.route(baseUrl + `/status/:id`).put(controller.update_status);
};
