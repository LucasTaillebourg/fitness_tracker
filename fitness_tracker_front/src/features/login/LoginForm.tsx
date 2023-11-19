import { Button, Group, Stack, TextInput } from '@mantine/core'
import styles from './LoginPage.module.scss'
import { useForm } from '@mantine/form'
import { useRecoilState } from 'recoil'
import { TokenAtom } from '../../atoms/TokenAtom'
import { User } from './LoginPage'
import { useLogin } from '../../hooks/useLogin'

export interface RegisterFormProps {
  onReturn: () => void
}

export const LoginForm = ({ onReturn }: RegisterFormProps) => {
  const { mutate: login } = useLogin()
  const [, setToken] = useRecoilState(TokenAtom)

  const form = useForm<User>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: User) => {
    login(values, {
      onSuccess(data) {
        setToken(data?.data?.token)
      },
    })
  }

  return (
    <>
      <p className={styles.text}>Saisissez vos informations de connection : </p>
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
