const locales = {
  '/': {
    title: '行E通门户',
    description: 'The etbank doc.'
  },
}

const themeConfigLocales = {
  '/': {
    label: '行E通门户',
    selectText: '文档列表',
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      {
        text: '码云仓库',
        link: 'https://gitee.com/rogen1991/etbank.git'
      },
      {
        text: 'iconfont',
        link: 'https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=1194299&keyword=&project_type=&page='
      },
    ],
    sidebar: [
      '/',    // 介绍
      {
        title: '知识储备',
        collapsable: true,
        children: [
          '/guide/learn/',   // 学习
          '/guide/learn/vscode.md',  // md 文档的学习
          '/guide/learn/markdown.md',  // md 文档的学习

        ]
      },
      {
        title: '开发规范',
        collapsable: true,
        children: [
          '/guide/standard/',
          '/guide/standard/dir',
          '/guide/standard/component',
          '/guide/standard/js',
          '/guide/standard/css',
          '/guide/standard/icon',

        ]
      },
      {
        title: '基础模块',
        collapsable: true,
        children: [
          '/base/home/',
          '/base/layout/'
        ]
      },

    ]
  },
}

const list = [
  require('../vendor/vuepress'),
  require('../vendor/vue-cli'),
  require('../vendor/vue-router'),
  require('../vendor/vuex'),

]
list.forEach(item => {
  locales[item.base] = item.locales
  themeConfigLocales[item.base] = item.themeConfig.locales
})

module.exports = {
  locales,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  lastUpdated: 'Last Updated', // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
  serviceWorker: true,
  themeConfig: {
    docsDir: 'docs',
    locales: themeConfigLocales,
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
  ]
}

