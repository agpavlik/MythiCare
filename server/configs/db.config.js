// Database connections
const { Pool } = require('pg');

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT} = process.env;

const pool = new Pool({
  user: 'development',
  host: 'localhost',
  database: DB_DATABASE,
  password: 'development',
  port: 5432,
})

pool.connect().then(() => {
	console.log("Database connection established.")
}).catch( e => {
	console.log("error")
	throw new Error(e);
})

module.exports = pool;