const dotenv = require('dotenv');
const app = require('express')();
const bodyParser = require('../middleware/bodyParser');
const { uuidExpress } = require('../middleware/uuid');
const logRequest = require('../middleware/logRequest');
const { logResponse, logEndpointNotFound } = require('../middleware/logResponse');
const { awsCredentials } = require('../middleware/awsCredentials');

app.use(bodyParser());
app.use(uuidExpress());
app.use(logResponse());
app.use(logRequest());
app.use(awsCredentials());

dotenv.config();
require('../routes/routes')(app);

app.use(logEndpointNotFound());

module.exports = app;
