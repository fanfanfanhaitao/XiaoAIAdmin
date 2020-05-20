<template>
  <div class="wraper">
    <top></top>

    <div class="m-top3 flex c-items j-content3">
      <el-tabs class="tabs" v-model="activeName" stretch>
        <el-tab-pane disabled></el-tab-pane>
        <el-tab-pane label="账号密码登录" name="first">
          <el-form :model="formLabelAlign">
            <el-form-item>
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="formLabelAlign.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex">
                <el-input placeholder="验证码" v-model="formLabelAlign.type"></el-input>
                <div v-html="svg" class="svg" @click="changeSvg"></div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="second">
          <el-form :model="formLabel">
            <el-form-item>
              <el-input v-model="formLabel.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex">
                <el-input placeholder="6位验证码" v-model="formLabel.type"></el-input>
                <div class="svg">
                  <el-button @click="sendSms">验证码</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane disabled></el-tab-pane>
      </el-tabs>
    </div>
    <div class="forget flex c-items j-content3">
      <div>
        <div class="flex j-content1 forget-content">
          <el-checkbox v-model="checked">记住我</el-checkbox>
          <div @click="goFindPwd">忘记密码</div>
        </div>
        <div class="m-top2 forget-content">
          <el-button type="primary" class="forget-content" @click="loginAdmin">登录</el-button>
        </div>
        <div class="flex m-top2 j-content1 forget-content">
          <div class="f-color">其他方式登录</div>
          <div @click="registe">注册账号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
import top from "../../components/login/top";

export default {
  data() {
    return {
      activeName: "first",
      formLabelAlign: {
        name: "",
        password: "",
        type: ""
      },
      formLabel: {
        phone: "",
        type: ""
      },
      checked: false
    };
  },
  components: { top },
  methods: {
    ...userActions(["getCapt", "login", "phoneLogin","sendMsg"]),

    //切换验证码
    changeSvg() {
      this.getCapt();
    },
    //注册
    registe() {
      this.$router.push("/register");
    },
    //登陸
    loginAdmin() {
      if (this.activeName == "first") {
        this.login({
          code: this.formLabelAlign.type,
          password: this.formLabelAlign.password,
          username: this.formLabelAlign.name
        });
      } else if (this.activeName == "second") {
        this.phoneLogin({ code: this.formLabel.type, phone: this.formLabel.phone });
      }
    },
    //发送短信验证码
     sendSms(){
      this.sendMsg({phone: this.formLabel.phone})
    },
    //找回密碼
    goFindPwd(){
      this.$router.push("/findPwd");
    }
  },
  mounted() {
    this.getCapt();
  },
  watch: {},
  computed: {
    ...userState(["svg"])
  }
};
</script>

<style scoped lang='scss'>
.wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
}

.tabs {
  width: 350px;
}
.label {
  margin-left: 30px;
}
.svg {
  margin-left: 10px;
}
.forget {
  margin-bottom: 20px;
  cursor: pointer;
  color: rgb(45, 140, 240);
  font-size: 14px;
}
.forget-content {
  width: 350px;
}
.f-color {
  color: black;
}
</style>