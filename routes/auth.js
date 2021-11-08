//router para definir las rutas del endpoint y los verbos
const {Router} = require('express');
const router = Router();
const { login, register, revalidarToken } = require('../controllers/auth');

//express validator
const {check} = require('express-validator');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { validateJWT } = require('../middlewares/validateJWT');
const passwordMatch = require('../helpers/passwordMatch');
  
//login endpoint
router.post(
    '/', 
    [
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'La estructura del email no es valida').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener entre 8 y 16 caracteres y al menos un dígito o una minúscula o mayúscula. Puede tener otros símbolos').matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
        //custom middleware para los errores de express validator
        errorMiddleware
    ],
    login
);

//registro de usuarios
router.post(
    '/register', 
    [   //middleware de express-validator
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('name', 'El nombre solo debe llevar letras').matches(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/),
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'La estructura del email no es valida').isEmail(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener entre 8 y 16 caracteres y al menos un dígito o una minúscula o mayúscula. Puede tener otros símbolos').matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/),
        check('confirm_password').custom(passwordMatch),
        //custom middleware para los errores de express validator
        errorMiddleware
    ], 
    register
);

//renovar el token 
router.get('/revalidar-token', validateJWT ,revalidarToken);

//exportar modulo con nuestas rutas
module.exports = router;