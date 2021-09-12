'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-bank-account-records');

	app.route(`/bank-account-records/view/:id?`).post(controller.view_record);
	
	app.route(`/bank-account-records/filter`).post(controller.filter_record);

	app.route(`/bank-account-records/sum/:id?`).post(controller.sum_records);

	app.route(`/bank-account-records/edit/:id?`).post(controller.edit_record);

	app.route(`/bank-account-records/add`).post(controller.add_record);

	app.route(`/bank-account-records/update/:id`).put(controller.update_record);
	
	// app.route(`/bank-account-records/updateDate`).put(controller.update_date_record);

	app.route(`/bank-account-records/delete/:id`).delete(controller.delete_record);

	app.route(`/bank-account-records/status/:id`).put(controller.update_status);
};
