const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet); // 'usuariosGet': no se esta ejecutando la funcion usuariosGet sino se esta obteniendo la referencia a la misma.
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);



module.exports = router;