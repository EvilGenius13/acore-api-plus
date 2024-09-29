import { Router } from 'express';
import { registerUser, loginUnsafe } from '../controllers/usersController';

const router = Router();

//POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/loginunsafe
router.post('/loginunsafe', loginUnsafe);

export default router;