import axios, { AxiosRequestConfig } from 'axios'

export const axAPI = axios.create()

export const axiosFetcher = async <T = any>(config: AxiosRequestConfig) =>
  axAPI.request<T>(config)
