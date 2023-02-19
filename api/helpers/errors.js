class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = 'NotFoundError';
		this.status = 404;
	}
}

class UserNotFoundError extends NotFoundError {
	constructor() {
		super('Can not find user.');
		this.status = 401;
	}
}

class HOANotFoundError extends NotFoundError {
	constructor() {
		super('HOA not existing');
	}
}

class GuardNotFoundError extends NotFoundError {
	constructor() {
		super('User is not a guard of this HOA');
	}
}

class SameStatusError extends Error {
	constructor() {
		super('Unable to update the status with the same status');
		this.name = 'SameStatusError';
		this.status = 409;
	}
}

class InvalidString extends Error {
	constructor(message) {
		super(message);
		this.name = 'InvalidString';
		this.status = 422;
	}
}

module.exports = {
	NotFoundError,
	UserNotFoundError,
	HOANotFoundError,
	InvalidString,
	GuardNotFoundError,
    SameStatusError
};
