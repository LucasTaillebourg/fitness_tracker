import { Button, Group, Stack, TextInput } from '@mantine/core'
import styles from './LoginPage.module.scss'
import { useForm } from '@mantine/form'
import { useRecoilState } from 'recoil'
import { User } from './LoginPage'
import { useLogin } from '../../hooks/useLogin'
import { ConnectedUserAtom } from '../../atoms/TokenAtom'
import { toast } from 'react-toastify'

export interface RegisterFormProps {
  onReturn: () => void
}

export const LoginForm = ({ onReturn }: RegisterFormProps) => {
  const { mutate: login } = useLogin()
  const [, setConnectedUser] = useRecoilState(ConnectedUserAtom)

  const form = useForm<User>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: User) => {
    login(values, {
      onSuccess(data) {
        setConnectedUser({
          token: data?.data?.token,
          username: data?.data?.name,
        })
      },
      onError() {
        toast.error('🦄 Informations de connexion erronées, LOOOOOOOSER 🦄')
      },
    })
  }

  return (
    <>
      <p className={styles.text}>Saisissez vos informations de connexion : </p>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap='sm'>
          <TextInput
            withAsterisk
            label='Username'
            placeholder="Votre nom d'utilisateur"
            {...form.getInputProps('username')}
          />
          <TextInput
            withAsterisk
            label='Mot de passe'
            placeholder='Votre mot de passe'
            {...form.getInputProps('password')}
          />
        </Stack>
        <Group justify='space-between' mt='md'>
          <Button variant='filled' color='gray' onClick={onReturn}>
            Retour
          </Button>
          <Button variant='filled' color='gray' type='submit'>
            Se connecter
          </Button>
        </Group>
      </form>
    </>
  )
}
