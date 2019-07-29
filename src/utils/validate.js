const CustomException = require('../exceptions/customException');

class Validate {
    static token(token) {
        if (token === undefined) {
            throw new CustomException('Token not informed', 400);
        } else if (!token) {
            throw new CustomException('Token can`t be blank.', 400);
        }
    }
}
module.exports = Validate;
