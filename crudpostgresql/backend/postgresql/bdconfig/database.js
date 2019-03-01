const Pool = require('pg').Pool;
var config = require('../config');

const pool = new Pool({
    user: config.PG_USER,
    host: config.PG_SERVER,
    database: config.PG_DATABASE,
    password: config.PG_PASS,
    port: config.PG_PORT
});

module.exports = pool;