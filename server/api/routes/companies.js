'use strict';
module.exports = function (app, controller) {
	var baseUrl = '/companies';

	app.route(baseUrl+ `/view`).post(controller.view);
	app.route(baseUrl+ `/view-active`).post(controller.view_active);
	// app.route(baseUrl + `/view/dash`).post(controller.dash);
	app.route(baseUrl + `/edit/:id?`).post(controller.edit);
	app.route(baseUrl + `/add`).post(controller.add);
	app.route(baseUrl + `/update/:id`).put(controller.update);
	app.route(baseUrl + `/delete/:id`).delete(controller.delete);
	app.route(baseUrl + `/status/:id`).put(controller.status);
};
