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

//Rutas

const rutas_articulo = require("./rutas/articulo");

//Cargo las rutas
app.use("/api", rutas_articulo);




// Rutas prueba hardcodeadas
app.get("/probando", (req, res) => {
    console.log("Se ha ejecutado el endpoint probando");

    return res.status(200).json([{
        curso: "Master en React",
        autor: "Udemy",
        url: "udemy.com"
    },

    {
        curso: "Master en React",
        autor: "Udemy",
        url: "udemy.com"
    }

    ]);
});

app.get("/", (req, res) => {

    return res.status(200).send(
        "<h1> Empezando a crear una api rest con node </h1>"
    );
});


//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto" + puerto);
});