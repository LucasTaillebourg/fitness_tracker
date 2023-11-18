import styles from './LoginPage.module.scss'

export const LoginPage = () => {
  return (
    <div className={styles.title}>
      <p>Bienvenue sur l'application Fitness Tracker</p>
      <p>Que voulez vous faire</p>
      <button>S'inscrire</button>
      <button>Se connecter</button>
    </div>
  )
}
