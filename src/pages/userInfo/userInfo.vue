<template>
  <div>
     <el-backtop ></el-backtop>
    <div class="flex c-items j-content1">
      <div class="flex c-items">
        <div class="icon">
          <i class="el-icon-user"></i>
        </div>
        <div class="title">人员信息</div>
      </div>
      <div class="flex">
        <div v-if="number==0" class="btn">
          <el-button type="primary" size="small" @click="batch">批量转正申请</el-button>
        </div>
        <div v-else class="btn">
          <el-button type="primary" size="small" @click="confirm">确认</el-button>
          <el-button type="primary" size="small" class="m-left1" @click="cancel">取消</el-button>
        </div>
        <el-button type="primary" size="small" class="m-left2">导出</el-button>
      </div>
    </div>
    <div class="m-top2">
      <el-tag
        v-for="(item,index) in tags"
        :key="index"
        class="tag m-left2"
        :effect="active==index?'dark':'light'"
        @click="switchTag(index)"
      >{{item.name}}</el-tag>
    </div>
    <el-table
      :data="showUser.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
      class="m-top3"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="num" label="工号" sortable align="center"></el-table-column>
      <el-table-column prop="mechanism" label="机构" align="center"></el-table-column>
      <el-table-column prop="department" label="部门" align="center"></el-table-column>
      <el-table-column prop="startTime" label="试用期开始时间" sortable align="center"></el-table-column>
      <el-table-column prop="endTime" label="试用期结束时间" sortable align="center"></el-table-column>
      <el-table-column label="转正审批状态" align="center">
        <template slot-scope="scope">
          <span class="color" v-if="scope.row.state==0">审核未通过</span>
          <span class="color" v-if="scope.row.state==1">审核中</span>
          <span class="color" v-if="scope.row.state==2">审核通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="操作" align="center">
        <template>
          <el-button type="primary" size="mini">编辑试用期</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block m-top2">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="showUser.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState ,mapMutations:userMutations} = userModule;
export default {
  data() {
    return {
      number: 0,
      active: 0,
      tags: [
        { name: "全部员工" },
        { name: "考核中员工" },
        { name: "已转正员工" }
      ],
      currentPage: 1,
      pagesize: 10,
      arr: [],
      data: []
    };
  },
  components: {},
  methods: {
    ...userActions(["getUser"]),
    ...userMutations(["changeUser","changeshowUser"]),
    //批量转正
    batch() {
      this.number = 1;
      this.changeUser(1) 
    },
    //取消
    cancel() {
      this.number = 0;
      this.changeUser(0) 
    },
    //确认
    confirm() {
      if (this.arr.length == 0) {
        this.$message({
          message: "请至少选择一条数据",
          type: "warning"
        });
      }else{
        this.changeshowUser(this.arr)
        this.changeUser(0)
        this.number = 0;
          this.$message({
          message: "操作成功",
          type: "success"
        });
      }
    },
    //切换考核状态
    switchTag(index) {
      this.active = index;
      this.changeUser(index) 

    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelectionChange(val) {
      this.arr = val;
      console.log(val);
    }
  },
  mounted() {
    this.getUser();
  },
  watch: {
    //   active(val){
    //     if(val== 2){
    //          this.user =this.user.filter(item => {
    //                         return item.state === val
    //                     })
    //              if (params == 0) {
    //                     res.data = res.data
    //                 } else if (params == 2) {
    //                 } else {
    //                     res.data = res.data.filter(item => {
    //                         return item.state !== 2
    //                     })
    //     }
    //   }
  },
  computed: {
    ...userState(["showUser"])
  }
};
</script>

<style scoped lang='scss'>
.icon {
  background: #38ba72;
  color: #fff;
  height: 24px;
  width: 16px;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}
.title {
  font-weight: 700;
  margin-left: 8px;
}
.btn {
  margin-right: 10px;
}
.tag {
  border-radius: 20px;
}
.color {
  color: #0285dc;
}
</style>