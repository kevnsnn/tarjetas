/* Vista/enrutamiento compras */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import comprasCtrl from './compras.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .get(comprasCtrl.list)       /* get: consulta datos sin filtros */
  .post(comprasCtrl.create)    /* post: registro datos */
router.route('/:numTarjeta')
  .put(comprasCtrl.modify)     /* put: actualizacion datos de compra */
  .delete(comprasCtrl.remove); /* delete: eliminacion datos de compra */

/* Exportacion enrutamiento */
export default router;