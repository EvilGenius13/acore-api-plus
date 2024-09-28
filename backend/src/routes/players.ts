import { Router } from 'express';
import { getPlayers, getPlayersOnline, getPlayersOnlineCount, getPlayersFactionCount, getPlayerById, getPlayerByName } from '../controllers/playersController';

const router = Router();

// GET /api/players
router.get('/', getPlayers);

// Get /api/players/online
router.get('/online', getPlayersOnline);

// GET /api/players/online/count
router.get('/online/count', getPlayersOnlineCount);

// GET /api/players/factioncount
router.get('/factioncount', getPlayersFactionCount);

// GET /api/players/:id
router.get('/id/:id', getPlayerById);

// GET /api/players/:name
router.get('/name/:name', getPlayerByName);

export default router;