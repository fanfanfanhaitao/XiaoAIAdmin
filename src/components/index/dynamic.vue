<template>
  <div class="flex1 content m-top2">
    <el-card class="el-card box-card">
      <div slot="header" class="clearfix">
        <span>个人动态</span>
        <el-button
          style="float: right"
          type="primary"
          size="mini"
          @click="dialogVisible = true"
        >添加动态</el-button>
      </div>
      <el-date-picker v-model="value1" type="date"  format="yyyy 年 MM 月 dd 日" placeholder="选择日期"></el-date-picker>
      <div class="m-top2">暂无数据</div>
    </el-card>
    <el-dialog title="添加动态" class="dialog" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item :model="ruleForm" label="动态类型" label-width="120px">
          <el-select v-model="ruleForm.type" placeholder="请选择动态类型" class="select">
            <el-option v-for="item in selects" :key="item.id" :label="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :model="ruleForm" label="相关汇报人" label-width="120px" v-if="ruleForm.type=='工作汇报'">
          <el-select v-model="ruleForm.user" multiple placeholder="请选择相关汇报人" class="select">
            <el-option v-for="item in port" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情内容" label-width="120px" prop="pass">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDy">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {
      value1: new Date(),
      dialogVisible: false,
      
      selects: [
        {
          id: "1",
          label: "个人心情"
        },
        {
          id: "2",
          label: "工作汇报"
        },
        {
          id: "3",
          label: "公司相关"
        },
        {
          id: "4",
          label: "其他事物"
        }
      ],
      ruleForm: {
        type: "",
        user:'',
        text:''
      },
      data:{}
    };
  },
  components: {},
  methods: {
    ...userActions(["getDynamic", "addDynamic","report"]),
    addDy(){
      this.addDynamic({
        username: this.data.username,
        date: this.value1,
        dynamic: this.ruleForm.text,
        classification: this.ruleForm.text,
        reportUsers: this.ruleForm.user
      })
      this.dialogVisible = false
      this.ruleForm.text=this.ruleForm.text=this.ruleForm.user=''
    }
  },
  mounted() {
    this.getDynamic();
    this.report()
     this.data = JSON.parse(localStorage.getItem("user"));
  },
  watch: {
     value1(val){
       console.log(this.value1);
       this.dynamic=this.dynamic.filter(item=>{
         item.date!==val
       })
       console.log(this.dynamic);
     }
  },
  computed: {
    ...userState(["dynamic","port"])
  }
};
</script>

<style scoped lang='scss'>
.select {
  width: 100%;
}
</style>