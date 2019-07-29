const CustomException = require('../exceptions/customException');
const logger = require('../utils/logger');
const { uuid } = require('../middleware/uuid');

class Exception {
    static check(err, res) {
        if (err.type !== 'Custom') {
            err = new CustomException(err.message);
        }
        const log = {
            uuid: uuid(),
            error: err.msg,
            response: {
                status: err.code,
                stack: err.code !== 415 ? err.stack : undefined,
            },
        };
        logger.error(log);
        res.status(err.code).send(err.json());
    }
}
module.exports = Exception;
