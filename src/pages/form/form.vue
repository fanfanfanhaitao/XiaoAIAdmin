<template>
  <div>
    <div>请填写您的转账信息</div>
    <div class="desc m-top2">请务必是你本人操作，确认转账金额及收款人信息</div>
    <el-card class="m-top3">
      <div class="content">
        <div class="c-item" v-for="(item,index) in arr" :key="index">
          <div class="flex">
            <div class="circle" v-bind:class="active!==index?'c-back':'c-next'">
              <div v-if="active!==index">{{index+1}}</div>
              <div v-else>
                <i class="el-icon-check"></i>
              </div>
            </div>

            <div class="c-info">{{item.title}}</div>
          </div>
          <div class="line" v-if="index<2"></div>
        </div>
      </div>
      <div class="flex j-content3 m-top3">
        <div v-if="active==-1" class="el-form">
          <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="付款账号" prop="payment">
              <el-input v-model="form.payment"></el-input>
            </el-form-item>
            <el-form-item label="收款账户" prop="region">
              <div class="flex">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="支付宝" value="shanghai"></el-option>
                  <el-option label="银行卡" value="beijing"></el-option>
                </el-select>
                <el-input v-model="form.collection"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="付款人姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="收款金额" prop="money">
              <el-input v-model="form.money">
                <div slot="prefix">￥</div>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="nextBtn('form')">下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="active==0" class="form">
          <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="info" show-icon></el-alert>
          <div class="msg">
             <div>付款账户：{{form.payment}}</div>
             <div>收款账户：{{form.region}}</div>
             <div>收款人姓名：{{form.name}}</div>
             <div>收款金额：<span class="money">{{form.money}}</span></div>
          </div>
          <div class="el-line"></div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px"> 
             <el-form-item label="支付密码" prop="password">
                 <el-input v-model="form.password" type="password"></el-input>
             </el-form-item>
             <el-form-item prop="money">
               <el-button type="primary" @click="nextBtn('form')">提交</el-button>
              <el-button  plain @click="step">上一步</el-button>
             </el-form-item>
          </el-form>
        </div>
        <div v-if="active==1">
           <div class="m-desc">
             <div class="m-icon"><i class="el-icon-check"></i></div>
              <div class="m-top2">操作成功</div>
              <div class="m-info">预计两小时到账</div>
             <div class="m-deso">
               <div>付款账户：{{form.payment}}</div>
               <div>收款账户：{{form.region}}</div>
               <div>收款人姓名：{{form.name}}</div>
               <div>收款金额：<span class="money">{{form.money}}</span></div>
             </div>
             <div class="m-top2">
               <el-button type="primary" @click="submit">再转一笔</el-button>
               <el-button @click="viewBill">查看账单</el-button>
             </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {
  mapMutations: userMutations
} = userModule;
export default {
  data() {
    return {
      arr: [
        { title: "请输入转账信息" },
        { title: "请确认转账信息" },
        { title: "完成" }
      ],
      rules: {
        payment: [
          { required: true, message: "请输入付款人账户", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请输入收款人账户", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入收款人姓名", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入转账", trigger: "blur" }],
        password: [{ required: true, message: "请输入支付密码", trigger: "blur" }],
      },
      form: {
        payment: "",
        region: "",
        collection: "",
        name: "",
        money: "",
        password:''
      },
      active: -1,
      password:''
    };
  },
  components: {},
  methods: {
     ...userMutations(["setForm"]),
    nextBtn(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.active += 1;
        } else {
          return false;
        }
      });
    },
    //上一步
    step(){
      this.active =-1;
    },
    //再转一笔
    submit(){
      this.active = -1;
      this.form.payment=this.form.region=this.form.collection=this.form.name=this.form.money=this.form.password=''
    },
    //查看账单
    viewBill(){
      this.setForm(this.form)
      this.$router.push('/form/checkForm')
    
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.desc {
  font-size: 14px;
  color: #ccc;
}
.content {
  display: flex;
  align-items: center;

  //  :first-child{
  //
  // }
}
.c-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
}
.c-item:first-child {
  padding-left: 10%;
}
.c-item:last-child {
  justify-content: flex-start;
}
.flex {
  display: flex;
  align-items: center;
  .circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 6px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.c-back {
  background-color: #1890ff;
  color: #fff;
}
.c-info {
  flex: 1;
}
.line {
  flex: 1;
  height: 1px;
  background: #ccc;
  margin-left: 15px;
}
.c-next {
  border: 1px solid #45b984 !important;
  color: #45b984 !important;
}
.el-form {
  width: 60%;
  margin: 0 auto;
}
.form{
  width: 40%;
  margin: 0 auto;
}
.msg{
  div{
    margin: 15px 0;
    color: #272727;
    font-size: 14px;
    .money{
      font-size: 20px;
    }
  }
}
.el-line{
  display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    background-color: #DCDFE6;
}
.m-icon{
      width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #52C41A;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #fff;
}
.m-info{
      margin: 5px 0;
    color: #ccc;
    font-size: 14px;
  
}
.m-desc{
      width: 100%;

    display: flex;
   
    flex-direction: column;
   
    align-items: center;
    margin-top: 30px;
}
.m-deso{
    background: #FAFAFA;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div{
    margin: 15px 0;
    color: #272727;
    font-size: 14px;
    text-indent: 1em;
    .money{
      font-size: 20px;
    }
  }
}
</style>