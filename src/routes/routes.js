const controller = require('../controllers/p2mController');

const contextPath = '/p2m';

module.exports = (app) => {
    app.post(`${contextPath}`, controller.p2m);
};
