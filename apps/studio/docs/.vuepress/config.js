// .vuepress/config.js
module.exports = {
  title: 'SQL Code',
  description: 'Documentation & Support for SQL Code, the cross-platform SQL editor and database manager.',
  themeConfig: {
    logo: '/bk-logo-yellow-icon.svg',
    nav: [
      { text: 'User Guide', link: '/installation/' },
      { text: 'Troubleshooting', link: '/troubleshooting/' },
      { text: 'Contact', link: '/contact/' },
      { text: 'Homepage', link: 'https://sqlcode.io' }
    ],
    sidebar: [
      ['/', 'Overview'],
      '/installation/',
      '/guide/',
      '/team_workspaces/',
      '/troubleshooting/'
    ]
  }
}
