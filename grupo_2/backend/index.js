const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')
const bcrypt = require("bcrypt");
const PORT = 9000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
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
    pool.query("select * from estudiantes", (error, results) => {
        if (error){
            console.error(error);
            res.status(500).send("error en el server :c");
        } else {
            const response = {
                status: 'éxito',
                message: 'Data retrieved successfully',
                data: results
            }
            res.status(200).json(response);
        }
    })
});

app.post("/crear", (req,res) => {
    console.log("valor de req.body: ",req.body);
    const {nombre, password, unidad_academica} = req.body;

    const saltRounds = 15;
    
    bcrypt.hash(password, saltRounds, (error,hash) => {
        if(error) {
            console.error(error);
            hash.status(500).send("error hasheando password")
        } else {
            pool.query(
                "insert into estudiantes (nombre, password, unidad_academica) VALUES (?,?, ?)",
                [nombre, hash, unidad_academica],
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
        }
    });

    
});