'use strict';
module.exports = function (app, controller) {
	var baseUrl = '/utilities';

	app.route(baseUrl + `/documentUpload`).post(controller.documentUpload);
};
