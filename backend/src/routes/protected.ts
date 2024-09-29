import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "You're logged in!" });
});

export default router;
