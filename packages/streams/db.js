const { Client } = require('pg');

const client = new Client({
user: process.env.DB_USERNAME,
host: process.env.DB_HOST,
database: process.env.DB_DATABASE,
password: process.env.DB_PASSWORD,
port: parseInt(process.env.DB_PORT),
})

client.connect()

module.exports = client