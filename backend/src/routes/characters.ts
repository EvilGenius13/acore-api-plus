import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getUserCharacters } from '../controllers/charactersController';

const router = Router();

// GET /api/characters
router.get('/', authenticateToken, getUserCharacters);

export default router;