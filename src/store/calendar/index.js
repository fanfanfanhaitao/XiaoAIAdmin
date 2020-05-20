import api from '../../http/api'
import { Message, MessageBox } from 'element-ui'
import router from '../../router'
import Dayjs from 'dayjs'

export default {
    namespaced: true,
    state: {
        // 日历配置
        config: {
            defaultView: "month", //默认按月显示
            lunarCalendar: true, // 控制是否显示中国农历显示： true
            // 设置日历的头部按钮文字
            buttonText: {
                today: "今天",
                month: "月",
                week: "周",
                day: "日"
            },
            // 头部
            header: {
                left: "prevYear, prev, next, nextYear , today",
                center: "title",
                right: "month,agendaWeek,agendaDay"
            },
            aspectRatio: 2, // 日历的宽高比
            allDaySlot: true, // 周，日状态下 是否显示全天
            allDayText: "全天", // 设置日历头部“all-day”文本信息
            timezone: "local", // 时区默认本地的
            slotLabelFormat: "HH:mm", // 设置日历y轴上显示的时间文本格式
            // displayEventEnd: true, // 事件里面显示结束时间
            // eventLimit: true, // 限制显示的事件数量
            // views: {
            //     agenda: {
            //         eventLimit: 3 // adjust to 2 only for agendaWeek/agendaDay
            //     }
            // }
        },
        // 日历事件列表
        events: [],
        // 日程表单
        calendarForm: {
            schedule: "",
            startTime: "",
            endTime: "",
            users: []
        },
    },
    mutations: {
        clearForm(state, data) {
            state.calendarForm = {
                schedule: "",
                startTime: "",
                endTime: "",
                users: [data]
            }
        },
        setEvents(state, data) {
            state.events = data
        }

    },
    actions: {
        // 添加日程
        async addCalendar({ commit, dispatch }, params) {
            let res = await api.addCalendar(params)
            if (res.code == 200) {
                Message.success(res.msg)
                dispatch("getCalendar")
            } else {
                Message.error(res.msg)
            }
        },
        // 获取日程
        async getCalendar({ commit }, params) {

            let res = await api.getCalendar()
            console.log(res);
            if (res.code == 200) {
                let arr = []
                res.data.map(item => {
                    let obj = {
                        id: item._id,
                        start: item.currentDay + " 00:00:00",
                        end: item.currentDay + " 00:00:00",
                        title: item.schedule,
                        users: item.users
                    };
                    arr.push(obj)
                })
                arr.map(item => {
                    // 得到下一周事件
                    let addTime = Dayjs(item.start).add(7, 'day')

                    let nextWeek = Dayjs(addTime.$d).format("YYYY-MM-DD")
                        // 判断列表中对应下一周是否有事件 
                    let flag = arr.some(function(item1) {
                        return Dayjs(item1.start).format("YYYY-MM-DD") == nextWeek
                    })
                    if (!flag) {
                        // 判断列表中对应下周的时间在当前时间之后 当前时间<下一周
                        if (Dayjs().format("YYYY-MM-DD") <= nextWeek) {
                            arr.push({
                                editable: false,
                                backgroundColor: "#fddeff !important",
                                start: nextWeek,
                                title: `重复上周`,
                            })
                        }
                    }
                })
                console.log(arr);
                commit("setEvents", arr)
            } else if (res.code == 500) {
                commit("setEvents", [])
            }
        },
        // 删除日程
        async delCalendar({ commit, dispatch }, params) {
            MessageBox.confirm("确定删除该日程安排吗?", '提示', {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                })
                .then(() => {
                    api.delCalendar({ id: params })
                    Message.success("删除成功!");
                    dispatch("getCalendar")
                })
                .catch(() => {
                    Message.info("已取消删除!");
                });
        },
        // 重复上周
        async repeatDynamic({ commit, dispatch }, params) {
            let res = await api.repeatDynamic({ currentDay: params })
            if (res.code === 200) {
                dispatch("getCalendar")
            }
        },
    }


}