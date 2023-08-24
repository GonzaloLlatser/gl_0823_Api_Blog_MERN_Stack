const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors")

//Inicializar app
console.log("Hola que tal, como estas");

//Conectar a la base de datos
conexion();

//Crear servidor de Node
const app = express();
const puerto = 3900;


//Configurar cors
app.use(cors());

//Convertir body a objeto js
app.use(express.json());

//Crea rutas

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto" + puerto);
});