import type { QueryKey } from '@tanstack/query-core'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRecoilState } from 'recoil'

import { ConnectedUserAtom } from 'src/atoms/ConnectedUserAtom'
import { axiosFetcher } from '../utils/axiosFetcher'

export const useBearerQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  { headers, ...config }: AxiosRequestConfig<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<TQueryFnData>,
      AxiosError<TError>,
      AxiosResponse<TData>,
      TQueryKey
    >,
    'queryKey' | 'queryFn' | 'initialData'
  >
) => {
  const [connectedUser] = useRecoilState(ConnectedUserAtom)

  const { enabled, ...otherOptions } = options ?? {}
  const apiUrl = 'http://localhost:3000/api/'

  const query = useQuery<
    AxiosResponse<TQueryFnData>,
    AxiosError<TError>,
    AxiosResponse<TData>,
    TQueryKey
  >(
    queryKey,
    () =>
      axiosFetcher<TQueryFnData>({
        baseURL: apiUrl,
        headers: {
          Authorization: connectedUser?.token,
          ...headers,
        },
        ...config,
      }),
    {
      enabled: connectedUser?.token ? enabled : false,
      ...otherOptions,
    }
  )

  return {
    ...query,
    data: query?.data?.data,
  }
}
