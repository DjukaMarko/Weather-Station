export class UserConflictError extends Error {
    constructor(msg = "User already exists!") {
        super(msg);
        Object.setPrototypeOf(this, UserConflictError.prototype);
    }
}