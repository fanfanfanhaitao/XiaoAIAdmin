<template>
      <div class="all">
        <div class="flex item-all">
          <div>总计</div>
          <div>{{sum}}</div>
          <div>{{planMoney}}</div>
        </div>
        <div class="flex item-all1">
          <div>{{lastMonth}}</div>
          <div>{{thisMonth}}</div>
        </div>
      </div>
 
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {
  mapActions: userActions,
  mapState: userState,
  mapMutations: userMutations
} = userModule;
 export default {
   data () {
     return {

     }
   },
   components: {

   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {
    ...userState(["pay"]),
    sum(){
        let sum =0
        this.pay.map(item=>{
          if(item.actualMoney!==null){
             sum+=parseFloat(item.actualMoney)
          }
          
        })
        return sum
    },
    planMoney(){
      let sum1 =0
        
        this.pay.map(item=>{
          if(item.planMoney!==null){
          sum1+=parseFloat(item.planMoney)
          }
        })
        
        return sum1
    },
    thisMonth(){
        let num =0
         this.pay.map(item=>{
          num+=item.thisMonth
        })
        return num
    },
    lastMonth(){
         let num1 =0
         this.pay.map(item=>{
          num1+=item.lastMonth
        })
        return num1
    }
   }
 }
</script>

<style scoped lang='scss'>
.all {
  margin-top: 20px;
  display: flex;
  color: #0285dc;
  align-items: center;
  justify-content: space-between;
  .item-all {
    width: 35%;
    justify-content: space-around;
    text-align: center;
  }
  .item-all1 {
    width: 38%;
    justify-content: space-around;
    text-align: center;
  }
}
</style>