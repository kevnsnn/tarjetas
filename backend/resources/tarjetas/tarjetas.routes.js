import express from 'express';
import tarjetasCtrl from './tarjetas.controller';

const router = express.Router();

router.route('/')
  .get(tarjetasCtrl.list)
  .post(tarjetasCtrl.create)

router.route('/:numTarjeta')
  .put(tarjetasCtrl.modify)
  .delete(tarjetasCtrl.remove);

export default router;