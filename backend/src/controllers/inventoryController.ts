// inventoryController.ts

import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { charactersPool as pool } from '../utils/db';

export const getCharacterInventory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  const characterGuid = req.params.guid;

  if (!userId) {
    res.status(400).json({ error: 'User information not available' });
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection();

    // Check if the character belongs to the user
    // TODO: Need to get rid of any type
    const [characters]: [any[], any] = await connection.query(
      'SELECT guid FROM characters WHERE account = ? AND guid = ?',
      [userId, characterGuid]
    );

    if (characters.length === 0) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Fetch the character's inventory
    const [inventory] = await connection.query(
      'SELECT * FROM character_inventory WHERE guid = ?',
      [characterGuid]
    );

    res.status(200).json({ inventory });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
};
