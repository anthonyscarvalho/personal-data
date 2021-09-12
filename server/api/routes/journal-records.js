'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-journal-records');

	app.route(`/journal-records/view`).post(controller.view_all);

	app.route(`/journal-records/view/dash`).post(controller.view_dash);

	// app.route(`/journal-records/view/:id?`).post(controller.view_record);
	
	app.route(`/journal-records/sum/:id?`).post(controller.sum_records);

	// app.route(`/journal-records/edit/:id?`).post(controller.edit_record);

	app.route(`/journal-records/add`).post(controller.add_record);

	app.route(`/journal-records/update/:id`).put(controller.update_record);

	app.route(`/journal-records/delete/:id`).delete(controller.delete_record);

	app.route(`/journal-records/status/:id`).put(controller.update_status);
};
