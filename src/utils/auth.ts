import { parseCookies } from 'nookies'
import { AxiosRequestConfig } from 'axios'

export const auth = (config: AxiosRequestConfig = {}) => {
  const cookies = parseCookies()
  if (!cookies.token) return config
  config.headers = {}
  config.headers.Authorization = `Bearer ${cookies.token}`
  return config
}
