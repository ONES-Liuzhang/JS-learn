const base = '/vendor/vuepress/'

function getApiSidebar() {
  return ['cli', 'node']
}

function getGuideSidebar(groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy',
      ],
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed',
      ],
    },
  ]
}

// const officalPlugins = fs
//   .readdirSync(path.resolve(__dirname, '../plugin/official'))
//   .map(filename => 'official/' + filename.slice(0, -3))
//   .sort()

function getPluginSidebar(pluginTitle, pluginIntro, officialPluginTitle) {
  return [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api',
      ],
    },
    // {
    //   title: officialPluginTitle,
    //   collapsable: false,
    //   children: officalPlugins,
    // },
  ]
}

function getThemeSidebar(groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'blog-theme',
        'inheritance',
      ],
    },
  ]
}

module.exports = {
  base,
  locales: {
    title: 'VuePress',
    description: 'Vue 驱动的静态网站生成器',
  },
  themeConfig: {
    locales: {
      label: 'vuepress',
      selectText: '文档列表',
      ariaLabel: '选择语言',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdated: '上次更新',
      nav: require('./.vuepress/nav/zh'),
      sidebar: {
        [`${base}zh/api/`]: getApiSidebar(),
        [`${base}zh/guide/`]: getGuideSidebar('指南', '深入'),
        [`${base}zh/plugin/`]: getPluginSidebar('插件', '介绍', '官方插件'),
        [`${base}zh/theme/`]: getThemeSidebar('主题', '介绍'),
      },
    },
  },
}
