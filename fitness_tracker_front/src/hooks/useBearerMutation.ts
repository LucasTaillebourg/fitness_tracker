import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRecoilState } from 'recoil'
import { ConnectedUserAtom } from '../atoms/ConnectedUserAtom'
import { axiosFetcher } from '../utils/axiosFetcher'

export const useBearerMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = any,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => AxiosRequestConfig<TVariables>,
  {
    ...options
  }: Omit<
    UseMutationOptions<
      AxiosResponse<TData, TVariables>,
      AxiosError<TError>,
      TVariables,
      TContext
    >,
    'mutationFn'
  >
) => {
  const [connectedUser] = useRecoilState(ConnectedUserAtom)
  const { ...otherOptions } = options ?? {}
  const apiUrl = 'http://localhost:3000/api/'

  const mutation = useMutation<
    AxiosResponse<TData, TVariables>,
    AxiosError<TError>,
    TVariables,
    TContext
  >(
    async (variables) => {
      const { headers, ...config } = mutationFn(variables)
      const response = await axiosFetcher<TData>({
        baseURL: apiUrl,
        headers: {
          Authorization: connectedUser?.token,
          ...headers,
        },
        ...config,
      })

      return response
    },
    {
      ...otherOptions,
    }
  )

  return mutation
}
