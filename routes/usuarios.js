const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido } = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet); // 'usuariosGet': no se esta ejecutando la funcion usuariosGet sino se esta obteniendo la referencia a la misma.
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser de más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']), 
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);



module.exports = router;