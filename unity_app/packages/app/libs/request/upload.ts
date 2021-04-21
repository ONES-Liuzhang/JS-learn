import axios from 'axios'
import { baseUrl } from '@/app/config';
import { addToken } from '@/app/libs/request/utils'
export const uploadInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 3000,
  timeout: 10000, // 请求超时时间是10秒
  headers: { 'Content-Type': 'multipart/form-data' },

})
addToken(uploadInstance)

export const requestUpload = (data: FormData) => {
  return uploadInstance.request({
    url: '/upload',
    method: 'post',
    data,
  })
}
