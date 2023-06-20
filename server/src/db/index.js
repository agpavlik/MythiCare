const { Pool } = require('pg')
const pool = new Pool({
  user: 'development',
  host: 'localhost',
  database: 'sitter',
  password: 'development',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}

