'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-contacts');

	// app.route(`/contacts/view`).post(controller.view_all);

	app.route(`/contacts/view/dash`).post(controller.view_dash);

	app.route(`/contacts/edit/:id?`).post(controller.edit_record);

	app.route(`/contacts/add`).post(controller.add_record);

	app.route(`/contacts/update/:id`).put(controller.update_record);

	app.route(`/contacts/delete/:id`).delete(controller.delete_record);

	app.route(`/contacts/status/:id`).put(controller.update_status);
};
