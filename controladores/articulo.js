const validator = require("validator");

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

//Crea un nuevo metodo

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

    //asignarle los valores al objeto basado en el modelo(manuel o automatico)

    //Guardar el articulo en la base de datos

    //Devolver resultados





    return res.status(200).json({
        mensaje: "Accion de guardar",
        parametros
    });
}

module.exports = {
    prueba,
    curso,
    crear
}
