'use strict';
module.exports = function (app, controller) {
	var baseUrl = '/journals';

	app.route(baseUrl + `/view`).post(controller.view_all);
	app.route(baseUrl + `/view/dash`).post(controller.view_dash);
	// app.route(baseUrl+`/view/:id?`).post(controller.view_record);
	// app.route(baseUrl+`/edit/:id?`).post(controller.edit_record);
	app.route(baseUrl + `/add`).post(controller.add_record);
	app.route(baseUrl + `/update/:id`).put(controller.update_record);
	app.route(baseUrl + `/delete/:id`).delete(controller.delete_record);
	app.route(baseUrl + `/status/:id`).put(controller.update_status);
};
