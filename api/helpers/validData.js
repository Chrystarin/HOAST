const { InvalidString } = require('./errors');

const checkString = (str, property, canbeUndefined = false) => {
	if (canbeUndefined) return;

	if (!!str) throw new InvalidString(property + ' is empty');

	if (typeof str !== 'string')
		throw new InvalidString(property + ' is not a string');
};

module.exports = {
	checkString
};
