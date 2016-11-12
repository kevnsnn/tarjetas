/* Vista/enrutamiento tiendas */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tiendasCtrl from './tiendas.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .get(tiendasCtrl.list)       /* get: consulta datos sin filtros */
  .post(tiendasCtrl.create)    /* post: registro datos */
router.route('/:nombreTienda')
  .put(tiendasCtrl.modify)     /* put: actualizacion datos de nombreTienda */
  .delete(tiendasCtrl.remove); /* delete: eliminacion datos de nombreTienda */

/* Exportacion enrutamiento */
export default router;