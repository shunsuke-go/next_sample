import { auth } from '~/utils/auth'
import { AxiosRequestConfig } from 'axios'
import { AxiosClient } from '~/utils/AxiosClient'
import { User, LoginForm } from '~/types/User'

const axios = new AxiosClient()
export class SessionService {
  public static async get({
    config
  }: {
    config?: AxiosRequestConfig
  }): Promise<User> {
    return await axios.get<User>({ url: '/session', config: auth(config) })
  }

  public static async login({
    data,
    config
  }: {
    data: LoginForm;
    config?: AxiosRequestConfig
  }): Promise<{ token: string }> {
    return await axios.post<{ token: string }>({ url: '/session', data, config })
  }
}
