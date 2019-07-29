const { uuid } = require('./uuid');
const logger = require('../utils/logger');

module.exports = () => (req, res, next) => {
    const log = {
        uuid: `${uuid()}`,
        request: {
            url: req.url,
            headers: req.headers,
            body: req.body,
        },
    };
    logger.info(log);
    next();
};
