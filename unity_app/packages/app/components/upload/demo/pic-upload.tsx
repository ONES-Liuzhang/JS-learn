import { Component, Vue, Watch } from 'vue-property-decorator'
import style from './index.module.less'
import FileUpload from '@/app/components/upload/file-upload'
import FileListUpload from '@/app/components/upload/file-list-upload'

import Block from '@/demo/components/block'

@Component({})
export default class PicUploadDemo extends Vue {
  private render(h: CreateElement) {
    return <div>
      <Block title='图片上传案例'>
        <FileUpload
          accept='image/*'
          placeholder='身份证正面'
          customRequest={(formData: FormData) => {
            // 自定义上传方法, 如果和beforeUpload一起用, beforeUpload会不起作用
            console.log(formData)

            return Promise.resolve({
              status: 200,
              data: {
                code: '0000',
                data: {
                  //
                  path: 'http://localhost:8888/upload/upload_d3f174bcbbdde90c40c9a0bdceed297a.jpeg',
                },
              },
            })
          }}
          onChange={(data: Upload.IFileMeta) => {
            console.log(data)
          }}
        ></FileUpload>
        <FileUpload

          accept='image/*'
          beforeUpload={(formData: FormData) => {
            // 上传之前对上传参数做处理
            formData.append('id', '3242424')
            return formData
          }}
          onChange={(data: Upload.IFileMeta) => {
            console.log(data)
          }}
        ></FileUpload>



        <div>选择多张图片</div>
        <FileListUpload

          accept='image/*'
          value={[
            {
              id: '8f38f83a-95c2-4f12-8c6d-23ad7e8f7e97',
              name: 'WechatIMG106.jpeg',
              status: 'done',
              url: 'http://localhost:8888/upload/upload_d3f174bcbbdde90c40c9a0bdceed297a.jpeg',
            },
          ]}
          onChange={(data: Upload.IFileMeta) => {
            console.log('多张图片', data)

          }}
          max={3}
        ></FileListUpload>
      </Block>
      <Block title='仅支持上传pdf'>
        <FileUpload
          accept='.pdf'
          onChange={(data: Upload.IFileMeta) => {
            console.log(data)

          }}
        ></FileUpload>
      </Block>
      <Block title='支持上传所有文件文件'>
        <FileUpload
          // accept='image/*'
          onChange={(data: Upload.IFileMeta) => {
            console.log(data)

          }}
        ></FileUpload>
      </Block>
    </div>
  }
}
