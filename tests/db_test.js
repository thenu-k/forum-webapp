require('dotenv').config()

const {Pool, Client} = require('pg')
const pool  = new Pool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

pool.query('SELECT VERSION();', (error, results)=>{
    console.log(results)
})
