import { Request, Response } from 'express';
import crypto from 'crypto';
import { toBufferLE, toBigIntLE } from 'bigint-buffer';
import { modPow } from 'bigint-crypto-utils';
import { authPool as pool } from '../utils/db';
import { RowDataPacket } from 'mysql2';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, verifyPassword, email } = req.body;

  // Validate input
  if (!username || !password || !verifyPassword || !email) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  if (username.length > 20) {
    res.status(400).json({ error: 'Username must be less than 20 characters' });
    return;
  }

  if (password.length > 16) {
    res.status(400).json({ error: 'Password cannot exceed 16 characters' });
    return;
  }

  if (password !== verifyPassword) {
    res.status(400).json({ error: 'Passwords do not match' });
    return;
  }

  let connection;
  try {
    connection = await pool.getConnection();

    // Check if username already exists
    const [users] = await connection.query<RowDataPacket[]>(
      'SELECT username FROM account WHERE username = ?',
      [username]
    );

    if (users.length > 0) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    // Hash the password and generate verifier
    const { salt, verifierBuffer } = await hashPassword(username, password);

    // Save new user to the database
    await connection.query(
      'INSERT INTO account (username, salt, verifier, email) VALUES (?, ?, ?, ?)',
      [username, salt, verifierBuffer, email]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  } finally {
    if (connection) connection.release();
  }
};

async function hashPassword(username: string, password: string) {
  const salt = crypto.randomBytes(32);
  const h1 = crypto
    .createHash('sha1')
    .update(`${username.toUpperCase()}:${password.toUpperCase()}`)
    .digest();
  const h2 = crypto.createHash('sha1').update(Buffer.concat([salt, h1])).digest();
  const h2BigInt = toBigIntLE(h2);
  const g = BigInt(7);
  const N = BigInt('0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7');
  const verifier = modPow(g, h2BigInt, N);
  const verifierBuffer = toBufferLE(verifier, 32);
  return { salt, verifierBuffer };
}
