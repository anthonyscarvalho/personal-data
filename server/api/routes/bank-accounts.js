'use strict';
module.exports = function (app) {
	var controller = require('../controllers/c-bank-accounts');

	app.route(`/bank-accounts/view`).post(controller.view_filtered);
	
	app.route(`/bank-accounts/viewAll`).post(controller.view_all);

	app.route(`/bank-accounts/view/dash`).post(controller.view_dash);

	app.route(`/bank-accounts/edit/:id?`).post(controller.edit_record);

	app.route(`/bank-accounts/add`).post(controller.add_record);

	app.route(`/bank-accounts/update/:id`).put(controller.update_record);

	app.route(`/bank-accounts/delete/:id`).delete(controller.delete_record);

	app.route(`/bank-accounts/status/:id`).put(controller.update_status);
};
