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

/* Exportacion enrutamiento */
export default router;