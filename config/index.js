const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: '001929',
    host: 'localhost',
    port: 5432,
    database: 'final_project'
})

module.exports = pool