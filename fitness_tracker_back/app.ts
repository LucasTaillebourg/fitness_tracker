import express from 'express'
import cors from 'cors'
import * as userController from './app/features/userController'
import * as trainingController from './app/features/trainingController'
import * as machineController from './app/features/machineController'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
const port = 3000
dotenv.config()

app.use(express.json())

app.post('/api/register', userController.registerUser)

app.post('/api/login', userController.loginUser)

app.get('/api/user', authenticateUser, userController.getUsers)

app.post('/api/trainings', authenticateUser, trainingController.addTraining)
app.get('/api/user/trainings', authenticateUser, trainingController.getUserTrainings)

app.post('/api/machine', machineController.addMachine)

const secretKey = process.env.SECRET_KEY ?? ''

// Fonction middleware pour l'authentification
function authenticateUser (req: any, res: any, next: any) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' })
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    req.body.userId = typeof decoded === 'string' ? decoded : decoded.userId
    next()
  } catch (error) {
    console.error('Erreur de vérification du token:', error)
    res.status(401).json({ error: 'Unauthorized - Invalid token' })
  }
}

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`)
})
