import type { QueryKey } from '@tanstack/query-core'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useContext, useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { MessageOptions } from '..'
import { axiosFetcher } from '../axiosFetcher'
import { ApiUrlContext, FizenQueryContext } from '../FizenQueryProvider'
import { useRefresh } from '../login/useLogin'
import { tokenAtom } from '../tokenAtom'

export const useInfiniteBearerQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  { headers, params, ...config }: AxiosRequestConfig<TQueryFnData>,
  options?: Omit<
    UseInfiniteQueryOptions<
      AxiosResponse<HydraCollection<HydraMember & TQueryFnData>>,
      AxiosError<TError>,
      AxiosResponse<HydraCollection<HydraMember & TData>>,
      AxiosResponse<HydraCollection<HydraMember & TQueryFnData>>,
      TQueryKey
    >,
    'queryKey' | 'queryFn'
  > &
    MessageOptions
) => {
  const { onErrorMessage, onSuccessMessage } = useContext(FizenQueryContext)
  const { mutate: refreshToken, isLoading } = useRefresh()
  const token = useRecoilValue(tokenAtom)
  const apiUrl = useContext(ApiUrlContext)

  const { enabled, errorMsg, successMsg, ...otherOptions } = options ?? {}

  const query = useInfiniteQuery<
    AxiosResponse<HydraCollection<HydraMember & TQueryFnData>>,
    AxiosError<TError>,
    AxiosResponse<HydraCollection<HydraMember & TData>>,
    TQueryKey
  >(
    queryKey,
    ({ pageParam = 1 }) =>
      axiosFetcher<HydraCollection<HydraMember & TQueryFnData>>({
        baseURL: apiUrl,
        headers: {
          Authorization: 'Bearer ' + token?.access_token,
          ...headers,
        },
        params: {
          page: pageParam,
          ...params,
        },
        ...config,
      }),
    {
      enabled: token?.access_token ? enabled : false,
      getNextPageParam: (lastPage, pages) =>
        lastPage?.data?.['hydra:view']?.['hydra:next']
          ? (pages?.length ?? 0) + 1
          : undefined,
      ...otherOptions,
    }
  )

  if (!isLoading && !query.isFetching && query.error?.response?.status === 401)
    refreshToken()

  useEffect(() => {
    if (!query.isError) return
    if (errorMsg) onErrorMessage?.(errorMsg)
  }, [query.isError, errorMsg])

  useEffect(() => {
    if (!query.isSuccess) return
    if (successMsg) onSuccessMessage?.(successMsg)
  }, [query.isSuccess, successMsg])

  return {
    ...query,
    data: query?.data?.pages,
    flatData: useMemo(
      () => query?.data?.pages?.flatMap((page) => page?.data['hydra:member']),
      [query.isFetching, ...Object.values(params ?? [])]
    ),
  }
}
