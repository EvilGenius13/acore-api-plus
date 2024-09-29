import { Router } from 'express';
import { registerUser } from '../controllers/usersController';

const router = Router();

//POST /api/users/register
router.post('/register', registerUser);

export default router;