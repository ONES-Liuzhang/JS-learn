
const base = '/vendor/vue-cli/zh/'

module.exports = {
  base,
  locales: {
    title: 'Vue CLI',
    description: '🛠️ Vue.js 开发的标准工具',
  },
  themeConfig: {
    locales: {
      label: 'Vue CLI',
      selectText: '文档列表',
      lastUpdated: '上次编辑时间',
      editLinkText: '在 GitHub 上编辑此页',
      nav: [
        {
          text: '指南',
          link: `${base}guide/`,
        },
        {
          text: '配置参考',
          link: `${base}config/`,
        },
        {
          text: '插件开发指南',
          items: [
            { text: '插件开发指南', link: base + 'dev-guide/plugin-dev.md' },
            { text: 'UI 插件信息', link: base + 'dev-guide/ui-info.md' },
            { text: 'UI 插件 API', link: base + 'dev-guide/ui-api.md' },
            { text: 'UI 本地化', link: base + 'dev-guide/ui-localization.md' },
          ],
        },
        {
          text: '插件',
          items: [
            { text: 'Babel', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-babel/README.md' },
            { text: 'TypeScript', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-typescript/README.md' },
            { text: 'ESLint', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-eslint/README.md' },
            { text: 'PWA', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md' },
            { text: 'Jest', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-unit-jest/README.md' },
            { text: 'Mocha', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-unit-mocha/README.md' },
            { text: 'Cypress', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-e2e-cypress/README.md' },
            { text: 'Nightwatch', link: 'https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-e2e-nightwatch/README.md' }
          ],
        },
        {
          text: '更新记录',
          link: 'https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md',
        },
      ],
      sidebar: {
        [`${base}guide/`]: [
          '',
          'installation',
          {
            title: '基础',
            collapsable: false,
            children: [
              'prototyping',
              'creating-a-project',
              'plugins-and-presets',
              'cli-service',
            ],
          },
          {
            title: '开发',
            collapsable: false,
            children: [
              'browser-compatibility',
              'html-and-static-assets',
              'css',
              'webpack',
              'mode-and-env',
              'build-targets',
              'deployment',
            ],
          },
        ],
        [`${base}dev-guide/`]: [
          'plugin-dev.md',
          {
            title: 'UI 开发',
            collapsable: false,
            children: [
              'ui-info.md',
              'ui-api.md',
              'ui-localization.md',
            ],
          },
        ],
      },
    },
  },
}
