// const Pool = require('pg').Pool;

// const pool = new Pool({
//     host: process.env.HOST_DB || 'localhost',
//     user: process.env.USR_DB || 'cdt_user',
//     password: process.env.PWD_DB || 'cdt!#$1234',
//     database: process.env.DB || 'microservices',
//     port: process.env.PORT_DB|| '5432',
//     max: 10,
//     idleTimeoutMillis: 5000,
//     connectionTimeoutMillis: 0,
// });

const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max: 10, idleTimeoutMillis: 3000 },
    useNullAsDefault: true,
    searchPath: ['p2m'],
});

// module.exports = pool

module.exports = () => knex;
