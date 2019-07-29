const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, level, message }) => {
    const info = (typeof message === 'string') ? { message } : message;
    info.timestamp = timestamp;
    return `[${level.toUpperCase()}] ${JSON.stringify(info, null, 2)}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat,
    ),
    transports: [new transports.Console()],
});

module.exports = logger;
