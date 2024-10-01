import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { charactersPool as pool } from '../utils/db';

export const getUserCharacters = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(400).json({ error: 'User information not available' });
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection();

    // Fetch characters associated with the account ID
    const [characters] = await connection.query(
      'SELECT guid, name, level, race, gender, class FROM characters WHERE account = ?',
      [userId]
    );

    res.status(200).json({ characters });
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
};