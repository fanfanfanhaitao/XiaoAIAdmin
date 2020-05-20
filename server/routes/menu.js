let menus = [{
        name: '首页',
        icon: 'el-icon-location',
        url: '/',
        enName: 'dashboard',
        children: []
    },
    {
        name: '日程管理',
        icon: 'el-icon-date',
        url: '/calendar',
        enName: 'calendar',
        children: []
    },
    {
        name: '通讯录',
        icon: 'el-icon-document',
        url: '/maillist',
        enName: 'mailList',
        children: []
    },
    {
        name: '组织员工',
        icon: 'el-icon-user',
        url: '/organization',
        enName: 'organize',
        children: [{
                name: 'offer管理',
                icon: 'el-icon-c-scale-to-original',
                url: '/organization/offer',
                enName: 'offer',
            },
            {
                name: '人员信息',
                icon: 'el-icon-folder-checked',
                url: '/organization/userInfo',
                enName: 'userInfo',
            },
            {
                name: '薪酬管理',
                icon: 'el-icon-coin',
                enName: 'payMent',
                url: '/organization/pay',
            }
        ]
    },
    {
        name: '表单页',
        icon: 'el-icon-files',
        url: '/form',
        enName: 'form',
        children: [{
            name: '分步表单',
            icon: 'el-icon-edit',
            enName: 'stepForm',
            url: '/form/stepForm',
        }]
    },
]

module.exports = menus