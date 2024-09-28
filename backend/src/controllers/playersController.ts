import  { Request, Response } from 'express';
import { Player } from '../models/player';
import pool from '../utils/db';
import { RowDataPacket } from 'mysql2';


// This should be paginated
export const getPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT guid, name, race, class, gender, level FROM characters ORDER BY level DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Error fetching players' });
  }
};

export const getPlayersFactionCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
         SUM(CASE 
              WHEN race IN (1, 3, 4, 7, 11) THEN 1 
              ELSE 0 
             END) AS allianceCount,
         SUM(CASE 
              WHEN race IN (2, 5, 6, 8, 9, 10) THEN 1 
              ELSE 0 
             END) AS hordeCount
       FROM characters`
    );

    const { allianceCount, hordeCount } = rows[0];

    res.json([{alliance: allianceCount, horde: hordeCount}]);
  } catch (error) {
    console.error('Error fetching faction counts:', error);
    res.status(500).json({ error: 'Error fetching faction counts' });
  }
};

export const getPlayersOnline = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT guid, name, race, class, level FROM characters WHERE online = 1 ORDER BY level DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Error fetching players' });
  }
};

export const getPlayersOnlineCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) AS onlineCount FROM characters WHERE online = 1');
    
    const { onlineCount } = (rows as RowDataPacket[])[0];

    res.json({ onlineCount });
  } catch (error) {
    console.error('Error fetching online player count:', error);
    res.status(500).json({ error: 'Error fetching online player count' });
  }
};

export const getPlayerById = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const [rows] = await pool.query<RowDataPacket[] & Player[] >(
      'SELECT guid as id, name, race, class, level FROM characters WHERE guid = ?', 
      [id]
    );

    // Ensure rows is an array
    if (rows.length === 0) {
      res.status(404).json({ error: `Player with id ${id} not found` });
      return;
    }

    // Respond with the first player
    const player = rows[0];
    res.json(player);
  } catch (error) {
    console.error(`Error fetching player with id ${id}:`, error);
    res.status(500).json({ error: 'Error fetching player' });
  }
};

export const getPlayerByName = async (req: Request, res: Response): Promise<void> => {
  const name = req.params.name;

  try {
    const [rows] = await pool.query<RowDataPacket[] & Player[] >(
      'SELECT guid as id, name, race, class, level FROM characters WHERE name = ?', 
      [name]
    );

    // Ensure rows is an array
    if (rows.length === 0) {
      res.status(404).json({ error: `Player with name ${name} not found` });
      return;
    }

    // Respond with the first player
    const player = rows[0];
    res.json(player);
  } catch (error) {
    console.error(`Error fetching player with name ${name}:`, error);
    res.status(500).json({ error: 'Error fetching player' });
  }
};