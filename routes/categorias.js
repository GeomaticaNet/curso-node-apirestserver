const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

/**
 * {{urk}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('GET');
});

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('GET - Id');
});

// Crear categoria - privado - cualquier persona con un token valido.
router.post('/', (req, res) => {
    res.json('POST');
});

// Actualizar - privado - cualquiera con token valido.
router.put('/:id', (req, res) => {
    res.json('PUT');
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('DELETE');
});


module.exports = router;