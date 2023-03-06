const {Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "pernblog",
    password: "Emp2030!",
    port: 5432
})

module.exports = pool