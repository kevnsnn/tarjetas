/* Vista/enrutamiento tiendas */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tiendasCtrl from './tiendas.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .post(tiendasCtrl.create)    /* post: registro datos */

/* Exportacion enrutamiento */
export default router;