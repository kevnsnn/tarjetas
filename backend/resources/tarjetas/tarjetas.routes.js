/* Vista/enrutamiento tarjetas */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tarjetasCtrl from './tarjetas.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .get(tarjetasCtrl.list)       /* get: consulta datos sin filtros */
  .post(tarjetasCtrl.create)    /* post: registro datos */
router.route('/:numTarjeta')
  .get(tarjetasCtrl.findTarjeta)/* get: consulta datos una tarjeta */
  .put(tarjetasCtrl.modify)     /* put: actualizacion datos de numTarjeta */
  .delete(tarjetasCtrl.remove); /* delete: eliminacion datos de numTarjeta */

/* Exportacion enrutamiento */
export default router;