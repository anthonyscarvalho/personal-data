const moment = require('moment');

export const DATE_HELPER = {
	getLastDayOfMonth: (year, month) => {
		return new Date(year, month, 0).getDate()
	},
	isDateGreaterThanDate: (pStartDate, pEndDate) => {
		const date1 = new Date(pStartDate);
		const date2 = new Date(pEndDate);
		return date1 > date2;
	},
	formatToLocaleDateString: (date) => {
		return new Date(date).toLocaleDateString();
	},
	formatToLocaleString: (date) => {
		return new Date(date).toLocaleString();
	},
	formatToDayMonth: (date) => {
		return new Date(date).toLocaleDateString(('EN'), {
			weekday: 'short', day: 'numeric', month: 'short'
		});
	},
	formatDate: (pDate, pFormat = 'YYYY-MM-DD') => {
		return moment(pDate).format(pFormat);
	},
	addMonthsToCurrentDate: (pMonthsToAdd) => {
		return moment(new Date()).add(pMonthsToAdd, 'M');
	}
}
