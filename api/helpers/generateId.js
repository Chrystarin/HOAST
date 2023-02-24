const { Buffer } = require('buffer');
const { randomFillSync } = require('crypto');

const _alphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/**
 * Converts any given number to a buffer with hex values
 *
 * @param {number} n Number to convert to hex
 * @returns {Buffer}
 */
const toHexBuffer = (n) => {
	let hexN = n.toString(16);
	hexN = (hexN.length % 2 == 0 ? '' : '0') + hexN;

	return Buffer.from(hexN.match(/.{2}/g).map((b) => parseInt('0x' + b)));
};

/**
 * Converts the given buffer to a string
 *
 * @param {Buffer} buffer Buffer to convert to string
 * @returns {string}
 */
const bufferToString = (buffer) => {
	let id = '';
	for (let b of buffer) {
		id += _alphabet[b & 63];
	}
	return id;
};

/**
 * Generates a buffer with random values
 *
 * @returns {Buffer}
 */
const randomBuffer = () => {
	const pool = Buffer.allocUnsafe(8);
	randomFillSync(pool);

	return pool;
};

let hoaNonce = 0;
/**
 * Generates a unique id exclusive for HOAs
 *
 * @returns {string}
 */
const genHoaId = () => {
	return bufferToString(
		Buffer.concat([
			randomBuffer(),
			toHexBuffer(++hoaNonce),
			toHexBuffer(Date.now())
		])
	);
};

let userNonce = 0;
/**
 * Generates a unique id exclusive for Users
 *
 * @returns {string}
 */
const genUserId = () => {
	return bufferToString(
		Buffer.concat([
			randomBuffer(),
			toHexBuffer(++userNonce),
			toHexBuffer(Date.now())
		])
	);
};

let visitorNonce = 0;
/**
 * Generates a unique id exclusive for Visitors
 *
 * @returns {string}
 */
const genVisitorId = () => {
	return bufferToString(
		Buffer.concat([
			randomBuffer(),
			toHexBuffer(++visitorNonce),
			toHexBuffer(Date.now())
		])
	);
};

let logNonce = 0;
/**
 * Generates a unique id exclusive for Logs
 *
 * @returns {string}
 */
const genLogId = () => {
	return bufferToString(
		Buffer.concat([
			randomBuffer(),
			toHexBuffer(++logNonce),
			toHexBuffer(Date.now())
		])
	);
};

let dueNonce = 0;
/**
 * Generates a unique id exclusive for Dues
 *
 * @returns {string}
 */
const genDueId = () => {
	return bufferToString(
		Buffer.concat([
			randomBuffer(),
			toHexBuffer(++dueNonce),
			toHexBuffer(Date.now())
		])
	);
};

module.exports = {
	genHoaId,
	genUserId,
	genVisitorId,
	genLogId,
	genDueId
};
