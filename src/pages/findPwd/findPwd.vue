<template>
 <div>
  <top></top>
      <div class="m-top3 flex c-items j-content3">
      <el-form class="form" :model="formAlign">
        <el-form-item>
          <el-input placeholder="2-10位用户名" prefix-icon="el-icon-user" v-model="formAlign.name"></el-input>
          </el-form-item>
        <el-form-item>
          <el-input placeholder="合法邮箱" prefix-icon="el-icon-message" v-model="formAlign.email"></el-input>
        </el-form-item>
    
        <el-form-item>
            <el-button class="button" type="primary" size="small" @click="findWord">找回密码</el-button>
          <div class="floot flex j-content1">
            <div>其他方式登录</div>
            <div class="login" @click="goLogin">立即登录</div>
          </div>
        </el-form-item>
      </el-form>
    </div>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
import top from "../../components/login/top";
 export default {
   data () {
     return {
     formAlign:{
         name:'',
         email:''
     }
     }
   },
   components: {
     top
   },
   methods: {
    ...userActions(["findPwd"]),
     goLogin(){
         this.$router.push('/login')
     },
     findWord(){
         this.findPwd({email: this.formAlign.email,username: this.formAlign.name})
     }
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.form {
  width: 350px;
}
.button{
    width: 100%;
}
.login{
    color: rgb(45, 140, 240);
}
.floot{
    font-size: 16px;
}
</style>