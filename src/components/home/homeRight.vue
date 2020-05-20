<template>
  <div class="f-right">
    <div class="font-size flex c-items">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link font-size">
          <span data-step="2" data-intro="切换语言"><i class="el-icon-edit-outline"></i></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in options"
            :key="index"
            :command="item.value"
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      
      <span data-step="3" data-intro="设置全屏">
      <el-tooltip
        class="item font-size"
        effect="dark"
        :content="msg?'取消全屏':'全屏'"
        placement="bottom"
      >
        <div @click="handleFullScreen">
          <i class="el-icon-full-screen"></i>
        </div>
      </el-tooltip>
      </span>
      <span data-step="4" data-intro="设置锁屏">
      <el-tooltip class="item font-size" effect="dark" content="锁屏" placement="bottom">
        <span @click="open">
          <i class="el-icon-lock"></i>
        </span>
      </el-tooltip>
      </span>

      <el-dropdown :hide-on-click="false">
        <span class="user font-size1 flex c-items">
          <el-avatar :size="30" :src="circleUrl"></el-avatar>
          <span class="item" data-step="5" data-intro="用户操作">
            {{$t(`commons.dear`)}}{{data.username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
        </span>
        
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-upload
              :headers="headers"
              action="api/upload/image"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
            >{{$t(`commons.uploadAvatar`)}}</el-upload>
          </el-dropdown-item>
          <span @click="dialogFormVisible = true">
            <el-dropdown-item>{{$t(`commons.editPwd`)}}</el-dropdown-item>
          </span>
          <span @click="outLogin">
            <el-dropdown-item>{{$t(`commons.logout`)}}</el-dropdown-item>
          </span>
        </el-dropdown-menu>
        
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" class="dialog" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item required label="请输入原密码" label-width="120px">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item required label="请输入新密码" label-width="120px" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item required label="请确认新密码" label-width="120px" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import IntroJs from 'intro.js'
import 'intro.js/introjs.css';
import screenfull from "screenfull";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      msg: false,
      data: {},
      value: localStorage.getItem("language") || "en", //初始化时候获取上次存的值，并在处于选中状态。
      options: [
        {
          value: "cn",
          label: "简体中文"
        },
        {
          value: "tw",
          label: "繁體中文"
        },
        {
          value: "en",
          label: "英文"
        }
      ],
      circleUrl: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        password: ""
      },
      dialogFormVisible: false,
      dialog: false,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      headers: null
    };
  },
  components: {},
  methods: {
    ...userActions(["upload", "updatePwd", "logout"]),

    // 全屏
    handleFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
      this.msg = !this.msg;
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      let a = /\.(jpg|jepg|gif|png)$/;
      const isType = a.test(file.name);
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else if (!isType) {
        this.$message.error("请上传jpg/png图片!");
      }
      return isLt2M && isType;
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.circleUrl = res.url;
        localStorage.setItem('circleUrl',JSON.stringify(res.url))
         this.$message({
          message:res.msg,
          type: 'success'
        });
       
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 上传失败
    handleAvatarError(res) {
      console.log(err);
    },

    //切换语言
    handleCommand(command) {
      this.$i18n.locale = command; //在main.js里设置的i180我们在这里调用，并赋值
      localStorage.setItem("lang", command); //每次切换语言，本地存一下，防止刷新丢失。
    },
    //修改密码
    editPwd() {
      this.updatePwd({
        username: this.data.username,
        id: this.data._id,
        newPwd: this.ruleForm.pass,
        password: this.ruleForm.password
      });
    },
    //退出登录
    outLogin() {
      this.logout();
    },
    //锁屏
    open() {
      this.$prompt("请输入锁屏密码", "锁屏", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[S{1,}]/,
        inputErrorMessage: "密码不能为空"
      })
        .then(({ value }) => {
          //存锁屏密码
          sessionStorage.setItem("password", value);
          //存当前路径
          sessionStorage.setItem("path", this.$route.path);
          //isLock锁屏状态
          sessionStorage.setItem("isLock", true);
          this.$router.push("/lock");
          this.$message({
            type: "success",
            message: "已锁屏"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消锁屏"
          });
        });
    },
    
    startIntro() {
       IntroJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "结束"
    }).oncomplete(function () {
        //点击跳过按钮后执行的事件
    }).onexit(function () {
        //点击结束按钮后， 执行的事件
    }).start();
}
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem('circleUrl')){
      this.circleUrl=JSON.parse(localStorage.getItem('circleUrl'))
    }
     if (!localStorage.getItem("intro")) {
      this.$nextTick(() => {
        this.$confirm("您需要系统引导吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "不再提示",
          type: "info"
        })
          .then(() => {
            this.startIntro();
          })
          .catch(() => {
            localStorage.setItem("intro", true);
          });
      });
    }
  },
  watch: {
    visible(val) {
      if (this.visible) {
        this.dialogFormVisible = false;
        this.ruleForm.password = this.ruleForm.pass = this.ruleForm.checkPass =
          "";
      }
    }
  },
  computed: {
    ...userState(["visible"])
  },
  beforeMount() {
    this.headers = {
      Authorization: localStorage.getItem("adminToken")
    };
  }
};
</script>

<style scoped lang='scss'>
.item {
  padding-left: 10px;
}
.user {
  padding-left: 20px;
}
.dialog {
  width: 60%;
  margin: 0 auto;
}
</style>