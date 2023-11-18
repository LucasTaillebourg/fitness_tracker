import axios, { AxiosRequestConfig } from 'axios'
import { useRecoilState } from 'recoil'
import { TokenAtom } from 'src/atoms/TokenAtom'

export const axAPI = axios.create({
  baseURL: '/api/',
})

axAPI.interceptors.request.use(async (config) => {
  const [token] = useRecoilState(TokenAtom)

  config.headers.Authorization = token

  return config
})

export const axiosFetcher = async <T = any>(config: AxiosRequestConfig) =>
  axAPI.request<T>(config)
