<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse? '80px':'210px'">
        <span v-for="(item,index) in menu" :key="index">
        <el-menu
        @open="handleOpen" @close="handleClose" 
          :default-active="url"
          router
          text-color="#9EB2BD"
          :collapse="isCollapse"
        >
         <el-menu-item :index="item.url" v-if="item.children.length==0">
              <i :class="item.icon"></i>
              <span slot="title">{{$t(`commons.${item.name}`)}}</span>
            </el-menu-item>
            <el-submenu :index="item.url" v-if="item.children.length>0">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="item1.url"
                  v-for="(item1,index1) in item.children"
                  :key="index1"
                >
                  <i :class="item1.icon"></i>
                  <span>{{item1.name}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          
        </el-menu>
        </span>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header flex c-items">
            <div class="top">
              <div @click="collapse" class="icon flex">
                <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
                <div class="title">{{$t(`commons.xiaoai`)}}{{$t(`commons.admin`)}}</div>
              </div>
              <homeRight></homeRight>

            </div>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/' }">{{$t(`commons.dashboard`)}}</el-breadcrumb-item> -->
          <el-breadcrumb-item
            v-for="(item,index) in breadcrumbList"
            :key="index"
          >{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        
       
          <router-view class="m-top2"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeRight from '../../components/home/homeRight'

import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {
      isCollapse: false,
      data:{},
     breadcrumbList:[]
  
    };
  },
  components: {
    homeRight
  },
  methods: {
    ...userActions(["getMenus","progress"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //
    collapse() {
        this.isCollapse = !this.isCollapse;
    },
    getbreadcrumb() {
      let meta = this.$route.meta;
      console.log(meta);
      this.breadcrumbList = [];
      if (meta.title) this.breadcrumbList.push(meta.title);
      console.log(this.breadcrumbList);
      // if (meta.title) {
      //   this.breadcrumbList.unshift(meta.parentName);
      // }
    }
 
  },
  mounted() {
    this.getMenus();
    this.getbreadcrumb();
    
     // Esc 全屏监测
    // var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
    //  isFull = !!isFull
    // console.log(isFull);
    // window.onresize = () => {
    //         // 全屏下监控是否按键了ESC
    //         if (!isFull) {
    //           // 退出全屏
    //           this.msg = !this.msg
    //         }
    //       }
  },
  watch: {
      "$route.path"(val) {
      this.getbreadcrumb();
    }
  },
  computed: {
    ...userState(["menu"]),
    url() {
      return this.$route.path;
    },
    
   
   
  }
};
</script>

<style scoped lang='scss'>
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f0f2f5;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.icon {
  font-size: 22px;
}
.title {
  padding-left: 30px;
  font-size: 18px;
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
}

</style>