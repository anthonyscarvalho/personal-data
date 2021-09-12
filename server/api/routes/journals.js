'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-journals');

	app.route(`/journals/view`).post(controller.view_all);

	app.route(`/journals/view/dash`).post(controller.view_dash);

	// app.route(`/journals/view/:id?`).post(controller.view_record);

	// app.route(`/journals/edit/:id?`).post(controller.edit_record);

	app.route(`/journals/add`).post(controller.add_record);

	app.route(`/journals/update/:id`).put(controller.update_record);

	app.route(`/journals/delete/:id`).delete(controller.delete_record);

	app.route(`/journals/status/:id`).put(controller.update_status);
};
