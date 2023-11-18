import { ReactNode } from 'react'
import { useToken } from '../../hooks/useToken'
import { LoginPage } from './LoginPage'

interface AuthWrapperProps {
  children: ReactNode
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthenticated } = useToken()

  return isAuthenticated ? <>{children}</> : <LoginPage />
}
