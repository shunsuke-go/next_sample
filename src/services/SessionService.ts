import { auth } from '~/utils/auth'
import { AxiosRequestConfig } from 'axios'
import { AxiosClient } from '~/utils/AxiosClient'
import { User } from '~/types/User'

const axios = new AxiosClient()
export class SessionService {
  public static async get({ config }: { config?: AxiosRequestConfig }): Promise<User> {
    return await axios.get<User>({ url: '/session', config: auth(config) })
  }
}
