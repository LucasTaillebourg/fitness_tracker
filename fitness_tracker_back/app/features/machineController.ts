import { type Request, type Response } from 'express'
import * as db from './db'

export const getMachine = async (req: Request, res: Response) => {
  try {
    const query = 'SELECT * FROM Machine'
    const result = await db.query(query)

    res.json(result.rows)
  } catch (error) {
    console.error('Erreur lors de la récupération des machines', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addMachine = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const insertQuery = 'INSERT INTO Machine(name) VALUES($1) RETURNING *'
    const result = await db.query(insertQuery, [name])

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'une machine', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
