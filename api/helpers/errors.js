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

class InvalidCredentialsError extends Error {
	constructor() {
		super('Invalid user credentials');
		this.name = 'InvalidCredentials';
		this.status = 401;
	}
}

class InvalidDate extends Error {
	constructor() {
		super('Unable to parse date');
		this.name = 'InvalidDate';
		this.status = 422;
	}
}

class InvalidEmail extends Error {
	constructor(message) {
		super(message || 'Invalid email');
		this.name = 'InvalidEmail';
		this.status = 422;
	}
}

class InvalidAction extends Error {
	constructor(message) {
		super(message);
		this.name = 'InvalidAction';
		this.status = 403;
	}
}

class BadRequestError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || 'Bad Request';
		this.status = 400;
	}
}

class UnauthorizedError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || 'Unauthorized Request';
		this.status = 401;
	}
}

class ForbiddenError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || 'Forbidden Request';
		this.status = 403;
	}
}

// class NotFoundError extends Error {
// 	constructor(message, name) {
// 		super(message + ' not found');
// 		this.name = name || 'Resource Not Found';
// 		this.status = 404;
// 	}
// }

class ConflictError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || 'Conflict in Request';
		this.status = 409;
	}
}

class UnprocessableContentError extends Error {
	constructor(message, name) {
		super(message);
		this.name = name || 'Unprocessable Content';
		this.status = 422;
	}
}

class InternalServerError extends Error {
	constructor() {
		super('Server has encountered an unexpected condition');
		this.name = 'Internal Server Error';
		this.status = 500;
	}
}

module.exports = {
	NotFoundError,
	UserNotFoundError,
	HOANotFoundError,
	InvalidString,
	GuardNotFoundError,
	SameStatusError,
	InvalidCredentialsError,
	InvalidDate,
	InvalidEmail,
	InvalidAction,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    UnprocessableContentError,
    InternalServerError
};
