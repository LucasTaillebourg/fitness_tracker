import { Button } from '../../component'
import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <div className={styles.loginContainer}>
      <p className={styles.text}>Bienvenue sur l'application Fitness Tracker</p>
      <p className={styles.text}>Que souhaitez vous faire</p>
      <div className={styles.buttonContainer}>
        <Button onClick={() => {}}>S'inscrire</Button>
        <Button onClick={() => {}}>Se connecter</Button>
      </div>
    </div>
  )
}
