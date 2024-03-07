export class PasswordMismatchError extends Error {
    constructor(msg = 'Passwords do not match!') {
        super(msg);
        Object.setPrototypeOf(this, PasswordMismatchError.prototype);
    }
}