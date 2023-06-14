const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const bcrypt = require("bcrypt");
const PORT = 9000;

const app = express();

app.use(cors());

app.listen(
    PORT; 
    () => {
    console.log(`Server is running on port: ${PORT}`);
});

// Conexión al pool de bases de datos
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "aula_virtual",
    port: 3306
})

app.get('/estudiantes', (req, res) => {
    pool.query("select * from estudiante", (error, results) => {
        if (error){
            const response = {
                status: 'exito',
                message: 'lectura de clientes exitosa',
                data: results
            }
            res.status(200).json(response);
        } else {
            console.error(error);
            res.status(500).send("error en el server :c");
        }
    })
});

app.post("/crear", (req,res) => {
    console.log("valor de req.body: ",req.body);
    const {nombre, password} = req.body;

            pool.query(
                "insert into estudiantes (nombre, password, unidad_academica) VALUES (?,?)",
                [nombre, password],
                (error, results) => {
                        if(error){
                            console.error(error);
                            res.status(500).send("error INSERTando en el server :c");
                        }else {
                            const response = {
                                status: 'exito',
                                message: 'se insertaron los datos bien',
                                data: results
                            }
                            res.status(200).json(response);
                        }
                    }
                );  
});