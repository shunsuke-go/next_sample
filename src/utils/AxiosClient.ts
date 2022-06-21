import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class AxiosClient {
  axiosInstance: AxiosInstance
  constructor () {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ROOT,
      withCredentials: true,
      headers: {
        accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    this.axiosInstance.interceptors.request.use((config) => {
      console.log(`Request to: ${config.url ?? 'something'}`)
      return config
    })
    this.axiosInstance.interceptors.response.use((config) => {
      console.log(`Response Status Code: ${config.status}`)
      return config
    })
  }

  public async get<T> ({
    url,
    config
  }: {
    url: string;
    config?: AxiosRequestConfig;
  }) {
    const res = await this.axiosInstance.get<T>(url, config)
    return res.data
  }

  public async post<T> ({
    url,
    data,
    config
  }: {
    url: string;
    data: {};
    config?: AxiosRequestConfig;
  }) {
    const res = await this.axiosInstance.post<T>(url, data, config)
    return res.data
  }

  public async delete<T> ({
    url,
    config
  }: {
    url: string;
    config?: AxiosRequestConfig;
  }) {
    const res = await this.axiosInstance.delete<T>(url, config)
    return res.data
  }

  public async patch<T extends void> ({
    url,
    data,
    config
  }: {
    url: string;
    data: {};
    config?: AxiosRequestConfig;
  }) {
    const res = await this.axiosInstance.patch<T>(url, data, config)
    return res.data
  }
}
