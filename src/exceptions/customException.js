const { uuid } = require('../middleware/uuid');

class CustomException extends Error {
    constructor(message, code = 500, type = 'Custom') {
        super();
        this.msg = message;
        this.code = code;
        this.type = type;
    }

    json() {
        return {
            uuid: uuid(),
            message: this.msg,
        };
    }
}

module.exports = CustomException;
