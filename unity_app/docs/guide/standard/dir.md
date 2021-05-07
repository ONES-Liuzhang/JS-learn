# 文件目录规范

[[toc]]

## 约定
文件夹类型包括`模块文件夹`, `页面集合文件夹`, `页面文件夹`,  `组件集合文件`,`组件文件夹`.

每个文件夹下面都应该包括`index.ts`文件, 用于导出对应功能需要导出的东西. 针对集合类文件夹在index.ts文件中需要导出下面子文件夹的所有信息, 推荐通过 [require.context]() 的方式进行导出, 具体参见 `myMenu` 文件夹

文件的命名采用`驼峰命名`

## 项目整体目录结构

::: vue
.
├── .vscode _(**vscode相关的配置文件**)_
│   ├── bookmarks.json _(**vscode bookmarks插件引用文件**)_
│   ├── launch.json _(**用于调试nodejs的文件的配置**)_
│   └── setting.json _(**vscode相关项目级配置文件**)_
│ 
├── dist _(**项目打包的输出文件**)_
├── doc _(**所有项目的相关文档, 包括UI,UE,设计文档等**)_
├── docs _(**项目的开发文件, 依赖vuepress开发运行**)_
├── node_modules _(**项目的依赖目录**)_
├── public _(**项目的公共文件: 打包后直接复制到`dist`文件夹下面**)_
├── server _(**nodejs服务器源文件: 用于辅助前端开发的接口调用及造数据**)_
├── svg _(**项目引用的所有svg图标的位置**)_
├── tests _(**jest代码测试文件**)_ 目前没有使用
│ 
├── packages _(**模块目录**)_
│   ├── `app` _(**app模块:用于对其他所用模块的调用**)_
│   ├── `base` _(**基础模块:用于其他模块的调用**)_
│   ├── `demo` _(**demo模块: 用于代码的演示**)_
│   ├── `member` _(**会员中心模块: 显示会员中心下面的所有页面**)_
│   ├── `user` _(**用户模块: 用于查看用户相关的页面**)_
│   ├── `types` _(**定义的全局的typescript的声明**)_
│   ├── `vender` _(**webpack打包的第三方插件,用于测试环境和生产环境**)_
│   ├── index.d.ts _(**typescript全局类型导出文件**)_
│   └── main.ts _(**项目的主要出口**)_
│ 
├── .gitignore _(**git忽略上传的配置文件**)_
├── babel.config.js _(**babel配置文件**)_
├── jest.config.js _(**jest的配置文件**)_ 目前没有使用
├── README.md _(**项目的说明文件**)_
├── tsconfig.json _(**typscript的配置文件**)_
├── vue.config.js _(**vue-cli配置文件: 引入`vue.config`文件夹里面的配置**)_
└── package.json _(**项目的配置文件**)_
:::

## 模块的目录结构
现有的项目模块包括 `app`, `base`, `member`, `demo`, `user` 等, 以`member`模块为例说明一下模块的目录


### base模块目录结构
base模块是项目所有的基础功能的源文件.
::: vue
.
├── base _(**模块根目录**)_
│   ├── `src` _(**源文件目录**)_
│   │   ├── `layout`  _(**项目的布局页面, 具体参见[总布局](/base/layout)**)_
│   │   ├── `antdv`  _(**antdv组件的源文件目录, 可以查看[antdv的文档](https://www.antdv.com/docs/vue/introduce/)了解组件使用方法**)_
│   │   ├── `app`  _(**app组件源文件**)_
│   │   ├── `config`  _(**项目的环境配置文件夹, 在组件里面可以通过`this.$config`来获取配置**)_
│   │   ├── `home`  _(**项目的主页的源文件**)_
│   │   ├── `information`  _(**项目资讯页面的源文件**)_
│   │   ├── `login`  _(**登入相关功能文件夹**)_
│   │   ├── `register`  _(**注册相关功能文件夹**)_
│   │   ├── `mixins`  _(**vue组件的公共混入文件夹**)_
│   │   ├── `store`  _(**vue的共享状态文件夹**)_
│   │   ├── `styles`  _(**项目公共页样式文件夹**)_
│   │   └── `libs`  _(**项目工具包目录文件夹**)_
│   │   
│   ├── 基础模块.md  _(**模块的说明文件**)_
│   ├── package.json  _(**模块的导出配置**)_
│   └── index.ts  _(**模块导出文件**)_
│ 
└── `...`  _(**其他模块**)_

:::



### member模块目录结构
会员中心模块相关页面, 及所有页面的公共源文件
::: vue
.
├── member _(**模块根目录**)_
│   ├── `src` _(**源文件目录**)_
│   │   ├── `layout`  _(**布局页面**)_
│   │   ├── `page`  _(**页面文件夹**)_
│   │   │   ├── `main`  _(**主页面**)_
│   │   │   ├── `browseHistory`  _(**历史记录页面**)_
│   │   │   ├── `myMenu`  _(**我的菜单页面集合, 下面包含页面文件夹集合**)_
│   │   │   └── `...` _(**其他页面**)_
│   │   ├── `mixin`  _(**模块下面一些公共页面抽离出来的mixin, 可选项**)_
│   │   ├── `store`  _(**模块下面一些公共页面抽离出来的状态store, 可选项**)_
│   │   └── `utils`  _(**模块的工具文件夹**)_
│   │   
│   ├── 会员专区模块.md  _(**模块的说明文件**)_
│   ├── package.json  _(**模块的导出配置**)_
│   └── index.ts  _(**模块导出文件**)_
│ 
└── `...`  _(**其他模块**)_

:::

### user 模块文件夹目录结构
用户相关页面

### demo 模块文件夹目录结构
demo相关页面

## 页面文件夹目录结构
包括一个页面功能块所需的所有文件及组件, 每个页面都一定会导出页面的路由列表, 页面下面的子页面的路由都会添加到导出路由列表里面, 以 `approveFlow` 为例
::: vue
.
├── approveFlow _(**页面文件夹**)_
│   ├── `components` _(**当前页面拆分出的组件文件夹**)_
│   ├── `addApproveFlow` _(**添加审批流页面, 当前审批流的下属页面**)_
│   ├── `desApproveFlow` _(**审批流详情页面, 当前审批流的下属页面**)_
│   ├── approveFlow.tsx _(**页面组件代码部分**)_
│   ├── 审批流.md  _(**页面的说明文件**)_
│   ├── index.module.less  _(**页面的样式文件, 可选**)_
│   └── index.ts  _(**页面导出文件,包括页面的路由,菜单等一些信息**)_
│ 
└── `...`  _(**其他页面**)_

:::

## 组件的目录结构
::: tip
组件可以是文件夹的新式也可以是文件的形式
:::
::: vue
.
├── 组件文件夹名 _(**页面文件夹**)_
│   ├── 组件名.jsx _(**组件的源文件**)_
│   ├── index.module.less _(**组件的样式文件, 可选**)_
│   └── index.ts  _(**页面导出文件,包括页面的路由,菜单等一些信息**)_
│
└── `...`  _(**其他组件**)_

:::
