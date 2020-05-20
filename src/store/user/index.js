import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'
export default {
    namespaced: true,
    state: {
        //当前登录用户的菜单
        svg: '',
        menu: [],
        gress: [],
        visible: false,
        city: [],
        dynamic: [],
        port: [],
        questions: [],
        url: '',
        treeData: [],
        mailList: [],
        offer: [],
        user: [],
        showUser: [],
        pay: [],
        form: [],


    },
    mutations: {
        setSvg(state, data) {
            state.svg = data
        },
        setMenus(state, data) {
            state.menu = data
        },
        setGress(state, data) {
            state.gress = data
        },
        setVisible(state, data) {
            state.visible = data
        },
        setCity(state, data) {
            state.city = data
        },
        setDynamic(state, data) {
            state.dynamic = data
        },
        setPort(state, data) {
            state.port = data
        },
        setQuestions(state, data) {
            state.questions = data
        },
        setUrl(state, data) {
            state.url = data
        },
        setTreeData(state, data) {
            state.treeData = data
        },
        setMailList(state, data) {
            state.mailList = data
        },
        setOffer(state, data) {
            state.offer = data
        },
        setUser(state, data) {
            state.user = state.showUser = data
        },
        changeUser(state, data) {
            state.showUser = state.user
            if (data == 0) {
                state.showUser = state.user
            } else if (data == 2) {
                state.showUser = state.showUser.filter(item => {
                    return item.state == data
                })
            } else if (data == 1) {
                state.showUser = state.showUser.filter(item => {
                    return item.state != 2
                })
            }
        },
        changeshowUser(state, data) {

            data.map(item => {
                state.showUser.map(item1 => {
                    if (item == item1) {
                        item1.state = 2
                    }
                })
            })
        },
        setPay(state, data) {
            state.pay = data
        },
        addPay(state, data) {
            state.pay.push(data)
        },
        setForm(state, data) {
            state.form = data
        },


    },
    actions: {
        async getCapt({ commit }) {
            let res = await api.getCapt()
            commit('setSvg', res)
        },
        //
        async url({ commit }, params) {
            commit('setUrl', params)
        },
        //注册
        async register({ commit }, params) {
            let res = await api.register(params)

            if (res.code === 200) {
                Message.success(res.msg)
                router.push('/login')
            }

        },
        //短信验证码
        async sendMsg({ commit }, params) {
            let res = await api.sendMsg(params)

            if (res.code === 200) {
                Message.success(res.msg)
            } else {
                Message.info(res.msg)
            }
        },
        //登陆
        async login({ commit, dispatch }, params) {
            let res = await api.login(params)

            if (res.code === 200) {
                Message.success(res.msg)
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('adminToken', 'Bearer ' + res.token)
                router.push('/')
            } else {
                Message.info(res.msg)
                dispatch('getCapt')
            }
        },
        //手机号登录
        async phoneLogin({ commit }, params) {
            let res = await api.phoneLogin(params)

            if (res.code === 200) {
                Message.success(res.msg)
                router.push('/')
            } else {
                Message.info(res.msg)
            }
        },
        //找回密码
        async findPwd({ commit }, params) {
            let res = await api.findPwd(params)

            if (res.code === 200) {
                Message.success(res.msg)
            } else {
                Message.info(res.msg)
            }
        },
        //获取菜单
        async getMenus({ commit }) {
            let res = await api.getMenus()

            if (res.code === 200) {
                commit('setMenus', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //修改密码
        async updatePwd({ commit }, params) {
            let res = await api.updatePwd(params)

            if (res.code === 200) {
                commit('setVisible', true)
                Message.success(res.msg)
            } else {
                Message.error(res.msg)
            }
        },
        //退出
        async logout({ commit }) {
            let res = await api.logout()
            if (res.code === 200) {
                router.push('/login')
                Message.success('欢迎下次光临')
                localStorage.clear()
            } else {
                Message.info(res.msg)
            }
        },

        //进度条数据
        async progress({ commit }) {
            let res = await api.progress()
            console.log(res);
            if (res.code === 200) {
                commit('setGress', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //首页利润
        async cityValue({ commit }) {
            let res = await api.cityValue()

            if (res.code === 200) {
                commit('setCity', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //获取动态
        async getDynamic({ commit }) {
            let res = await api.getDynamic()

            if (res.code === 200) {
                commit('setDynamic', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //发布动态

        async addDynamic({ commit, dispatch }, params) {
            let res = await api.addDynamic(params)

            if (res.code === 200) {
                Message.success(res.msg)
                dispatch('getDynamic')
            } else {
                Message.info(res.msg)
            }
        },
        //动态汇报人
        async report({ commit }) {
            let res = await api.report()

            if (res.code === 200) {

                commit('setPort', res.data)

            } else {
                Message.info(res.msg)
            }
        },

        //问卷
        async question({ commit }) {
            let res = await api.question()

            if (res.code === 200) {
                commit('setQuestions', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //通讯录部门
        async getTreeData({ commit }) {
            let res = await api.getTreeData()

            if (res.code === 200) {
                commit('setTreeData', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //获取通讯录
        async getMailList({ commit }, params) {
            let res = await api.getMailList()

            if (res.code === 200) {
                if (params) {
                    res.data = res.data.filter(item => {
                        return item.department === params
                    })
                }
                commit('setMailList', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //获取offer
        async getOffer({ commit }) {
            let res = await api.getOffer()

            res.data.map(item => {
                if (item.gender == 1) {
                    item.gender = '男'
                } else if (item.gender == 0) {
                    item.gender = '女'
                }

            })
            if (res.code === 200) {
                commit('setOffer', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //获取员工信息
        async getUser({ commit, dispatch }, params) {
            let res = await api.getUser()

            if (res.code === 200) {
                commit('setUser', res.data)
            } else {
                Message.info(res.msg)
            }
        },
        //薪酬信息
        async getPay({ commit }) {
            let res = await api.getPay()

            if (res.code === 200) {
                commit('setPay', res.data)
            } else {
                Message.info(res.msg)
            }
        },


    }
}