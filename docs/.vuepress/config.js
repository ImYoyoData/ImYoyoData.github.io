module.exports = {
    title: 'Yoyo of docs',
    description: '文档是开发坚强的后盾！',
    base: '/',
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
            { text: 'Yoyo的github', link: 'https://github.com/ImYoyoData' },
            { text: 'LL官方文档', link: 'https://docs.litebds.com/' },
            { text: '百度', link: 'https://www.baidu.com' },
        ]
    }
}
