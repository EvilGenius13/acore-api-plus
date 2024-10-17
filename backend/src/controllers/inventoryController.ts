import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { charactersPool as pool } from '../utils/db';
import { InventoryItem } from '../types';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import cache from '../cache';
import { RowDataPacket } from 'mysql2';

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

    // Verify that the character belongs to the user
    const [characters]: [RowDataPacket[], any] = await connection.query(
      'SELECT guid, money FROM acore_characters.characters WHERE account = ? AND guid = ?',
      [userId, characterGuid]
    );

    if (characters.length === 0) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const money = characters[0].money;

    // Fetch the character's inventory with item details
    const [inventory]: [RowDataPacket[], any] = await connection.query<RowDataPacket[]>(
      `SELECT
        ci.guid AS item_guid,
        ci.bag,
        ci.slot,
        ci.item,
        ii.itemEntry,
        it.name,
        it.displayid
      FROM acore_characters.character_inventory ci
      JOIN acore_characters.item_instance ii ON ci.item = ii.guid
      JOIN acore_world.item_template it ON ii.itemEntry = it.entry
      WHERE ci.guid = ?
      `,
      [characterGuid]
    );

    // Now, for each inventory item, fetch additional data from Wowhead with caching
    const enhancedInventory = await Promise.all(
      inventory.map(async (item) => {
        const cacheKey = `itemIcon_${item.itemEntry}`;
        let iconImageUrl = cache.get<string>(cacheKey);

        if (!iconImageUrl) {
          try {
            const wowheadUrl = `https://www.wowhead.com/item=${item.itemEntry}&xml`;

            const response = await axios.get(wowheadUrl);
            const parsedXml = await parseStringPromise(response.data);

            // Navigate through the parsed XML to extract the icon identifier
            const iconData =
              parsedXml.wowhead.item[0].icon?.[0]?._ || 'inv_misc_questionmark';
           
            const iconName = iconData || 'inv_misc_questionmark';

            iconImageUrl = `https://wow.zamimg.com/images/wow/icons/large/${iconName}.jpg`;

            // Store in cache
            cache.set(cacheKey, iconImageUrl);
          } catch (error) {
            console.error(`Error fetching data for itemEntry ${item.itemEntry}:`, error);
            // Assign default icon if there's an error
            iconImageUrl = 'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';
          }
        }

        return {
          ...item,
          icon: iconImageUrl,
        };
      })
    );
    console.log('Enhanced inventory:', enhancedInventory);
    res.status(200).json({ inventory: enhancedInventory, money });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    if (connection) connection.release();
  }
};