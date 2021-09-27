'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-budget');

	app.route(`/budget/view`).post(controller.view_filtered);
	
	app.route(`/budget/viewAll`).post(controller.view_all);

	app.route(`/budget/dash`).post(controller.view_dash);

	app.route(`/budget/edit/:id?`).post(controller.edit_record);

	app.route(`/budget/add`).post(controller.add_record);

	app.route(`/budget/update/:id`).put(controller.update_record);

	app.route(`/budget/delete/:id`).delete(controller.delete_record);

	app.route(`/budget/status/:id`).put(controller.update_status);
};
