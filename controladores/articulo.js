const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: "Soy un accion de prueba en mi controlador de articulos"
    });
}

const curso = (req, res) => {
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
};

// METODO PARA CREAR UN NUEVO DATO //

const crear = (req, res) => {

    //Recoger parametros por post a guardar
    let parametros = req.body;

    //Validar los datos (libreria validator)
    try {

        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });

        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la informacion !!");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar",
        })
    }

    //Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    //Asignarle los valores al objeto basado en el modelo(manuel o automatico)
    //Manual:
    //articulo.titulo = parametros.titulo;
    //Automatico: Incluye "parametros" en la const articulo. 

    //Guardar el articulo en la base de datos
    articulo.save()

        //Devolver resultados

        .then(articuloGuardado => {

            return res.status(200).json({
                status: "success",
                articulo: articuloGuardado,
                mensaje: "Articulo creado con exito!!"
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el articulo"
            });
        });
}
//METODO PARA CONSEGUIR LOS DATOS ALMACENADOS //
//Los almaceno en una cariable, para luego poder trabajar o filtrar esa informacion

const listar = async (req, res) => {

    try {
        const articulos = await Articulo.find({});

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            articulos
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error",
            error
        });
    }
};




module.exports = {
    prueba,
    curso,
    crear,
    listar
}
