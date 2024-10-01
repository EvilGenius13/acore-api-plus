import { Router } from 'express';
import { registerUserUnsafe, loginUnsafe } from '../controllers/usersController';

const router = Router();

//POST /api/users/register
router.post('/register', registerUserUnsafe);

// POST /api/users/loginunsafe
router.post('/loginunsafe', loginUnsafe);

export default router;