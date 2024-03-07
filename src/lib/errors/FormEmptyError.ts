export class FormEmptyError extends Error {
    constructor(msg = 'All fields must be filled in!') {
        super(msg);
        Object.setPrototypeOf(this, FormEmptyError.prototype);
    }
}