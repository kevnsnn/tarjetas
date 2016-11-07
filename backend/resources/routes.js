import express from 'express';
import tarjetasRoutes from './tarjetas/tarjetas.routes';

const router = express.Router();

router.use('/tarjetas', tarjetasRoutes);

export default router;