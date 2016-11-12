/* Enrutamiento */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tarjetasRoutes from './tarjetas/tarjetas.routes';
import tiendasRoutes from './tiendas/tiendas.routes';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Ruta recurso tarjetas */
router.use('/tarjetas', tarjetasRoutes);
/* Ruta recurso tiendas */
router.use('/tiendas', tiendasRoutes);

/* Exportacion enrutamiento */
export default router;