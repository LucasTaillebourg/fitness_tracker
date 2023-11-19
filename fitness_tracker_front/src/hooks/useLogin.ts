import { useBearerMutation } from './useBearerMutation'

export interface LoginPayload {
  username: string
  password: string
}

export const useLogin = () =>
  useBearerMutation(
    (data: LoginPayload) => ({
      url: `/login`,
      method: 'POST',
      data,
    }),
    {}
  )
