'use strict';

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
