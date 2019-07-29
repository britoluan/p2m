const cls = require('cls-hooked');
const uuidv4 = require('uuid/v4');

const namespaceId = `caradhras:${uuidv4()}`;
const namespace = cls.createNamespace(namespaceId);

module.exports.uuidExpress = ({ useHeader = false, headerName = 'X-Request-Id' } = {}) => (req, res, next) => {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);

    let requestId;
    if (useHeader) {
        requestId = req.headers[headerName.toLowerCase()];
    }
    requestId = requestId || uuidv4();

    namespace.run(() => {
        namespace.set('requestId', requestId);
        next();
    });
};

module.exports.uuid = () => namespace.get('requestId');
