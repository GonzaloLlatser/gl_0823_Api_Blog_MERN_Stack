const fs = require("fs");
const path = require("path");
const { validarArticulo } = require("../helpers/validar")
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
        validarArticulo(parametros);
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
// METODO PARA CONSEGUIR LOS DATOS ALMACENADOS //
//Los almaceno en una cariable, para luego poder trabajar o filtrar esa informacion

const listar = async (req, res) => {

    try {
        const articulos = await Articulo.find({})
            .limit(2)
            .sort({ fecha: -1 });

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            parametro: req.params.ultimos,
            contador: articulos.length,
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
// METODO PARA CONSEGUIR SOLO UN DATO //

const uno = async (req, res) => {
    try {
        // Recoger un id por la url
        let id = req.params.id;

        // Buscar el articulo
        const articulo = await Articulo.findById(id);

        // Si no existe devolver error
        if (!articulo) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo"
            });
        }

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            articulo
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error en el servidor"
        });
    }
};

// METODO PARA ELIMINAR SOLO UN DATO //

const borrar = async (req, res) => {
    try {
        let articuloId = req.params.id;

        const articuloBorrado = await Articulo.findOneAndDelete({ _id: articuloId });

        if (!articuloBorrado) {
            return res.status(404).json({
                status: "error",
                mensaje: "El artículo no fue encontrado para ser borrado."
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloBorrado,
            mensaje: "Artículo borrado exitosamente."
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar el artículo."
        });
    }
};

// METODO PARA EDITAR UN DATO //

const editar = async (req, res) => {
    try {
        // Recoger el Id
        let articuloId = req.params.id;

        // Recoger los datos del body
        let parametros = req.body;

        // Validar datos
        try {
            validarArticulo(parametros);
        } catch (error) {
            return res.status(404).json({
                status: "error",
                mensaje: "Faltan datos por enviar"
            });
        }

        // Buscar y actualizar el artículo
        const articuloActualizado = await Articulo.findOneAndUpdate(
            { _id: articuloId },
            parametros,
            { new: true } // Para que devuelva el documento actualizado
        );

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "El artículo no fue encontrado para ser actualizado."
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar el artículo."
        });
    }
};

// METODO PARA SUBIR UNA IMAGEN O FICHERO //

const subir = async (req, res) => {
    try {
        // Recoger el Id
        let articuloId = req.params.id;

        // Buscar y actualizar el artículo
        const articuloActualizado = await Articulo.findOneAndUpdate(
            { _id: articuloId },
            { imagen: req.file.filename }, // Aquí solo se actualiza la imagen
            { new: true } // Para que devuelva el documento actualizado
        );

        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "El artículo no fue encontrado para ser actualizado."
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado,
            fichero: req.file
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al actualizar el artículo."
        });
    }
};

// METODO PARA MOSTRAR UNA IMAGEN

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/" + fichero;

    fs.stat(ruta_fisica, (error, existe) => {
        if (existe) {
            return res.sendFile(path.resolve(ruta_fisica));

        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagenno existe"
            })
        }
    })
}

// METODO PARA BUSCAR UNA IMAGEN 

const buscador = async (req, res) => {
    try {
        // Sacar el string de búsqueda
        let busqueda = req.params.busqueda;

        // Utilizar async/await para hacer la búsqueda
        const articulosEncontrados = await Articulo.find({
            "$or": [
                { "titulo": { "$regex": busqueda, "$options": "i" } },
                { "contenido": { "$regex": busqueda, "$options": "i" } },
            ]
        })
        // Ordenar
        .sort({ fecha: -1 });

        if (!articulosEncontrados || articulosEncontrados.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            });
        }

        return res.status(200).json({
            status: "success",
            articulos: articulosEncontrados
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un error en el servidor"
        });
    }
};




module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subir,
    imagen,
    buscador
}
