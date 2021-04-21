import axios, { CancelToken, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { getToken } from '@/app/libs/cookies'


export function addToken(instance: AxiosInstance) {
  const { interceptors } = instance
  interceptors.request.use(config => {
    config.headers.token = getToken()
    return config;
  }, error => {
    return Promise.reject(error);
  });
}
