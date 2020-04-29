export const TYPEOF = function (value) {
	if (value === null) {
		return value;
	}
	if (typeof value === 'undefined') {
		return 'undefined';
	}
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
