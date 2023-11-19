import { Button, Group, Stack, TextInput } from '@mantine/core'
import styles from './LoginPage.module.scss'
import { useForm } from '@mantine/form'
import { useRegister } from '../../hooks/useRegister'
import { useRecoilState } from 'recoil'
import { User } from './LoginPage'
import { ConnectedUserAtom } from '../../atoms/ConnectedUserAtom'
import { toast } from 'react-toastify'

export interface RegisterFormProps {
  onReturn: () => void
}

export const RegisterForm = ({ onReturn }: RegisterFormProps) => {
  const { mutate: register } = useRegister()
  const [, setConnectedUser] = useRecoilState(ConnectedUserAtom)

  const form = useForm<User>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (values: User) => {
    register(values, {
      onSuccess(data: any) {
        setConnectedUser({
          token: data?.data?.user?.token,
          username: data?.data?.user?.name,
        })
      },
      onError(error: any) {
        toast.error(
          `🦄 Impossible de créer votre utilisateur 🦄 : ${error?.response?.data?.error}`
        )
      },
    })
  }

  return (
    <>
      <p className={styles.text}>Inscrivez vous à fitness tracker</p>
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
            S'inscrire
          </Button>
        </Group>
      </form>
    </>
  )
}
