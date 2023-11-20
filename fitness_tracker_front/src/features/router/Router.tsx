import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../landingPage/LandingPage'

export const Router = () => {
  return (
    <Routes>
      <Route path='/training' element={<LandingPage />} />
      <Route path='*' element={<LandingPage />} />
    </Routes>
  )
}
