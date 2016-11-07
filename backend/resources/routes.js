/* Enrutamiento */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tarjetasRoutes from './tarjetas/tarjetas.routes';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Ruta recurso tarjetas */
router.use('/tarjetas', tarjetasRoutes);

/* Exportacion enrutamiento */
export default router;