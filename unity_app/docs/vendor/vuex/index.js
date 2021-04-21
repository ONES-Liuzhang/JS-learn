
const base = '/vendor/vuex/zh/'

module.exports = {
  base,
  locales: {
    title: 'Vuex',
    description: 'Centralized State Management for Vue.js',
  },

  themeConfig: {
    locales: {

      label: 'Vuex',
      selectText: '选择文档',
      editLinkText: '在 GitHub 上编辑此页',
      nav: [
        {
          text: '指南',
          link: `${base}guide/`,
        },
        {
          text: 'API 参考',
          link: `${base}api/`,
        },
        {
          text: '更新记录',
          link: 'https://github.com/vuejs/vuex/releases',
        },
      ],
      sidebar: {

        [`${base}guide/`]: [
          'instruction.md',
          'installation.md',
          '',
          {
            title: '核心概念',
            collapsable: false,
            children: [
              'state.md',
              'getters.md',
              'mutations.md',
              'actions.md',
              'modules.md',
            ],
          },
          'structure',
          'plugins',
          'strict',
          'forms',
          'testing',
          'hot-reload',
        ],
      },
    },

  },
}
