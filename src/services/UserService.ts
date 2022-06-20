import { AxiosRequestConfig } from 'axios'
import { User } from '../types/User'
import { LoginForm } from '../types/User'
import { AxiosClient } from '../utils/AxiosClient'

const axios = new AxiosClient()
export class UserService {
  public static async all({ config }: { config?: AxiosRequestConfig }): Promise<User[]> {
    return await axios.get<User[]>({ url: '/users', config })
  }

  public static async find({ id, config }: { id: number, config?: AxiosRequestConfig }): Promise<User> {
    return await axios.get<User>({ url: `/users/${id}`, config })
  }

  public static async create({ data, config }: { data: User, config?: AxiosRequestConfig }): Promise<{token: string}> {
    return await axios.post<{token: string}>({ url: '/users', data, config })
  }

  public static async login({ data, config }: { data: LoginForm, config?: AxiosRequestConfig }): Promise<{ token: string }> {
    return await axios.post<{token: string}>({ url: '/login', data, config })
  }
}