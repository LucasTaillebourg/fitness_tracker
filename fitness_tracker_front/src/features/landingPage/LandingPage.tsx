import { useRecoilState } from 'recoil'
import { ConnectedUserAtom } from '../../atoms/TokenAtom'
import styles from './LandingPage.module.scss'
import { Button, Group } from '@mantine/core'

export const LandingPage = () => {
  const [connectedUser] = useRecoilState(ConnectedUserAtom)

  return (
    <div className={styles.container}>
      {connectedUser && (
        <>
          <p className={styles.text}>
            Bonjour {connectedUser?.username}, bienvenue sur Fitness Tracker.
          </p>
          <p className={styles.text}>Que souhaitez vous faire ? </p>
          <Group justify='space-between' mt='md'>
            <Button variant='filled' color='gray'>
              Nouvel entrainement
            </Button>
            <Button variant='filled' color='gray'>
              Voir les entrainements
            </Button>
          </Group>
        </>
      )}
    </div>
  )
}
