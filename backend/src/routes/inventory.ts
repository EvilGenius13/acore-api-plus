import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getCharacterInventory } from '../controllers/inventoryController';

const router = Router();

// GET /api/inventory/:guid
router.get('/:guid', authenticateToken, getCharacterInventory);

export default router;