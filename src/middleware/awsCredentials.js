const cls = require('cls-hooked');
const aws = require('aws-sdk');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const CustomException = require('../exceptions/customException');
const Exception = require('../utils/exception');

const namespaceId = `caradhras:${uuidv4()}`;
const namespace = cls.createNamespace(namespaceId);

async function getSecretName(token) {
    const payload = jwt.decode(token);
    if (!payload) {
        throw new CustomException('Invalid token.', 400);
    }
    const clientId = payload.client_id;
    if (clientId === undefined || !clientId) {
        throw new CustomException('Invalid payload.');
    }
    return clientId;
}

async function getSecretValue(secretName) {
    const awsClient = new aws.SecretsManager(process.env.AWS_REGION);
    const responseSecretValue = await awsClient
        .getSecretValue({ SecretId: secretName })
        .promise()
        .catch((err) => {
            let msg = '';
            if (err.code === 'DecryptionFailureException') {
                msg = 'Secrets Manager can\'t decrypt the protected secret text using the provided KMS key';
            } else if (err.code === 'InternalServiceErrorException') {
                msg = 'An error occurred on the server side';
            } else if (err.code === 'InvalidParameterException') {
                msg = 'You provided an invalid value for a parameter';
            } else if (err.code === 'InvalidRequestException') {
                msg = 'You provided a parameter value that is not valid for the current state of the resource';
            } else if (err.code === 'ResourceNotFoundException') {
                msg = 'We can\'t find the resource that you asked for';
            } else {
                msg = err.message;
            }
            throw new CustomException(msg, 500);
        });

    if (responseSecretValue === undefined || !responseSecretValue) {
        throw new CustomException('Secret not found.');
    }

    if ('SecretString' in responseSecretValue) {
        return responseSecretValue.SecretString;
    }
    throw new CustomException('Secret value type is not string.');
}

async function getCredentials(token) {
    const secretName = await getSecretName(token).catch((err) => {
        throw err;
    });
    const secretValue = await getSecretValue(secretName).catch((err) => {
        throw err;
    });
    return JSON.parse(secretValue);
}

const awsCredentials = () => async (req, res, next) => {
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
    const token = req.headers.authorization;
    await getCredentials(token)
        .then((credentials) => {
            namespace.run(() => {
                namespace.set('issuer', credentials);
                next();
            });
        })
        .catch((err) => {
            Exception.check(err, res);
        });
};

const issuer = () => namespace.get('issuer');

module.exports = {
    awsCredentials,
    issuer,
};
