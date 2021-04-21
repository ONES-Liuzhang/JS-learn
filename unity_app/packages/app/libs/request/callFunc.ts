/*
 * axios请求的封装
 */
import axios, { CancelToken, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { baseUrl } from '@/app/config';
import antdv from '@/app/antdv'
import { isPlainObject } from '@/app/libs/util';
import { addToken } from './utils'
const { Cancel } = axios
const { message } = antdv
export interface ICallFuncParam {
  funcName: string;
  [key: string]: any
}
export interface ISuccessData {
  code: string
  data: any
  msg ? : string
}

export interface ICallFunc {
  (data: ICallFuncParam, token ? : CancelToken): Promise < AxiosResponse >
}


// 请求对象
export const axiosInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 3000,
  timeout: 10000, // 请求超时时间是10秒
  headers: { token: 'abc' },
})

// 添加请求拦截器
addToken(axiosInstance)



// 添加响应拦截器
const { interceptors } = axiosInstance
interceptors.response.use(res => {

  const data = res.data as ISuccessData
  if (isPlainObject(data) && data.code) {
    return res
  }
  message.error(`服务器放回数据格式错误, 结果数据不是普通对象`)
  return Promise.reject({ status: res.status, res, data, msg: `服务器放回数据格式错误, 结果数据不是普通对象` });

}, error => {

  const msg = error.message
  if (error.constructor === Cancel) {
    message.error(`取消请求`)
    return Promise.reject({ msg, error });
  }
  const res = error.response
  const req = error.request
  if (!res) {
    message.error(`请求超时`)
    return Promise.reject({ req, res, msg, error });
  }
  message.error(`请求报错, 服务器返回${res.status}`)
  return Promise.reject({ status: res.status, req, msg, error });

});

export const callFunc = (data: ICallFuncParam, token ? : CancelToken) => {
  // if (!data.no) throw new Error('没有指定接口号')
  const config: AxiosRequestConfig = {
    url: '/callFunc',
    method: 'post',
    data,
  }
  if (token) config.cancelToken = token
  const requestInstance = axiosInstance.request(config)
  return requestInstance
}
