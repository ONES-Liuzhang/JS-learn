# 总纲

[[toc]]

::: tip 
建议用 macbook 开发前端. 
:::

## 使用技术
### 文件查看技术
UI, UE 查看, 全局安装 http-server 运行 [文件](./index.sh)

### vue相关技术
项目依赖
- [vue](https://cn.vuejs.org/)
- [vue-router](/vendor/vue-router/zh/)
- [axios](https://www.kancloud.cn/yunye/axios/234845)
- [vue-property-decorator](https://segmentfault.com/a/1190000019906321)

::: warning
本项目没用使用 vuex 进行状态管理,  用` Vue.observable `替代
:::

### 代码检查技术
项目依赖[eslint](https://eslint.bootcss.com/)对js, jsx, ts, tsx, json等文件进行文件规范检查,
相关配置文件 ` .eslintrc.js ` `.eslintignore`

### 文档编写
文档使用[Markdown](./markdown.md)技术进行编写.

### jsx 技术
所有vue组件都采用 jsx/tsx 的形式编写

### antdv 组件
项目将antdv的源文件拷贝进来(位于base模块下面的 antdv文件夹下面), 方便按需引入, 以及自定义样式修改
antdv组件的使用参考  <https://www.antdv.com/docs/vue/introduce/>

### typescript 技术
项目依赖 [typescript](http://www.typescriptlang.org/) 开发

### css 技术
采用 [less](http://lesscss.cn/), 同时引入less 模块化技术解决命名冲突问题, 并简化编程\




## 文件

[普通组件](../packages/demo/copy/普通组件.tsx)
[函数组件](../packages/demo/copy/函数组件.tsx)



### 其他
- 接口服务器, 项目下面的接口文件夹
- demo 案例 <http://localhost:3000/##/main/demo>


## 待解决的问题
:::danger
- 复核页面的组件引用问题
- Nginx的图片保存
:::

