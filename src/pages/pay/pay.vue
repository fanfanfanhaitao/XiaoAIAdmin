<template>
  <div>
    <div class="flex c-items">
      <div class="icon">
        <i class="el-icon-user"></i>
      </div>
      <div class="title">薪酬预算</div>
    </div>
    <div class="flex j-content1 c-items m-top3">
      <div class="con-title">{{value}} 薪酬预算</div>
      <div>
        <el-date-picker
          v-model="value"
          type="month"
          align="right"
          format="yyyy年MM月 "
          value-format="yyyy年MM月"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </div>
    <div class="content">如果有更多的渠道请自行添加, 所有添加的渠道会显示在CRM系统中</div>
    <el-card>
      <div class="card-title">薪资结构</div>
      <el-table :data="pay" style="width: 100%" class="m-top3 el-table">
        <el-table-column label="薪金构成" width="180" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state">
              <el-input
                v-model="item.name"
                @blur="blurName(scope.row)"
                @keyup.enter.native="blurName(scope.row)"
              ></el-input>
            </div>
            <div v-else>{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actualMoney" label="计划支出(元)" align="center" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.state">
              <el-input
                v-model="item.actualMoney"
                @blur="blurActual(scope.row)"
                @keyup.enter.native="blurActual(scope.row)"
              ></el-input>
            </div>
            <div v-else>
              <div
                v-if="data.indexOf(scope.$index)===-1"
                @click="goInput(scope.$index)"
              >{{scope.row.actualMoney}}</div>
              <div v-else>
                <el-input
                  v-model="scope.row.actualMoney"
                  @blur="blurIn(scope.$index)"
                  @keyup.enter.native="blurIn(scope.$index)"
                ></el-input>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="planMoney" label="实际支出(元)" align="center" width="180">
          <template slot-scope="scope">
            <div
              v-if="arr.indexOf(scope.$index)===-1"
              @click="getInput(scope.$index)"
            >{{scope.row.planMoney}}</div>
            <div v-else>
              <el-input
                v-model="scope.row.planMoney"
                @blur="blurInput(scope.$index)"
                @keyup.enter.native="blurInput(scope.$index)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="450" align="center"></el-table-column>
        <el-table-column label="上月计划(元)" align="center" class="table-colum">
          <template slot-scope="scope">
            <div class="table-colum">{{scope.row.lastMonth}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上月实际(元)" align="center">
          <template slot-scope="scope">
            <div class="table-colum">{{scope.row.thisMonth}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="addPays">添加更多</el-button>
      </div>
       <paySum></paySum>
    </el-card>
  </div>
</template>

<script>
import paySum from '../../components/pay/paySum'

import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {
  mapActions: userActions,
  mapState: userState,
  mapMutations: userMutations
} = userModule;
export default {
  data() {
    return {
      value: this.$dayjs(new Date()).format("YYYY年MM月"),
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const date = new Date();
              date.setMonth(date.getMonth() - 1);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      item: {
        actualMoney: null,
        name: "",
        planMoney: null,
        lastMonth: 0,
        thisMonth: 0,
        state:true
      },

      data: [],
      arr: []
    };
  },
  components: {paySum},
  methods: {
    ...userActions(["getPay"]),
    ...userMutations(["addPay"]),
    //点击数字显示输入框
    goInput(e) {
      this.data.push(e);
    },
    //输入框失去焦点
    blurIn(e) {
      this.data = this.data.filter(item => {
        return item != e;
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    getInput(e) {
      this.arr.push(e);
    },
    blurInput(e) {
      this.arr = this.arr.filter(item => {
        return item != e;
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    blurName(e){
      this.item.name=e.name
      this.item.state=false
    },
    blurActual(){
      if(this.item.actualMoney==null){
        this.item.actualMoney=0
      }
    this.item.state=false
    },
    addPays() {
      this.addPay(this.item);
    }
  },
  mounted() {
    this.getPay();
  },
  watch: {},
  computed: {
    ...userState(["pay"]),

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

.con-title {
  font-size: 24px;
  font-weight: 700;
  padding-left: 15px;
  height: 80px;
  line-height: 80px;
}
.content {
  background: #e5f2e1;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  font-size: 14px;
}
.card-title {
  font-size: 24px;
  font-weight: 700;
}
.el-table {
  border: 1px solid #eee;
}
.table-colum {
  color: rgb(204, 204, 204);
}
.btn {
  position: relative;
  left: 3.5%;
  margin-top: 20px;
}


</style>