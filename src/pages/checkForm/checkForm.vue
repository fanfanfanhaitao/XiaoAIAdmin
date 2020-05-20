<template>
 <div class="flex c-items j-content3">

     <el-card class="card">
         <div slot="header" class="clearfix">
          <span>账单详情</span>
        </div>
        <section ref="print">
         <div class="m-deso">
               <div>付款账户：{{form.payment}}</div>
               <div>收款账户：{{form.region}}</div>
               <div>收款人姓名：{{form.name}}</div>
               <div>收款金额：<span class="money">{{form.money}}</span></div>
             </div>
        </section>
             <div class="m-top2 text-c">
               <el-button type="primary" @click="goHome">返回首页</el-button>
               <el-button type="success" @click="print">打印</el-button>
             </div>
     </el-card>
  </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {
  mapState: userState,
} = userModule;
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {
      goHome(){
          this.$router.push('/')
      },
      print(){
         this.$print(this.$refs.print)
      }
      },
     
   mounted() {
          
   },
   watch: {

   },
   computed: {
     ...userState(["form"]),
   }
 }
</script>

<style scoped lang='scss'>
.card{
    width: 400px;
    height: 400px;
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