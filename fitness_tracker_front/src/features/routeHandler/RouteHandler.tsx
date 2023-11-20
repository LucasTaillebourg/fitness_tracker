import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../landingPage/LandingPage'
import { TrainingList } from '../training/list/TrainingList'
import { NewTraining } from '../training/new/NewTraining'

export const RouteHandler = () => {
  return (
    <Routes>
      <Route path='/training/new' element={<NewTraining />} />
      <Route path='/training' element={<TrainingList />} />
      <Route path='*' element={<LandingPage />} />
    </Routes>
  )
}
