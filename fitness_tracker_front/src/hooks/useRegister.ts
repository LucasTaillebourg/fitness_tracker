import { useBearerMutation } from './useBearerMutation'

export interface RegisterPayload {
  username: string
  password: string
}

export const useRegister = () =>
  useBearerMutation(
    (data: RegisterPayload) => ({
      url: `/register`,
      method: 'POST',
      data,
    }),
    {}
  )
