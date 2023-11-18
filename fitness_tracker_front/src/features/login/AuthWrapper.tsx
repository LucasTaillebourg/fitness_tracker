import { ReactNode } from 'react'
import { useLogin } from './useLogin'
import { LoginPage } from './LoginPage'

interface AuthWrapperProps {
  children: ReactNode
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthenticated } = useLogin()

  return isAuthenticated ? <>{children}</> : <LoginPage />
}
