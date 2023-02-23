const { InvalidString, InvalidDate } = require('./errors');

const checkString = (str, property, canbeUndefined = false) => {
	if (canbeUndefined) return;

    if (typeof str !== 'string')
		throw new InvalidString(property + ' is not a string');

	if (!!str) throw new InvalidString(property + ' is empty');
};

const checkDate = (date) => {
	if (isNaN(new Date(date))) throw new InvalidDate();
};

module.exports = {
	checkString,
	checkDate
};
