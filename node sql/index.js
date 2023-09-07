const express = require("express");
const mysql2 = require("mysql2");
const connection = mysql2.c
const app = express();
const port = 3000;
app.use(express.json())


app.use('*',(req,res,next)=>{
    return res.json({message : "not found"})
})

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
