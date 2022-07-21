module.exports = {
    title: '遂宁之窗，让生活充满阳光！',
    description: '文档是开发坚强的后盾！',
    base: '/vuepress-starter/',
    markdown: {
        lineNumbers: true
    },
    plugins:{
        // 'vuepress-plugin-auto-sidebar':{},
        'autobar':{},
        '@vuepress/back-to-top':{},
        '@vuepress/active-header-links':{}
    },
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' },
        ]
    }
}