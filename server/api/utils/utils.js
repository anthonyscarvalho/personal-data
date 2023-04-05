'use strict';
var ObjectID = require('mongodb').ObjectID;

exports.generateSlug = function (pInput) {
	let _slug = pInput.name;
	if (pInput.middleName !== null && pInput.middleName !== ``) {
		_slug += "_" + pInput.middleName;
	}
	if (pInput.middleName2 !== null && pInput.middleName2 !== ``) {
		_slug += "_" + pInput.middleName2;
	}
	if (pInput.middleName3 !== null && pInput.middleName3 !== ``) {
		_slug += "_" + pInput.middleName3;
	}
	if (pInput.surname !== null && pInput.surname !== ``) {
		_slug += "_" + pInput.surname;
	}

	return _slug;
}

exports.returnError = function (pMessage, pRes) {
	pRes.status(500).json({
		status: '01',
		totalRecords: null,
		data: null,
		message: pMessage
	});
}

exports.returnSuccess = function (pResult, pRes) {
	pRes.status(200).json(pResult);
}

exports.newResponse = function () {
	return {
		status: `00`,
		totalRecords: null,
		data: null,
		message: null
	};
}

exports.update_status = function (req, res, databaseModel) {
	let _response = new exports.newResponse();
	let {
		action
	} = req.body;
	if (!action) {
		return exports.returnError(`Bad data`, res);
	} else {
		databaseModel.updateOne({
			_id: ObjectID(req.params.id)
		}, {
			$set: {
				canceled: action,
				canceledDate: ((action === "true") ? new Date() : null)
			}
		}, {
			new: true
		}, function (err, pResults) {
			if (err) {
				return exports.returnError(`Can't count`, res);
			}
			if (pResults.acknowledged) {
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			return exports.returnSuccess(_response, res);
		});
	}
};

exports.delete_record = function (req, res, databaseModel) {
	let _response = new exports.newResponse();

	if (!req.params.id) {
		return exports.returnError(`Bad data`, res);
	} else {
		databaseModel.deleteOne({
			_id: ObjectID(req.params.id)
		}, function (err, pResults) {
			if (err) {
				res.send(err);
			}

			if (pResults.acknowledged) {
				_response.message = `Record updated`;
			} else {
				_response.status = `01`;
				_response.message = `Record not updated`;
			}

			return exports.returnSuccess(_response, res);
		});
	}
};
