<template>
 <div class="flex c-items m-top2">
   <div class="flex1 m-right">
       <div class="city">
         <el-card class="el-card box-card">
            <div slot="header" class="clearfix">
             <span> {{$t(`commons.profit`)}}({{$t(`commons.tenThousand`)}})</span>  
             </div>
             <ve-wordcloud :data="{columns: ['city', 'value'],rows: city}" :settings="chartSettings"></ve-wordcloud>
         </el-card>
       </div>
   </div>
  
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
 export default {
   data () {
       this.chartSettings = {
        color: ['#1FFFFF', '#F5B168', '#A88D79', '#94CBEB','#9F5F9F'],           
        sizeMin: 12,
        sizeMax: 21
      }
     return {
      
     }
   },
   components: {

   },
   methods: {
    ...userActions(["cityValue"]),
   },
   mounted() {
     this.cityValue()
    
    
   },
   watch: {

   },
   computed: {
       ...userState(["city"]), 
   }
 }
</script>

<style scoped lang='scss'>
.el-card {
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
}
.city{
    overflow-y: hidden;
    height: 450px;
}
.content{
  height: 450px;
}
</style>