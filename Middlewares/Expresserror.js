// Creating our own error class. 
class ExpressError extends Error{//hamari custom class hai isliye naam kuch bhi rakh sakte hai. This custom class extends in-built Js's Error class.
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

module.exports = ExpressError;