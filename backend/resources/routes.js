/* Enrutamiento */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tarjetasRoutes from './tarjetas/tarjetas.routes';
import tiendasRoutes from './tiendas/tiendas.routes';
import comprasRoutes from './compras/compras.routes';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Ruta recurso tarjetas */
router.use('/tarjetas', tarjetasRoutes);
/* Ruta recurso tiendas */
router.use('/tiendas', tiendasRoutes);
/* Ruta recurso tiendas */
router.use('/compras', comprasRoutes);

/* Exportacion enrutamiento */
export default router;