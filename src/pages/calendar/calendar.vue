<template>
  <div class="lunarFullCalendar">

    <!-- 日历 -->
    <div class="full-calendar">
      <lunar-full-calendar
        :events="events"
        :config="config"
        @event-selected="delEvent"
        @day-click="dayClick"
        @event-render="eventRender"
      ></lunar-full-calendar>
    </div>

    <!-- 添加日程的dialog -->
    <el-dialog title="日程" :visible.sync="dialogVisible" width="40%">
      <el-input placeholder="准备做点什么..." v-model="calendarForm.schedule" style="margin-bottom:20px"></el-input>
      <!-- 时间选择 -->
      <el-form :model="calendarForm" ref="calendarForm" label-width="80px" label-position="left">
        <el-form-item label="时间">
          <el-col :span="11">
            <el-form-item>
              <el-time-select
                v-model="calendarForm.startTime"
                :picker-options="{start: '07:00',step: '00:15',end: '24:00',maxTime:'24:00'}"
                placeholder="选择时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
          <el-col class="line ta-c" :span="2">~</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-time-select
                v-if="calendarForm.startTime ==''"
                disabled
                placeholder="选择时间"
                style="width: 100%;"
              ></el-time-select>
              <el-time-select
                v-else
                v-model="calendarForm.endTime"
                :picker-options="{start: '07:00',step: '00:15',end: '24:00',minTime:calendarForm.startTime}"
                placeholder="选择时间"
                style="width: 100%;"
              ></el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 参与人 -->
        <el-form-item label="参与人:">
          <div class="flex ai-c">
            <div style="padding:0 6px;" v-for="item in calendarForm.users" :key="item.id">{{item}}</div>
            <el-popover placement="bottom" width="200" v-model="visible">
              <el-input placeholder="请输入参与人的姓名" v-model="addUserName"></el-input>
              <el-button type="primary" size="mini" class="add-user" @click="addUser">确认</el-button>
              <i class="el-icon-circle-plus-outline fs-20" style="color:blue" slot="reference"></i>
            </el-popover>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureCalend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";

import { createNamespacedHelpers } from "vuex";
const calendarModule = createNamespacedHelpers("calendar");
const {
  mapActions: calendarActions,
  mapState: calendarState,
  mapMutations: calendarMutations
} = calendarModule;
export default {
  data() {
    let _this = this;
    return {
      // 添加日程的dialog默认不显示
      dialogVisible: false,
      visible: false,
      addUserName: "",
      autoName: "",
      nowDate: ""
    };
  },
  components: { LunarFullCalendar },
  methods: {
    ...calendarMutations(["clearForm"]),
    ...calendarActions([
      "addCalendar",
      "getCalendar",
      "delCalendar",
      "repeatDynamic"
    ]),
    //日历事件点击事件 删除日历
    delEvent(e, jsEvent, pos) {
      if (e.title == "重复上周") {
        console.log(e);
        this.repeatDynamic(e.start._i);
      } else {
        this.delCalendar(e.id);
      }
    },
    //背景点击事件 打开dialog
    dayClick(date, jsEvent, view) {
      this.nowDate = this.$dayjs(date._d).format("YYYY-MM-DD");
      let difTime = this.$dayjs(date._d).valueOf() - this.$dayjs().valueOf();
      if (difTime / 1000 / 60 / 60 >= -24) {
        this.dialogVisible = true;
      } else {
        this.$message.error("不能安排今天之前的日程");
      }
    },
    // 添加日程参与人
    addUser() {
      if (this.addUserName == "") {
        this.$message.error("参与人不能为空");
      } else {
        this.calendarForm.users.push(this.addUserName);
        this.visible = false;
        this.addUserName = "";
      }
    },
    // 确认添加日程
    sureCalend() {
      let obj = {};
      let flag = true;
      if (this.calendarForm.schedule !== "" && flag) {
        obj.schedule = this.calendarForm.schedule;
      } else {
        this.$message.error("请输入日程");
        flag = false;
      }
      if (flag) {
        if (this.calendarForm.startTime !== "") {
          obj.startTime = this.$dayjs(
            this.nowDate + " " + this.calendarForm.startTime
          ).format();
        } else {
          this.$message.error("请输入开始时间");
          flag = false;
        }
      }
      if (flag) {
        if (this.calendarForm.endTime !== "") {
          obj.endTime = this.$dayjs(
            this.nowDate + " " + this.calendarForm.endTime
          ).format();
        } else {
          this.$message.error("请输入结束时间");
          flag = false;
        }
      }
      if (flag) {
        obj.currentDay = this.nowDate;
        obj.users = this.calendarForm.users;
        this.addCalendar(obj);
        this.dialogVisible = false;
        this.clearForm(this.autoName);
      }
    },
    eventRender(event, element, view) {
      // 判断事件是否为重复上周
      if (event.id !== undefined) {
        element[0].innerHTML =
          this.$dayjs(event.startTime).format("HH:mm") +
          "-" +
          this.$dayjs(event.endTime).format("HH:mm") +
          "      " +
          event.title +
          "<br />" +
          "参与人: " +
          event.users.join(" ") +
          " <br />" +
          "参与人数: " +
          "<i class='el-icon-user-solid'></i>" +
          event.users.length;
      }
    }
  },
  mounted() {
    this.autoName = JSON.parse(localStorage.getItem("adminUser")).username;
    this.clearForm(this.autoName);
    this.getCalendar();
  },

  watch: {},
  computed: {
    ...calendarState(["config", "calendarForm", "events"])
  }
};
</script>
<style scoped lang='scss'>
@import "../../assets/calendar";
.add-user {
  margin-left: 72%;
  margin-top: 6px;
}
</style>
