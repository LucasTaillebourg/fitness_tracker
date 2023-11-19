import axios, { AxiosRequestConfig } from 'axios'

export const axAPI = axios.create({
  baseURL: 'http://localhost:3000/api/',
})

axAPI.interceptors.request.use(async (config) => {
  //const [token] = useRecoilState(TokenAtom)

  config.headers.Authorization = 'token'

  return config
})

export const axiosFetcher = async <T = any>(config: AxiosRequestConfig) =>
  axAPI.request<T>(config)
