import { useMutation } from 'react-query'
import { axiosFetcher } from '../utils/axiosFetcher'

export interface RegisterPayload {
  username: string
  password: string
}

export const useLogin = () => {
  return useMutation((payload: RegisterPayload) =>
    axiosFetcher({
      method: 'POST',
      url: `login`,
      data: payload,
    })
  )
}
