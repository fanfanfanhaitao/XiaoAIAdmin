<template>
<div >
   <div class="flex">
   <div class="flex1">
      <el-tree :data="treeData.data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
   <div style="flex: 5 1 0%;" class="wraper">
      <el-backtop ></el-backtop>
     <div class="flex content" v-if="mailList.length>0">
       <div v-for="(item,index) in mailList" :key="index" class="card" >
          <el-card class="box-card flex1" >
          <div slot="header" class="clearfix flex">
            <div><img :src="item.img" alt="" class="img"></div>
            <div class="m-left2">
              <div class="name">{{item.name}}</div>
              <div class="desc">{{item.department}}/{{item.position}}</div>
              <div v-if="item.tag.length>0" class="flex">
                <div class="tag" v-for="(item1,index1) in item.tag" :key="index1" :style="randomRgb()">{{item1.name}}</div>
              </div>
              <div v-else class="outline">
                <i class="el-icon-circle-plus-outline"></i>
                <span class="tabs">快来给Ta添加第一个标签吧</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div>邮箱 : {{item.email}}</div>
            <div>手机号码 : {{item.phone}}</div>
            <div>办公电话 : {{item.tel}}</div>
            <div>性别 : <span v-if="item.gender==0">女</span>
                  <span v-if="item.gender==1">男</span>
            </div>
            <div>QQ : {{item.qq}}</div> 
          </div>
          </el-card>
       </div>
   </div>
   <div v-else class="not">
      暂无数据
   </div>
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
     return {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        msg:''
     }
   },
   components: {

   },
   methods: {
       ...userActions(["getTreeData","getMailList"]),
       //树形控件
    handleNodeClick(data) {
        this.getMailList(data.label)
       
      },
     randomRgb(){
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        return {
          background: 'rgb(' + R + ',' + G + ',' + B + ')'
        };

     } 

   },
   mounted() {
      this.getTreeData()
      this.getMailList()
   },
   watch: {
     
   },
   computed: {
      ...userState(["treeData","mailList"]),
   }
 }
</script>

<style scoped lang='scss'>
.content{
  align-items: center;
  flex: 5;
   flex-wrap: wrap;
   
}
.card{
  width: 32%;
  margin: 5px;
}
.img{
  border-radius: 40px;
}
.name{
  font-size: 18px;
    margin-bottom: 8px;
}
.desc{
      font-size: 14px;
    margin-bottom: 8px;
}
.tag{
    font-size: 14px;
    border-radius: 20px;
    color: #fff;
    padding: 4px 10px;
    margin-right: 4px;
}
.item{
  margin-left: 20px;
   div{
    margin-bottom: 2px;
    font-size: 14px;
   }
}
.outline{
    font-size: 14px;
    color: #ccc;
}
.tabs{
  margin-left: 5px;
}
.not{
  display: flex;
  justify-content: center;
  color: #0285DC;
  align-items: center;
}
</style>