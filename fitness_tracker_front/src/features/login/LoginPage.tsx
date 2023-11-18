import { useEffect, useState } from 'react'
import { Button } from '../../component'
import styles from './LoginPage.module.scss'
import { useRegister } from './../../hooks/useRegister'

export enum LoginState {
  BASEPAGE = 'BASEPAGE',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const LoginPage = () => {
  const [pageState, setPageState] = useState<LoginState>(LoginState.BASEPAGE)

  const { mutate } = useRegister()

  useEffect(() => {
    if (pageState === LoginState.REGISTER) {
      mutate({ username: 'user1', password: 'test' })
    }
  }, [pageState])

  return (
    <div className={styles.loginContainer}>
      {pageState === LoginState.BASEPAGE && (
        <>
          <p className={styles.text}>
            Bienvenue sur l'application Fitness Tracker
          </p>
          <p className={styles.text}>Que souhaitez vous faire</p>
          <div className={styles.buttonContainer}>
            <Button onClick={() => setPageState(LoginState.REGISTER)}>
              S'inscrire
            </Button>
            <Button onClick={() => setPageState(LoginState.LOGIN)}>
              Se connecter
            </Button>
          </div>
        </>
      )}
      {pageState === LoginState.REGISTER && (
        <>
          <p className={styles.text}>Merci de vous inscrire a fitness tracer</p>
          <Button onClick={() => setPageState(LoginState.BASEPAGE)}>
            Retour
          </Button>
        </>
      )}
      {pageState === LoginState.LOGIN && (
        <>
          <p className={styles.text}>
            Saisissez vos informations de connection
          </p>
          <Button onClick={() => setPageState(LoginState.BASEPAGE)}>
            Retour
          </Button>
        </>
      )}
    </div>
  )
}
