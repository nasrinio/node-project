const express = require('express')
const mysql = require('mysql2');
const cors = require("cors")
const app = express()
const port = 3000

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql2'
});

app.use(express.json())
app.use(cors())
app.get("/", (req, res, next) => {
    const query = `select * from products`
    connection.execute(query, (err, result) => {
        if (err) {
            res.json({ msg: "query error", error: err })
        }
        if (result.length) {
            return res.json({ msg: "success", products: result })
        }
        res.json({ msg: "product not found" })
    })
})


app.post("/", (req, res, next) => {
    const { name, price, description } = req.body
    const query = `insert into products (name, price, description) values ('${name}', '${price}', '${description}')`
    connection.execute(query, (err, result) => {
        if (err) {
            res.json({ msg: "query error", error: err })
        }
        console.log(result);
        result.affectedRows ? res.json({ msg: "success" }) : res.json({ msg: "failed" })
    })
})


app.put("/", (req, res, next) => {
    const { name, price, description, id } = req.body
    const query = `update products set name = '${name}', price = '${price}', description = '${description}'
     where id = ${id}`
    connection.execute(query, (err, result) => {
        if (err) {
            res.json({ msg: "query error", error: err })
        }
        result.affectedRows ? res.json({ msg: "success" }) : res.json({ msg: "failed product id not found" })
    })
})

app.delete("/", (req, res, next) => {
    const { id } = req.body
    const query = ` delete from products where id = ${id}`
    connection.execute(query, (err, result) => {
        if (err) {
            res.json({ msg: "query error", error: err })
        }
        result.affectedRows ? res.json({ msg: "success" }) : res.json({ msg: "failed product id not found" })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))