import { Request, Response } from 'express';
import * as db from './db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userExists = await checkIfUserExists(username);
  if (userExists) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const insertQuery = 'INSERT INTO FITNESS_USER (username, password_hash) VALUES ($1, $2) RETURNING *';
  const values = [username, hashedPassword];

  try {
    const result = await db.query(insertQuery, values);
    const newUser = result.rows[0];

    // Générer un token d'authentification
    const token = generateToken(newUser.id);

    // Mettre à jour la base de données avec le token
    await updateUserToken(newUser.id, token);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Endpoint pour la connexion
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Générer un token d'authentification
  const token = generateToken(user.id);

  // Mettre à jour la base de données avec le token
  await updateUserToken(user.id, token);

  res.json({ user, token });
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM FITNESS_USER';
    const result = await db.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour vérifier si un utilisateur existe déjà
const checkIfUserExists = async (username: string) => {
  const query = 'SELECT * FROM FITNESS_USER WHERE username = $1';
  const result = await db.query(query, [username]);
  return result.rows.length > 0;
};

// Fonction pour récupérer un utilisateur par nom d'utilisateur
const getUserByUsername = async (username: string) => {
  const query = 'SELECT * FROM FITNESS_USER WHERE username = $1';
  const result = await db.query(query, [username]);
  return result.rows[0];
};

// Fonction pour générer un token d'authentification
const generateToken = (userId: number) => {
  const secretKey = process.env.SECRET_KEY ?? ""
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

// Fonction pour mettre à jour le token dans la base de données
const updateUserToken = async (userId: number, token: string) => {
  const updateQuery = 'UPDATE FITNESS_USER SET token = $1 WHERE id = $2';
  const values = [token, userId];
  await db.query(updateQuery, values);
};
