const  {Router} = require('express');
const { check } = require('express-validator');
const { getEvents, getEventById, addEvent, updateEvent, deleteEvent } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const errorMiddleware = require('../middlewares/errorMiddleware');
const { validateJWT } = require('../middlewares/validateJWT');
const { use } = require('./auth');
const router = Router();

//aplicar el middleware a las rutas que sigan despues de esta linea
//las rutas anteriores a esta linea seran publicas
router.use(validateJWT);

//obtener todos los eventos
router.get('/', getEvents);

//obtener un evento
router.get('/:id', getEventById);

//guardar evento
router.post(
    '/addEvent',
    [
        check('title','El titulo es requerido').not().isEmpty(),
        check('desc','La descripcion es requerida').not().isEmpty(),
        check('startDate','La fecha inicial es requerida').not().isEmpty(),
        check('startDate','La fecha inicial es requerida').custom(isDate),
        check('endDate','La fecha final es requerida').not().isEmpty(),
        check('endDate','La fecha final es requerida').custom(isDate),
        errorMiddleware
    ], 
    addEvent
);

//actualizar evento
router.put('/update/:id', updateEvent);

//borrar un evento
router.delete('/delete/:id', deleteEvent);

module.exports = router;