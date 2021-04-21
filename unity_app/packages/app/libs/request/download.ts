/* eslint-disable no-irregular-whitespace */
// this.axios
//         .post(this.baseUrl+"/exportUser", { admin: "",keys: "",keyword:this.keyword,},{responseType: 'blob'})
//         .then(function(response) {
//           var blob = new Blob([response.data])
//           var downloadElement = document.createElement('a');
//       　　var href = window.URL.createObjectURL(blob); //创建下载的链接
//       　　downloadElement.href = href;
//       　　downloadElement.download = '用户数据.xlsx'; //下载后文件名
//       　　document.body.appendChild(downloadElement);
//       　　downloadElement.click(); //点击下载
//       　　document.body.removeChild(downloadElement); //下载完成移除元素
//       　　window.URL.revokeObjectURL(href); //释放掉blob对象 

//           console.log(response);
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
import axios from 'axios'
import { baseUrl } from '@/app/config'
import { addToken } from '@/app/libs/request/utils'

export const downloadInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 3000,
  timeout: 10000, // 请求超时时间是10秒
  // headers: { 'Content-Type': 'multipart/form-data' },
  responseType: 'blob'
})

addToken(downloadInstance)

export const requestDownload = (data: any) => {
  return downloadInstance.request({
    url: '/download',
    method: 'post',
    data,
  })
}
