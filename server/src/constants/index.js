const { config } = require('dotenv')
config()

console.log("env port", process.env.PORT)
console.log("env port", process.env.DB_PORT)

module.exports = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  SECRET: process.env.SECRET,
}
