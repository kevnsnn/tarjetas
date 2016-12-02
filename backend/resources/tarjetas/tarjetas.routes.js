/* Vista/enrutamiento tarjetas */
/* Librerias npm */
import express from 'express';
/* Librerias locales */
import tarjetasCtrl from './tarjetas.controller';

/* Declaracion de variable para enrutamiento */
const router = express.Router();

/* Rutas */
router.route('/')
  .post(tarjetasCtrl.create)    /* post: registro datos */

/* Exportacion enrutamiento */
export default router;