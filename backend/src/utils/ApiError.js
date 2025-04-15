class ApiError extends Error {
    constructor(
        code,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.code = code;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };