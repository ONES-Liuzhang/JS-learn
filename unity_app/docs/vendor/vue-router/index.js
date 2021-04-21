const base = '/vendor/vue-router/zh/'

module.exports = {
  base,
  locales: {
    title: 'Vue Router',
    description: 'The official router for Vue.js.',
  },
  themeConfig: {
    locales: {
      label: 'Vue Router',
      selectText: '文档列表',
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
          link: 'https://github.com/vuejs/vue-router/releases',
        },
      ],
      sidebar: {
        // [`${base}`]: [
        //   '',
        //   'installation.md',
        // ],
        [`${base}guide/`]: [
          'installation.md',
          {
            title: '基础',
            collapsable: false,
            children: [
              '',
              'essentials/dynamic-matching.md',
              'essentials/nested-routes.md',
              'essentials/navigation.md',
              'essentials/named-routes.md',
              'essentials/named-views.md',
              'essentials/redirect-and-alias.md',
              'essentials/passing-props.md',
              'essentials/history-mode.md',
            ],
          },
          {
            title: '进阶',
            collapsable: false,
            children: [
              'advanced/navigation-guards.md',
              'advanced/meta.md',
              'advanced/transitions.md',
              'advanced/data-fetching.md',
              'advanced/scroll-behavior.md',
              'advanced/lazy-loading.md',
            ],
          },
        ],
      },
    },
  },
}
