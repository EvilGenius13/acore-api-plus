import { Router } from 'express';
import playersRouter from './players';
import usersRouter from './users';
import protectedRouter from './protected';

const router = Router();

// Mounts
router.use('/players', playersRouter);
router.use('/users', usersRouter);
router.use('/protected', protectedRouter);

export default router;
