import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: 'Settrak',
  password: 'SettrakDb',
  host: 'localhost',
  port: 5432,
  database: 'fitness-tracker-bdd',
});

export const query = async (text: string, params: any[] = []) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête:', error);
    throw error;
  }
};
