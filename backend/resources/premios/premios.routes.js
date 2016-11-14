/* Vista/enrutamiento compras */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import premiosCtrl from './premios.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .get(premiosCtrl.list)       /* get: consulta datos sin filtros */
  .post(premiosCtrl.create)    /* post: registro datos */
router.route('/:idPremio')
  .put(premiosCtrl.modify)     /* put: actualizacion datos de idPremio */
  .delete(premiosCtrl.remove); /* delete: eliminacion datos de idPremio */

/* Exportacion enrutamiento */
export default router;