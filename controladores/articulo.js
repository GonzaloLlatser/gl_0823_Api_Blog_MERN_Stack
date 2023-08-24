
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

const crear = (req, res)=>{

    //Recoger parametros por post a guardar

    //Validar los datos (libreria validator)

    //Crear el objeto a guardar
    
    //asignarle los valores al objeto basado en el modelo(manuel o automatico)

    //Guardar el articulo en la base de datos

    //Devolver resultados





    return res.status(200).json({
        mensaje:"Accion de guardar"
    });
}

module.exports = {
    prueba,
    curso,
    crear
}
