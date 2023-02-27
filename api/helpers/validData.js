const { InvalidString, InvalidDate, InvalidEmail } = require('./errors');

const checkString = (str, property, canbeUndefined = false) => {
	if (canbeUndefined) return;

	if (typeof str !== 'string')
		throw new InvalidString(property + ' is not a string');

	if (!str) throw new InvalidString(property + ' is empty');
};

const isDate = (date) => {
	if (isNaN(new Date(date))) throw new InvalidDate();
	return new Date(date);
};

const checkDate = (fromDate, toDate) => {
	fromDate = isDate(fromDate);

	if (toDate) {
		toDate = isDate(toDate);

		if (fromDate > toDate) throw new InvalidDate();
	}
};

const checkEmail = (email) => {
	checkString(email, 'Email');

	if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
		throw new InvalidEmail();
};

const checkNumber = (n) => {
	if (typeof n === 'number' || n instanceof Number) return;

	throw new TypeError('Invalid Number');
};

module.exports = {
	checkString,
	checkDate,
	checkEmail,
	checkNumber
};
