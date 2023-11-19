import { useState } from 'react'
import styles from './LoginPage.module.scss'
import { RegisterForm } from './RegisterForm'
import { Button, Group } from '@mantine/core'
import { LoginForm } from './LoginForm'

export enum LoginState {
  BASEPAGE = 'BASEPAGE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export interface User {
  username: string
  password: string
}

export const LoginPage = () => {
  const [pageState, setPageState] = useState<LoginState>(LoginState.BASEPAGE)

  return (
    <div className={styles.loginContainer}>
      {pageState === LoginState.BASEPAGE && (
        <>
          <p className={styles.text}>
            Bienvenue sur l'application Fitness Tracker
          </p>
          <p className={styles.text}>Que souhaitez vous faire</p>
          <Group justify='space-between'>
            <Button
              variant='filled'
              color='gray'
              onClick={() => setPageState(LoginState.REGISTER)}
            >
              S'inscrire
            </Button>
            <Button
              variant='filled'
              color='gray'
              onClick={() => setPageState(LoginState.LOGIN)}
            >
              Se connecter
            </Button>
          </Group>
        </>
      )}
      {pageState === LoginState.REGISTER && (
        <RegisterForm onReturn={() => setPageState(LoginState.BASEPAGE)} />
      )}
      {pageState === LoginState.LOGIN && (
        <LoginForm onReturn={() => setPageState(LoginState.BASEPAGE)} />
      )}
    </div>
  )
}
