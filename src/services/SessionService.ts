import { auth } from '~/utils/auth'
import { AxiosRequestConfig } from 'axios'
import { AxiosClient } from '~/utils/AxiosClient'
import { User, LoginForm } from '~/types/User'

const axios = new AxiosClient()
export class SessionService {
  public static async get(config?: AxiosRequestConfig): Promise<User> {
    return await axios.get<User>({ url: '/session', config: auth(config) })
  }

  public static async login(data?: LoginForm, config?: AxiosRequestConfig): Promise<{ token: string } | undefined> {
    if (!data) return
    return await axios.post<{ token: string }>({ url: '/session', data, config })
  }
}
