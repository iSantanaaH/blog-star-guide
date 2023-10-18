const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "15784267309",
    database: "blogstarguidedb",
    port: 5432,
    max: 1,
});

module.exports = pool;