<template>
  <div>
    <top></top>
    <div class="m-top3 flex c-items j-content3">
      <el-form class="form" :model="formAlign">
        <el-form-item>
          <el-input placeholder="2-10位用户名" prefix-icon="el-icon-user" v-model="formAlign.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="6位以上密码"
            prefix-icon="el-icon-lock"
            v-model="formAlign.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="合法邮箱" prefix-icon="el-icon-message" v-model="formAlign.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="11位合法手机号" prefix-icon="el-icon-phone" v-model="formAlign.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex">
            <el-input placeholder="6位验证码" prefix-icon="el-icon-document" v-model="formAlign.sms"></el-input>
            <div class="m-left1">
              <el-button @click="sendSms">验证码</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="flex j-content1">
            <el-button class="button" type="primary" size="small" @click="rester">注册</el-button>
            <div class="login" @click="goLogin">使用已有账号登录</div>
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
import forget from "../../components/login/forget";
export default {
  data() {
    return {
      formAlign: {
        name: "",
        password: "",
        email: "",
        phone: "",
        sms: ""
      }
    };
  },
  components: {
    top,
    forget
  },
  methods: {
    ...userActions(["register","sendMsg"]),
    
    goLogin() {
      this.$router.push("/login");
    },
    sendSms(){
      this.sendMsg({phone: this.formAlign.phone})
    },
    rester() {
      this.register({
        email: this.formAlign.email,
        password: this.formAlign.password,
        phone: this.formAlign.phone,
        sms: this.formAlign.sms,
        username: this.formAlign.name
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.form {
  width: 350px;
}
.button {
  width: 160px;
  height: 30px;
}
.login {
  color: rgb(45, 140, 240);
  font-size: 14px;
}
</style>