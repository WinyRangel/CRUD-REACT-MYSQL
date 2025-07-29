const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "cruddress",
});

server.use(express.json());
server.use(cors());

server.post("/register", (req, res) => {
    const { nombre } = req.body;
    const { costo } = req.body;
    const { categoria } = req.body;

    let sql = "INSERT INTO vestidos (nombre, costo, categoria) VALUES (?,?,?)"
    db.query(sql, [nombre, costo, categoria], (err,result) =>{
        if (err) {
            console.log(err);
            console.log('Hubo un error al registrar el vestido')
        }else{
            console.log(result);
            console.log('Vestido registrado correctamente!')
        }
    })
});

server.get("/vestidos", (req, res) => {

    let sql = "SELECT * FROM vestidos";
    db.query(sql, (err,result) =>{
        if (err) {
            console.log(err);
        }else{
            res.send(result);
        }

    })
});

server.put("/edit", (req, res) => {
    const { id } = req.body;
    const { nombre } = req.body;
    const { costo } = req.body;
    const { categoria } = req.body;

    let sql = "UPDATE vestidos SET nombre = ?, costo = ?, categoria = ? WHERE idvestido = ?";
    db.query(sql, [nombre, costo, categoria, id], (err,result) =>{
        if (err) {
            console.log(err);
        }else{

            res.send(result);
        }
    })
});

server.delete("/delete/:index", (req,res) =>{
    const { index } = req.params

    let sql = "DELETE FROM vestidos WHERE idvestido = ?"
    db.query(sql, [index], (err,result) =>{err ? console.log(err) : res.send(result)})
})
server.listen(3001, () =>
    console.log("Running in the port 3001")
);