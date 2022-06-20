import { Task } from '~/types/Task'
import { auth } from '~/utils/auth'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { AxiosClient } from '~/utils/AxiosClient'

const axios = new AxiosClient()
export class TaskService {
  public static async all({ config }: { config?: AxiosRequestConfig }): Promise<Task[]> {
    return await axios.get<Task[]>({ url: '/tasks', config: auth(config) })
  }

  public static async find({ id, config }: { id: number, config?: AxiosRequestConfig }): Promise<Task> {
    return await axios.get<Task>({ url: `/tasks/${id}`, config: auth(config) })
  }

  public static async create({ data, config }: { data: Task, config?: AxiosRequestConfig }): Promise<void> {
    return await axios.post<void>({ url: '/tasks', data, config: auth(config) })
  }

  public static async delete({ id, config }: { id: number, config?: AxiosRequestConfig }): Promise<void> {
    return await axios.delete<void>({ url: `/tasks/${id}`, config: auth(config) })
  }
}

export const useTasks = <T>(
  { config, swrConfig }: { config?: AxiosRequestConfig ,swrConfig?: SWRConfiguration }
): SWRResponse<T> => {
  return useSWR('/tasks', async () => await TaskService.all({ config }), { ...swrConfig })
}