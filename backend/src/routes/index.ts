import { Router } from 'express';
import playersRouter from './players';
import usersRouter from './users';

const router = Router();

// Mounts
router.use('/players', playersRouter);
router.use('/users', usersRouter);


export default router;
