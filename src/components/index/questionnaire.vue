<template>
  <div class="m-top3">
    <el-card class="el-card box-card">
      <div slot="header" class="clearfix">
        <span>网站问卷调查</span>
      </div>
      <el-table :data="questions"  style="width: 100%">
        <el-table-column prop="name" label="问卷名称" width="180" align="center"></el-table-column>
         <el-table-column prop="desc" label="问卷描述" width="180" align="center"></el-table-column>
        <el-table-column prop="startTime" label="创建时间" sortable width="180" align="center"></el-table-column>
        <el-table-column prop="endTime" label="截止时间" sortable width="180" align="center"></el-table-column>
        <el-table-column label="问卷状态" width="180" align="center">
         <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0">未发布</el-tag>
          <el-tag v-if="scope.row.status==1">已发布</el-tag>
          <el-tag v-if="scope.row.status==2">已截止</el-tag>
        </template>
        </el-table-column>
        <el-table-column  label="网站名称" align="center">
         <template slot-scope="scope">
           <el-tag v-if="scope.row.url=='https://github.com/'" type="info">github</el-tag>
           <el-tag v-if="scope.row.url=='https://www.douban.com/'" type="danger">豆瓣</el-tag>
           <el-tag v-if="scope.row.url=='https://www.baidu.com'" type="success">百度</el-tag>
           <el-tag v-if="scope.row.url=='https://juejin.im/'" type="warning">掘金</el-tag>
         </template>
        </el-table-column>
         <el-table-column prop="endTime" label="操作"  width="180" align="center">
             <template slot-scope="scope">
                 <el-button type="primary" size="mini" @click="look(scope.row)">查看网站详情</el-button>
             </template>
         </el-table-column>
      </el-table>
     
    </el-card>
     <el-dialog title="复制地址" class="dialog" :visible.sync="dialog">
       <el-form  :model="form" class="demo-form-inline">
        <el-form-item>
           <div class="flex form">
               <el-input v-model="form.url" placeholder="请输入内容" class="m-right"></el-input>   
               <el-button type="danger" size="mini" @click="copyUrl(form.url)">复制</el-button>
          </div>
        </el-form-item>
        <el-form-item>
            <div class="text">
              如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。
            </div>
        </el-form-item>
        </el-form>
           <erweima v-if="dialog"></erweima>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import erweima from '../../components/index/erweima'
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {
        dialog:false,
        form:{
            
        }
    };
  },
  components: {erweima},
  methods: {
    ...userActions(["question","url"]),
    //查看
    look(e){
      this.form=JSON.parse(JSON.stringify(e))
      this.url(e.url)
      this.dialog=true
    },
    // qrcodeScan () {//生成二维码
	// 		  let qrcode = new QRCode('qrcode', {  
	// 		      width: 200,  // 二维码宽度 
	// 		      height: 200, // 二维码高度
	// 		      text: 'https://mp.csdn.net'
	// 		  })  
	// 		},

     copyUrl(e) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value',e)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
         this.$message.success('复制成功')
      }
      document.body.removeChild(input)
     },

  },
  mounted() {
    this.question();
    // this.qrcodeScan();
  },
  watch: {},
  computed: {
    ...userState(["questions"])
  }
};
</script>

<style scoped lang='scss'>
.el-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.text{
    text-indent: 1em;
    height: 70px;
    border-radius: 10px;
    background-color: #EBF5FF;
    text-align: center;
    display: flex;
    align-items: center;
}
</style>