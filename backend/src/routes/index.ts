import { Router } from 'express';
import playersRouter from './players';

const router = Router();

// Mounts
router.use('/players', playersRouter);

export default router;
