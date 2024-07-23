// Pool from pg package for connection pool
const { Pool } = require("pg");

// const databaseConfig = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// };

// const pool = new Pool(databaseConfig,{
//     ssl: {
//         rejectUnauthorized: true
//     }
// });

/**
 * PostgreSQL connection pool.
 * @type {Pool}
 */
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

module.exports = {
  pool: pool,
};
