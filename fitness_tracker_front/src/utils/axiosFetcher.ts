import axios, { AxiosRequestConfig } from 'axios'
import { useRecoilState } from 'recoil'
import { TokenAtom } from '../atoms/TokenAtom'

export const axAPI = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

axAPI.interceptors.request.use(async (config) => {
  //const [token] = useRecoilState(TokenAtom)

  config.headers.Authorization = 'token'
  console.log({ config, t: 'token' })

  return config
})

export const axiosFetcher = async <T = any>(config: AxiosRequestConfig) =>
  axAPI.request<T>(config)
