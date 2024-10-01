import { Router } from 'express';
import playersRouter from './players';
import usersRouter from './users';
import protectedRouter from './protected'; // Get rid of this once we have a real protected route
import charactersRouter from './characters';
import inventoryRouter from './inventory';

const router = Router();

// Mounts
router.use('/players', playersRouter);
router.use('/users', usersRouter);
router.use('/protected', protectedRouter); // Get rid of this once we have a real protected route
router.use('/characters', charactersRouter);
router.use('/inventory', inventoryRouter);

export default router;
