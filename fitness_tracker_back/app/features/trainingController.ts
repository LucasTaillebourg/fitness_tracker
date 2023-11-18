import * as db from './db'
import { type QueryResult } from 'pg'
import express from 'express'
import { type Request, type Response } from 'express'

interface Training {
  date: string
  name: string
  userId: string
  exercices: Exercice[]
}

interface Exercice {
  exercice_id: number
  name: string
  series: Series[]
}

interface Series {
  machine_id: number
  weight: number
  repetitions: number
}
const app = express()

app.use(express.json())

export const addTraining = async (req: Request<Training>, res: Response) => {
  try {
    const training = req.body

    await insertTrainingWithExercices(training as Training)

    res.status(200).json({ message: 'Entraînement inséré avec succès.' })
  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'entraînement avec exercices et séries :', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
}

export const insertTrainingWithExercices = async (training: Training) => {
  await db.query('BEGIN')

  const insertTrainingQuery = 'INSERT INTO Training (user_id, date, name) VALUES ($1, $2, $3) RETURNING training_id'
  const trainingResult: QueryResult = await db.query(insertTrainingQuery, [training.userId, training.date, training.name])
  const trainingId: number = trainingResult.rows[0].training_id

  const insertExerciceSeriesQuery = 'INSERT INTO ExerciceSeries (exercice_id, series_id) VALUES ($1, $2)'

  for (const exercice of training.exercices) {
    const insertExerciceQuery = 'INSERT INTO Exercice (name) VALUES ($1) RETURNING exercice_id'
    const exerciceResult: QueryResult = await db.query(insertExerciceQuery, [exercice.name])
    const exerciceId: number = exerciceResult.rows[0].exercice_id

    const seriesIds: number[] = []
    for (const series of exercice.series) {
      const insertSeriesQuery = 'INSERT INTO Series (machine_id, weight, repetitions) VALUES ($1, $2, $3) RETURNING series_id'
      const seriesResult: QueryResult = await db.query(insertSeriesQuery, [series.machine_id, series.weight, series.repetitions])
      const seriesId: number = seriesResult.rows[0].series_id

      seriesIds.push(seriesId)
    }

    for (const seriesId of seriesIds) {
      console.log({ exerciceId, seriesId })
      await db.query(insertExerciceSeriesQuery, [exerciceId, seriesId])
    }

    const insertTrainingExerciceQuery = 'INSERT INTO TrainingExercice (training_id, exercice_id) VALUES ($1, $2)'
    await db.query(insertTrainingExerciceQuery, [trainingId, exerciceId])
  }

  await db.query('COMMIT')

  console.log('Entraînement avec exercices et séries inséré avec succès.')
}
