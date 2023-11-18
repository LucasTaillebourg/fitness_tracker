import { useEffect, useState } from 'react'
import styles from './LoginPage.module.scss'
import { useRegister } from './../../hooks/useRegister'
import { useForm } from '@mantine/form'
import { RegisterForm } from './RegisterForm'
import { Button } from '@mantine/core'

export enum LoginState {
  BASEPAGE = 'BASEPAGE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const LoginPage = () => {
  const [pageState, setPageState] = useState<LoginState>(LoginState.BASEPAGE)

  const { mutate } = useRegister()

  return (
    <div className={styles.loginContainer}>
      {pageState === LoginState.BASEPAGE && (
        <>
          <p className={styles.text}>
            Bienvenue sur l'application Fitness Tracker
          </p>
          <p className={styles.text}>Que souhaitez vous faire</p>
          <div className={styles.buttonContainer}>
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
          </div>
        </>
      )}
      {pageState === LoginState.REGISTER && (
        <RegisterForm onReturn={() => setPageState(LoginState.BASEPAGE)} />
      )}
      {pageState === LoginState.LOGIN && (
        <>
          <p className={styles.text}>
            Saisissez vos informations de connection
          </p>
          <Button
            variant='filled'
            color='gray'
            onClick={() => setPageState(LoginState.BASEPAGE)}
          >
            Retour
          </Button>
        </>
      )}
    </div>
  )
}
