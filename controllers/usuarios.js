const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([ // respuesta es una colección de promesas.
        // Promise.all: ejecuta ambas promesas al mismo tiempo y no termina hasta que ambas funcionen. Esto optimiza el tiempo de ejecución y demora menos.
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {



    // Se almacena la peticion request a una constante body y se muestra en la respuesta:
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });

}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);

}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });

}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    // const usuarioAutenticado = req.usuario;

    // Muestra el usuario borrado y el usuario autenticado
    res.json({ usuario });

}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}