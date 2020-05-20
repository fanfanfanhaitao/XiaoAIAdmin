<template>
 <div class="flex c-items j-content3 content">
  <div>
      admin
    <div class="flex c-items deso m-top1">
    <div class="el-input"><el-input v-model="input" type="password" placeholder="请输入锁屏密码"></el-input></div>
    <el-button icon="el-icon-right" @click="back"></el-button>
    
  </div>
  </div>

  

 </div>
</template>

<script>
 export default {
   data () {
     return {
      input:'',
      word:'',
      path:''
     }
   },
   components: {

   },
   methods: {
    back(){
      if(this.input==this.word){
         this.$router.push(this.path)
         sessionStorage.removeItem('password')
         sessionStorage.removeItem('isLock')
         sessionStorage.getItem('isLock',false)
          this.$message({
            type: 'success',
            message: '欢迎回来'
          });
      }else{
           this.$message({
            type: 'error',
            message: '密码不正确'
          });
      }
    }
   },
   mounted() {
     this.word=sessionStorage.getItem('password')
     this.path=sessionStorage.getItem('path')
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.deso{
    height: 40px;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
}
.content{
    height: 100vh;
}
</style>