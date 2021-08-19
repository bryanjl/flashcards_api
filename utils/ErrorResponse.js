class ErrorResponse extends Error {
    //create a class so we can add our new error message to Error Object
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;